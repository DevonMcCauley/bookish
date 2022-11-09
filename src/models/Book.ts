import { model } from "mongoose";
import BookSchema from "./schemas/BookSchema";

const Book = model<IBook>("Book", BookSchema);
export default Book;
