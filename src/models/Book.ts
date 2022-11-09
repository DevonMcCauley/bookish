class Book {
	title: string;
	author: string;
	id: number;

	// Book class

	constructor(id: number, title: string, author: string) {
		this.id = id;
		this.title = title;
		this.author = author;
	}
}

export default Book;
