import { Request, RequestHandler, Response } from 'express';
import mongoose from 'mongoose';
import bookSchema from '../models/schemas/BookSchema';
import Book from '../models/Book';

// TODO: Refactor getBooks to reduce code repetition

// Returns all books
export const getBooks: RequestHandler = async (req: Request, res: Response) => {
	const author = req.body.author;
	const title = req.body.title;
	const Book = mongoose.model('Book', bookSchema);

	// Determines which type of query to perform
	if (author && title) {
		// Search on author AND title
		try {
			const books = await Book.find({ title: title, author: author });
			console.log(books);
			if (books.length == 0) {
				res.status(200).send({
					success: true,
					message: `No books were found with title: ${title} & author: ${author}`,
				});
			} else {
				res.status(200).send({ success: true, books });
			}
		} catch (error) {
			if (error instanceof Error) {
				res.status(500).send({ success: false, error: error.message });
			}
		}
	} else if (author) {
		// Search on author
		try {
			const books = await Book.find({ author: author });
			if (books.length == 0) {
				res.status(200).send({
					success: true,
					message: `No books were found with author: ${author}`,
				});
			} else {
				res.status(200).send({ success: true, books });
			}
		} catch (error) {
			if (error instanceof Error) {
				res.status(500).send({ success: false, error: error.message });
			}
		}
	} else if (title) {
		// Search on title
		try {
			const books = await Book.find({ title: title });
			if (books.length == 0) {
				res.status(200).send({
					success: true,
					message: `No books were found with title: ${title}`,
				});
			} else {
				res.status(200).send({ success: true, books });
			}
		} catch (error) {
			if (error instanceof Error) {
				res.status(500).send({ success: false, error: error.message });
			}
		}
	} else {
		// Return all books
		try {
			const books = await Book.find();
			if (books.length == 0) {
				res.status(200).send({
					success: true,
					message: `No books were found`,
				});
			} else {
				res.status(200).send({ success: true, books });
			}
		} catch (error) {
			if (error instanceof Error) {
				res.status(500).send({ success: false, error: error.message });
			}
		}
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
	} catch (error) {
		if (error instanceof Error) {
			res.status(400).send({ success: false, message: error.message });
		}
	}
};

// Finds and returns a single book by its ID
export const getBookByID: RequestHandler = async (
	req: Request,
	res: Response
) => {
	const id = req?.params?.bookID;
	try {
		const Book = mongoose.model('Book', bookSchema);
		const book = await Book.findById({ _id: id });
		res.status(200).send({ success: true, book });
	} catch (error) {
		if (error instanceof Error) {
			res.status(404).send({ success: false, message: error.message });
		}
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
	} catch (error) {
		if (error instanceof Error) {
			res.status(400).send({ success: false, message: error.message });
		}
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
			message: 'Sucessfully updated book',
			book,
		});
	} catch (error) {
		if (error instanceof Error) {
			res.status(400).send({ success: false, message: error.message });
		}
	}
};

export const getBooksByAuthor: RequestHandler = async (
	req: Request,
	res: Response
) => {
	const author = req?.params?.author;
	console.log(author);
	try {
		const Book = mongoose.model('Book', bookSchema);
		const books = await Book.find({ author: author });
		res.status(200).send({ success: true, books });
	} catch (error) {
		if (error instanceof Error) {
			res.status(404).send({ success: false, message: error.message });
		}
	}
};
