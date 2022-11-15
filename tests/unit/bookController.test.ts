import 'jest';
import {
	getBooks,
	createBook,
	getBookByID,
	deleteBookByID,
	updateBookByID,
	getBooksByAuthor,
} from '../../src/controllers/bookController';

describe('GET All Book Requests', () => {
	it('should have a getBooks() function', () => {
		expect(typeof getBooks).toBe('function');
	});
});
describe('CREATE Book Requests', () => {
	it('should have a createBook() function', () => {
		expect(typeof createBook).toBe('function');
	});
});

describe('GET Book By ID Request', () => {
	it('should have a getBookByID() function', () => {
		expect(typeof getBookByID).toBe('function');
	});
});
describe('DELETE Book Requests', () => {
	it('should have a deleteBookByID() function', () => {
		expect(typeof deleteBookByID).toBe('function');
	});
});
describe('UPDATE Book By ID Requests', () => {
	it('should have a updateBookByID() function', () => {
		expect(typeof updateBookByID).toBe('function');
	});
});
describe('GET Books By Author Requests', () => {
	it('should have a getBooksByAuthor() function', () => {
		expect(typeof getBooksByAuthor).toBe('function');
	});
});
