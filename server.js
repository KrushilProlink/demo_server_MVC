const express = require('express')
const cookieParser = require("cookie-parser");
const cors = require("cors");
const connectDB = require("./config/db");
const serverRoutes = require("./routes/serverRoutes");
require("dotenv").config();

const app = express();
connectDB(process.env.MONGO_URI,process.env.DB_NAME);

app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use("/api", serverRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
