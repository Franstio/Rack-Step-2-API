import express from "express";
import ScalesRoute from "./routes/ScalesRoute.js";
import ScannerRoute from "./routes/ScannerRoute.js";
//import RackDoorRoute from "./routes/RackDoorRoute.js";
import RackRoute from "./routes/RackRoute.js"
import db from "./config/db.js";
import cors from  "cors";
import http from 'http';
import { Server } from "socket.io";
//import { getScales50Kg} from "./controllers/Scales.js";
import bodyParser from "body-parser";
//import {getWeightBin} from "./controllers/Bin.js"
import {config} from 'dotenv';
config();
const app = express();
const server = http.createServer(app);
const clientList= [];
const port = 5001;

 app.use(cors({
  origin: '*', // Allow any origin
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allow specific HTTP methods
/*  allowedHeaders: ['Content-Type', 'Authorization'], // Allow specific headers*/
  credentials:false 
}));

/* app.use(cors({
  credentials:false,
  origin: '*'
})); */

const io = new Server(server, {
  cors: {
    origin: "*"
  }
}); 

app.use(bodyParser.json());

try {
  await db.authenticate();
  console.log('Database terhubung..');
  
} catch (error) {
  console.log(error);
  
}

app.use(ScalesRoute);
app.use(ScannerRoute);
app.use(RackRoute);

io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('disconnect', () => {
      console.log('user disconnected');
  });
});

server.listen(port, () => {
  console.log(`Server up and running on port ${port}`);
});


export {clientList,io,Server};
//getScales50Kg(io);
