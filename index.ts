import express, { Express } from "express";
import { json } from "body-parser";
import dotenv from "dotenv";
import bookRoutes from "./src/routes/booksRoutes";
import { generateBooks } from "./src/controllers/booksController";

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

// Enables body-parer middleware
app.use(json());


// Enables the Books routes
app.use("/books", bookRoutes);

// Basic starting response
app.get("/", (req, res) => {
	res.send("Books API");
});

// Starts the Express app/server
app.listen(port, () => {
	console.log(`[server]: Server is running at http://localhost:${port}`);

	generateBooks();
});
