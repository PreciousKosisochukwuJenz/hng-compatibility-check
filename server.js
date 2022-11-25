require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
// const swaggerDocument = require("./swagger.json");
const authRoutes = require("./src/routes/auth.route");
const app = express();
const PORT = process.env.PORT || 8080;

const db_options = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
};

// middleware configurations
app.use(cors());
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

try {
  mongoose.connect(process.env.MONGODB_URI, db_options, () => {
    console.log(":::> Connected to MongoDB database");
  });
} catch (error) {
  console.log("<::: Couldn't connect to database ", error);
}

// Routes
app.get("/ping", (req, res) => {
  res.send({ mssg: "pong!" });
});
// app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use("/auth", authRoutes);

// On  server error
app.on("error", (error) => {
  console.error(`<::: An error occurred on the server: \n ${error}`);
});

// Start server
app.listen(PORT, () => {
  console.log(
    `:::> Server listening on port ${PORT} @ http://localhost:${PORT}`
  );
});
