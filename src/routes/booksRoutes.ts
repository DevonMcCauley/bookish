import { Router } from "express";
import {
	getBooks,
	createBook,
	getBookByID,
} from "../controllers/booksController";

const router = Router();

// Routes related to books

// Return all books
router.get("/", getBooks);

// Create a book
router.post("/", createBook);

// Find book by id
router.get("/:bookID", getBookByID);

export default router;
