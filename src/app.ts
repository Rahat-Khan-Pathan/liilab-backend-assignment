import express from "express";
import cors from "cors";
import * as dotenv from "dotenv";
import { configs } from "./configs";
import apiRoutes from "./Routess";
import { seedData } from "./SeedDatas/Seed";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const port = configs.PORT || 7869;

app.use("/api/", apiRoutes);

// api for seed data
app.get("/seedData", seedData);

app.get("/", (req, res) => {
	res.send("Hello World!");
});

app.listen(port, () => {
	console.log(`Server is running at http://localhost:${port}/`);
});
