import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import {router} from "./routes/pusher"
import { errorHandling, withErrorHandling } from "./middleware";

dotenv.config();

const app = express();
const PORT = process.env.PORT ?? 8000;

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.use("/pusher", router);
app.use(errorHandling)

app.get("/", (req, res) => {
    res.send("Hello World");
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

export default app;
