import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import swaggerUI from "swagger-ui-express";
import dotenv from "dotenv";

import swaggerSpec from "./swaggerDocs.js";
import postRoutes from "./routes/posts.js";

dotenv.config();
const app = express();
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerSpec));

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.use("/tasks", postRoutes);

const CONNECTION_URL = process.env.MONGODB_URL;
console.log(CONNECTION_URL);
const PORT = process.env.PORT || 5000;

mongoose
  .connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() =>
    app.listen(PORT, () =>
      console.log(`Server Running on Port: http://localhost:${PORT}`)
    )
  )
  .catch((error) => console.log(`${error} did not connect`));

mongoose.set("useFindAndModify", false);
