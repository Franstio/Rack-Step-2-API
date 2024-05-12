import express from "express";
import RackDoorRoute from "./routes/RackDoorRoute.js";
import cors from  "cors";
import http from 'http';
import { Server } from "socket.io";
import db from "./config/db.js";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import RackRoute from "./routes/RackRoute.js"


const app = express();
const server = http.createServer(app);

/* try {
  await db.authenticate();
  console.log('Database terhubung..');
  
} catch (error) {
  console.error(error);
  
} */

const port = 5000;

app.use(cors({
  credentials: true,
  origin: 'http://localhost:3000'
}));

app.use(bodyParser.json());
app.use(cookieParser());
app.use(RackDoorRoute);
app.use(RackRoute);


server.listen(port, () => {
  console.log(`Server up and running on port ${port}`);
});
