import express, { Express } from "express";
import { json } from "body-parser";
import dotenv from "dotenv";
import bookRoutes from "./src/routes/booksRoutes";
import { connectToDatabase } from "./src/services/database";

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

// Enables body-parer middleware
app.use(json());

// Basic starting response
app.get("/", (req, res) => {
	res.send("Books API");
});

// Starts the Express app/server

connectToDatabase()
	.then(() => {
		app.use("/books", bookRoutes);

		app.listen(port, () => {
			console.log(`Server started at http://localhost:${port}`);
		});
	})
	.catch((error: Error) => {
		console.error("Database connection failed", error);
		process.exit();
	});
