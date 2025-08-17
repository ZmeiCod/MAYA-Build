require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require('cookie-parser')
const sequelize = require("./db");
const models = require("./models/models");

const cors = require("cors");
const router = require("./routes/index");
const frontpadRouter = require("./routes/frontpadRouter");
const errorMiddleware = require("./middleware/ErrorHandlingMiddleware");
const fileUpload = require("express-fileupload");
const path = require("path");

const PORT = process.env.PORT;
const app = express();

const allowedOrigins = [
  "http://localhost:3000",
  "https://localhost:3000",
  "http://localhost:5173",
  "https://localhost:5173",
  "http://81.177.223.206:7878",
  "http://81.177.223.206",
  "http://xn--80ax2d.xn--p1ai",
  "http://xn--80ax2d.xn--p1ai:7878",
  "https://app.frontpad.ru",
  "https://81.177.223.206:7878",
  "https://81.177.223.206",
  "https://xn--80ax2d.xn--p1ai",
  "https://xn--80ax2d.xn--p1ai:7878",
  "https://app.frontpad.ru",
];

let corsOptions = {
  origin: (origin, callback) => {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      console.log("Origin not allowed by CORS:", origin);
      callback(new Error("Not allowed by CORS"));
    }
  },
  optionsSuccessStatus: 200,
  credentials: true,
};

app.enable('trust proxy')
app.use(cookieParser())
app.use(cors(corsOptions));
app.use(express.json({ limit: '10mb' })); // Увеличиваем лимит на размер JSON
app.use(express.urlencoded({ limit: '10mb', extended: true })); // Увеличиваем лимит на размер URL-кодированных данных
app.use("/api/static", express.static(path.resolve(__dirname, "static")));
app.use(fileUpload({}));
app.use("/api", router);
app.use("/api/frontpad", frontpadRouter);
app.use(errorMiddleware);

const start = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
  } catch (e) {
    console.log(e);
  }
};

start();
