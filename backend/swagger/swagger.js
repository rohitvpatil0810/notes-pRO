const swaggerAutogen = require("swagger-autogen")();

const generateDocumentation = () => {
  const doc = {
    info: {
      version: "1.0.0",
      title: "Notes pRO API",
    },
    host: ["localhost:5000"],
    schemes: ["http", "https"],
  };

  const outputFile = "./swagger/swagger_output.json";
  const endpointsFiles = ["./routes/authRoutes.js", "./routes/notesRoutes.js"];
  swaggerAutogen(outputFile, endpointsFiles, doc);
};
module.exports = { generateDocumentation };
