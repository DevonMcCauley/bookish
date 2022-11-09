import { Schema } from "mongoose";

const bookSchema = new Schema<IBook>({
	title: { type: String, required: true },
	author: { type: String, required: true },
});

export default bookSchema;
