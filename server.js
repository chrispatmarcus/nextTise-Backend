const express = require("express");
const errorHandler = require("./middleware/errorHandler");
const connectDb = require("./config/dbConnection");
const dotenv = require("dotenv").config();

const app = express();

const port = process.env.PORT || 5000;
app.use(express.json());

app.use("/api/contacts", require("./routes/contactRoutes"));
app.use("/api/news", require("./routes/newsRoutes"));
app.use("/api/event", require("./routes/eventRoutes"));
app.use("/api/meditation", require("./routes/meditationRoutes"));
app.use("/api/sermon", require("./routes/sermonRoutes"));
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/admin", require("./routes/adminRoutes"));
app.use(errorHandler);

const startServer = async () => {
  try {
    await connectDb();
    app.listen(port, () => {
      console.log(`🚀 Server running on port ${port}`);
    });
  } catch (error) {
    console.error("❌ Failed to start server:", error.message);
    process.exit(1);
  }
};

startServer();
