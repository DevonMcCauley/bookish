import { ObjectId } from "mongodb";
class Book {
	// Book class
	constructor(
		public title: string,
		public author: string,
		public id?: ObjectId
	) {}
}

export default Book;
