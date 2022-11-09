import { Request, RequestHandler, Response } from "express";
import mongoose, { model } from "mongoose";
import bookSchema from "../models/schemas/BookSchema";
import Book from "../models/Book";

// Returns all books
export const getBooks: RequestHandler = async (req: Request, res: Response) => {
	try {
		const Book = mongoose.model("Book", bookSchema);
		const books = await Book.find();
		res.status(200).send({ success: true, books });
	} catch (error: any) {
		res.status(500).send({ success: false, error: error.message });
	}
};

// Creates a single book
export const createBook: RequestHandler = async (
	req: Request,
	res: Response
) => {
	try {
		const book = new Book({
			title: req.body.title,
			author: req.body.author,
		});

		book.save();

		res.status(201).send({
			success: true,
			message: `Successfully created book`,
			book: book,
		});
	} catch (error: any) {
		res.status(400).send({ success: false, message: error.message });
	}
};

// Finds and returns a single book by its ID
export const getBookByID: RequestHandler = async (
	req: Request,
	res: Response
) => {
	const id = req?.params?.bookID;
	try {
		const Book = mongoose.model("Book", bookSchema);
		const book = await Book.findById({ _id: id });
		res.status(200).send({ success: true, book });
	} catch (error: any) {
		res.status(404).send({ success: false, message: error.message });
	}
};

// Finds and deletes a single book by its ID
export const deleteBookByID: RequestHandler = async (
	req: Request,
	res: Response
) => {
	const id = req?.params?.bookID;

	try {
		const book = await Book.findByIdAndDelete({ _id: id });

		if (book == null) {
			res.status(202).send({
				success: true,
				message: `Successfully deleted book with id: ${id}`,
			});
		} else {
			res.status(400).send({
				success: false,
				message: `Failed to delete book with id: ${id}`,
			});
		}
	} catch (error: any) {
		res.status(400).send({ success: false, message: error.message });
	}
};

// // Finds and updates a single book by its ID
export const updateBookByID: RequestHandler = async (
	req: Request,
	res: Response
) => {
	const id = req.params.bookID;

	const newTitle = req.body.title;
	const newAuthor = req.body.author;

	try {
		const book = await Book.findByIdAndUpdate(id, {
			title: newTitle,
			author: newAuthor,
		});

		res.status(200).send({
			success: true,
			message: "Sucessfully updated book",
			book,
		});
	} catch (error: any) {
		res.status(400).send({ success: false, message: error.message });
	}
};
