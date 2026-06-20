import { Router } from "express";
import { createTicket, getTickets, getTicketById, updateTicket, deleteTicket } from "./support.controller.js";
import { authMiddleware } from "../middleware/Auth.middlewere.js";

const router = Router();


router.post('/create', authMiddleware, createTicket);


router.get('/get', authMiddleware, getTickets);


router.get('/get/:id', authMiddleware, getTicketById);


router.patch('/update/:id', authMiddleware, updateTicket);


router.delete('/delete/:id', authMiddleware, deleteTicket);

export default router;
