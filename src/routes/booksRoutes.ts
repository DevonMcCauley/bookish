import { Router } from "express";
import { updateBookByID } from "../controllers/booksController";
import {
	getBooks,
	createBook,
	getBookByID,
	deleteBookByID,
} from "../controllers/booksController";

const router = Router();

// Routes related to books

// Return all books
router.get("/", getBooks);

// Create a book
router.post("/", createBook);

// Find book by id
router.get("/:bookID", getBookByID);

// Deletes a book by ID
router.delete("/:bookID", deleteBookByID);

// Updates a book
// May change to PATCH in the future
router.put("/:bookID", updateBookByID);

export default router;
