import { Request, Response } from "express";
import prisma from "../config/prisma.js";
import { v4 as uuidv4 } from "uuid";
import redis from "../config/redis.js";


export const createTicket = async (req: Request, res: Response) => {
    try {
        const oneTimeId = (req as any).user?.OneTimeID;

        if (!oneTimeId) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized: User Login is required",
            });
        }

        const { subject, message } = req.body;
        const name = (req as any).user?.name;
        const TicketID = `TKT-${name}-${uuidv4()}`

        if (!subject || !message) {
            return res.status(400).json({
                success: false,
                message: "Subject and message are required",
            });
        }

       const cachedData = await redis.get("tickets")

       if (cachedData) {
        return res.status(200).json({
            success: true,
            source: "cache",
            data: JSON.parse(cachedData),
        });
       }

        const ticket = await prisma.support.create({
            data: {
                TicketID: TicketID,
                subject,
                message,
                userId: oneTimeId,
            },
        });

        console.log(`[${new Date().toISOString()}] [SUCCESS] Ticket created successfully: ${ticket.TicketID}`);
        return res.status(201).json({
            success: true,
            data: ticket,
        });
    } catch (error) {
        console.error(`[${new Date().toISOString()}] [ERROR] Failed to create ticket:`, error);
        return res.status(500).json({
            success: false,
            message: "Internal server error while creating ticket",
        });
    }
};


export const getTickets = async (req: Request, res: Response) => {
    try {
        const oneTimeId = (req as any).user?.OneTimeID;

        if (!oneTimeId) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized: User Login is required",
            });
        }

        const tickets = await prisma.support.findMany({
            where: { userId: oneTimeId },
            orderBy: { createdAt: "desc" },
        });

        console.log(`[${new Date().toISOString()}] [SUCCESS] Found ${tickets.length} tickets for user: ${oneTimeId}`);
        return res.status(200).json({
            success: true,
            data: tickets,
        });
    } catch (error) {
        console.error(`[${new Date().toISOString()}] [ERROR] Failed to fetch tickets:`, error);
        return res.status(500).json({
            success: false,
            message: "Internal server error while fetching tickets",
        });
    }
};


export const getTicketById = async (req: Request, res: Response) => {
    try {
        const oneTimeId = (req as any).user?.OneTimeID;

        if (!oneTimeId) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized: User Login is required",
            });
        }

        const { id } = req.params as { id: string };

        const cachedData = await redis.get(`ticket:${id}`);

        if (cachedData) {
            return res.status(200).json({
                success: true,
                source: "cache",
                data: JSON.parse(cachedData),
            });
        }

        const ticket = await prisma.support.findFirst({
            where: { TicketID: id, userId: oneTimeId },
        });

        if (!ticket) {
            return res.status(404).json({
                success: false,
                message: "Ticket not found or access denied",
            });
        }

        await redis.set(`ticket:${id}`, JSON.stringify(ticket));

        return res.status(200).json({
            success: true,
            data: ticket,
        });
    } catch (error) {
        console.error(`[${new Date().toISOString()}] [ERROR] Failed to fetch ticket: ${req.params.id}`, error);
        return res.status(500).json({
            success: false,
            message: "Internal server error while fetching ticket",
        });
    }
};

// this update on admin 
export const updateTicket = async (req: Request, res: Response) => {
    try {
        const oneTimeId = (req as any).user?.OneTimeID;

        if (!oneTimeId) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized: User Login is required",
            });
        }
        const { id } = req.params as { id: string };
        const { subject, message, status } = req.body;
        console.log(`[${new Date().toISOString()}] [INFO] Updating ticket: ${id}`);

        const ifAdmin = (req as any).user?.Role;
        console.log(`[${new Date().toISOString()}] [INFO] Fetching tickets for user is : ${ifAdmin}`);

        if (ifAdmin !== "ADMIN") {
            return res.status(401).json({
                success: false,
                message: "User not Admin ",
            });
        }

        const updateData: any = {};
        if (subject) updateData.subject = subject;
        if (message) updateData.message = message;
        if (status) updateData.status = status;

        const updatedTicket = await prisma.support.update({
            where: { TicketID: id },
            data: updateData,
        });

        console.log(`[${new Date().toISOString()}] [SUCCESS] Ticket updated successfully: ${id}`);
        return res.status(200).json({
            success: true,
            data: updatedTicket,
        });
    } catch (error) {
        console.error(`[${new Date().toISOString()}] [ERROR] Failed to update ticket: ${req.params.id}`, error);
        return res.status(500).json({
            success: false,
            message: "Internal server error while updating ticket",
        });
    }
};

// delete ticket by admin 
export const deleteTicket = async (req: Request, res: Response) => {
    try {
        const oneTimeId = (req as any).user?.OneTimeID;

        if (!oneTimeId) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized: User Login is required",
            });
        }
        const { id } = req.params as { id: string };
        console.log(`[${new Date().toISOString()}] [INFO] Deleting ticket: ${id}`);


        const ifAdmin = (req as any).user?.Role;
        console.log(`[${new Date().toISOString()}] [INFO] Fetching tickets for user is : ${ifAdmin}`);

        if (ifAdmin !== "ADMIN") {
            return res.status(401).json({
                success: false,
                message: "User not Admin ",
            });
        }


        await prisma.support.delete({
            where: { TicketID: id },
        });

        console.log(`[${new Date().toISOString()}] [SUCCESS] Ticket deleted successfully: ${id}`);
        return res.status(200).json({
            success: true,
            message: "Ticket deleted successfully",
        });
    } catch (error) {
        console.error(`[${new Date().toISOString()}] [ERROR] Failed to delete ticket: ${req.params.id}`, error);
        return res.status(500).json({
            success: false,
            message: "Internal server error while deleting ticket",
        });
    }
};
