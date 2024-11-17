import * as dotenv from "dotenv";
import { configs } from "./configs";
import app from "./app";

dotenv.config();

const port = configs.PORT || 7869;

app.listen(port, () => {
	console.log(`Server is running at http://localhost:${port}/`);
});
