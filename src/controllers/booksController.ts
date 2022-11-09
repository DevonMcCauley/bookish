import { NextFunction, Request, RequestHandler, Response } from "express";
import Book from "../models/Book";

const BOOKS: Book[] = [];

// Generates a handful of books (pre-database implementation)
export const generateBooks = () => {
	BOOKS.push(new Book(1, "Book1", "Author1"));
	BOOKS.push(new Book(2, "Book2", "Author2"));
	BOOKS.push(new Book(3, "Book3", "Author3"));
	BOOKS.push(new Book(4, "Book4", "Author4"));
	BOOKS.push(new Book(5, "Book4", "Author5"));
};

// Returns all books
export const getBooks: RequestHandler = (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	res.json({ book: BOOKS });
};

// Creates a single book
export const createBook: RequestHandler = (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const bookTitle = req.body.title;
	const bookAuthor = req.body.author;

	const newBook = new Book(Math.random(), bookTitle, bookAuthor);

	BOOKS.push(newBook);
	res.status(201).json({ message: "Created book" });
};

// Finds and returns a single book by its ID
export const getBookByID: RequestHandler = (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const bookID: number = Number.parseInt(req.params.bookID);

	const foundBook = BOOKS.find((book) => {
		return book.id == bookID;
	});
	res.status(201).json({ Book: foundBook });
};

// Finds and deletes a single book by its ID
export const deleteBookByID: RequestHandler = (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const bookID: number = Number.parseInt(req.params.bookID);

	const bookIndex = BOOKS.findIndex((book) => {
		return book.id === bookID;
	});

	if (bookIndex !== -1) {
		BOOKS.splice(bookIndex, 1);
	}

	res.status(201).json({ message: "Removed book" });
};

// Finds and updates a single book by its ID
export const updateBookByID: RequestHandler = (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const bookID: number = Number.parseInt(req.params.bookID);
	const title = req.body.title;
	const author = req.body.author;

	const bookIndex = BOOKS.findIndex((book) => {
		return book.id === bookID;
	});

	let book = BOOKS[bookIndex];
	book.title = title;
	book.author = author;

	res.status(201).json({ message: "Updated book" });
};
