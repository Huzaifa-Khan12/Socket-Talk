import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.routes.js";
import connectToMongoDB from "./db/connectToMongoDB.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
//middleware to go the auth routes
app.use("/api/auth", authRoutes);

// app.get("/", (req, res) => {
//   res.send("Hello World!");
// });

app.listen(port, () => {
  connectToMongoDB();
  console.log(`Server listening on port: ${port}`);
});
