import { Schema } from "mongoose";
import IBook from "../interfaces/IBook";

const bookSchema = new Schema<IBook>({
	title: { type: String, required: true },
	author: { type: String, required: true },
});

export default bookSchema;
