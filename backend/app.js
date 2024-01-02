const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const notesRoutes = require("./routes/notesRoutes");
const cookieParser = require("cookie-parser");
const connectToDatabase = require("./config/database");
const { generateDocumentation } = require("./swagger/swagger");
const swaggerUi = require("swagger-ui-express");
const swaggerFile = require("./swagger/swagger_output.json");

const app = express();

dotenv.config({ path: "./config.env" });
// app.listen(3000);

const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true, //access-control-allow-credentials:true
};

// middlewares
app.use(cors(corsOptions));
app.use(express.static("public"));
app.use(express.json());
app.use(cookieParser());

const port = process.env.PORT || 5000;

// Connect to the database
connectToDatabase();

// generate swagger documentation
generateDocumentation();
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.use(authRoutes);
app.use(notesRoutes);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

if (process.env.NODE_ENV == "production") {
  const path = require("path");
  app.use(express.static(path.resolve(__dirname, "..", "client", "build")));
  app.get("*", function (req, res) {
    res.sendFile(
      path.resolve(__dirname, "..", "client", "build", "index.html")
    );
  });
}
