import app from "./src/app.js";
import dotenv from "dotenv";
import connectDB from "./src/config/db.js";
import { main } from "./src/config/ai.js";

dotenv.config();

connectDB();
main();




app.listen(3000, () => {
    console.log("Server is running on port 3000");
})