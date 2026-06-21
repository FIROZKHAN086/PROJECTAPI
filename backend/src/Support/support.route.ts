import { Router } from "express";
import { createTicket, getTickets, getTicketById, updateTicket, deleteTicket } from "./support.controller.js";
import { authMiddleware } from "../middleware/Auth.middlewere.js";
import { rateLimitMiddleware } from "../middleware/rateLimit.middleware.js";

const router = Router();


router.post('/create',rateLimitMiddleware, authMiddleware, createTicket);


router.get('/get',rateLimitMiddleware, authMiddleware, getTickets);


router.get('/get/:id',rateLimitMiddleware, authMiddleware, getTicketById);


router.patch('/update/:id',rateLimitMiddleware, authMiddleware, updateTicket);


router.delete('/delete/:id',rateLimitMiddleware, authMiddleware, deleteTicket);

export default router;
