import { Router } from "express";
import {
	getBooks,
	createBook,
	getBookByID,
	deleteBookByID
} from "../controllers/booksController";

const router = Router();

// Routes related to books

// Return all books
router.get("/", getBooks);

// Create a book
router.post("/", createBook);

// Find book by id
router.get("/:bookID", getBookByID);

router.delete("/:bookID", deleteBookByID);

export default router;
