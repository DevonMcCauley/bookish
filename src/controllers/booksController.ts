import { Request, RequestHandler, Response } from "express";
import { collections } from "../services/database";
import { ObjectId } from "mongodb";

// Returns all books
export const getBooks: RequestHandler = async (req: Request, res: Response) => {
	try {
		const books = await collections.books!.find({}).toArray();
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
		const newBook = req.body;
		const result = await collections.books!.insertOne(newBook);

		if (result) {
			res.status(201).send({
				success: true,
				message: `Successfully created book`,
				book: newBook,
			});
		} else {
			res.status(500).send({
				success: false,
				message: "Failed to create a new book",
			});
		}
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
		const query = { _id: new ObjectId(id) };
		const book = await collections.books!.findOne(query);

		if (book) {
			res.status(200).send({
				success: true,
				message: "Successfully created book",
				book,
			});
		}
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
		const query = { _id: new ObjectId(id) };
		const result = await collections.books!.deleteOne(query);

		if (result && result.deletedCount) {
			res.status(202).send({
				success: true,
				message: `Successfully deleted book with id: ${id}`,
			});
		} else if (!result) {
			res.status(400).send({
				success: false,
				message: `Failed to delete book with id: ${id}`,
			});
		} else if (!result.deletedCount) {
			res.status(404).send({
				success: false,
				message: `A book with id: ${id} does not exist`,
			});
		}
	} catch (error: any) {
		res.status(400).send({ success: false, message: error.message });
	}
};

// Finds and updates a single book by its ID
export const updateBookByID: RequestHandler = async (
	req: Request,
	res: Response
) => {
	const id = req?.params?.id;

	try {
		const updatedBook = req.body;
		const query = { _id: new ObjectId(id) };
		// $set adds or updates all fields
		const result = await collections.books!.updateOne(query, {
			$set: updatedBook,
		});

		if (result) {
			res.status(200).send({
				success: true,
				message: "Sucessfully updated book",
			});
		} else {
			res.status(304).send({
				success: true,
				message: `Book with id: ${id} was not updated`,
			});
		}
	} catch (error: any) {
		res.status(400).send({ success: false, message: error.message });
	}
};
