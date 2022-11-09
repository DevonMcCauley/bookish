import express, { Express } from "express";
import * as dotenv from "dotenv";
import { json } from "body-parser";
import mongoose from "mongoose";
import bookRoutes from "./src/routes/booksRoutes";

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

// Enables body-parer middleware
app.use(json());

app.use("/books", bookRoutes);

// Basic starting response
app.get("/", (req, res) => {
	res.send("Books API");
});

startDatabase().catch((err) => console.log(err));

// Uses Mongoose to connect to the MongoDB database
async function startDatabase() {
	await mongoose.connect(process.env.DB_CONN_STRING as string);
}

// Starts the Express app/server
app.listen(port, () => {
	console.log(`Server started at http://localhost:${port}`);
});
