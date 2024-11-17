import express from "express";
import cors from "cors";
import apiRoutes from "./Routes";
import { seedData } from "./SeedData/Seed";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/", apiRoutes);

// api for seed data
app.get("/seedData", seedData);

app.get("/", (req, res) => {
	res.send("Hello World!");
});

export default app;
