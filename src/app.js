import express from "express";
import session from "express-session";
import { engine } from "express-handlebars";
import sessionRouter from "./routes/session.router.js"
import viewRouter from "./routes/views.router.js"
import "./database.js"
const app = express();
const PUERTO = 8080;

import cookieParser from "cookie-parser";

import FileStore from "session-file-store";
const fileStore = new FileStore(session);

import MongoStore from "connect-mongo";


// MIDDLEWARE
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());
app.use(session({
    secret: "nicocaci",
    resave: true,
    saveUninitialized:true,
    // store: new fileStore({path: "./src/session", ttl: 6000, retries: 2})
    // store: MongoStore.create({mongoUrl:"mongodb+srv://nicocaci:nicocaci@coderhouse.ihpiu.mongodb.net/sessions?retryWrites=true&w=majority&appName=coderhouse"})
}))

// HANDLEBARS
app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", "./src/views");



// // RUTAS

// app.get("/login", (req,res)  =>{
//     let usuario = req.query.usuario;

//     req.session.usuario = usuario;
//     res.send("Usuario creado correctamente");
// })

// app.get("/usuario", (req,res) => {
//     if (req.session.usuario){
//     return res.send(`Ultimo seguidor: ${req.session.usuario}`)
//     }
//     res.send("No hubo mas seguidores")
// })


// ROUTES
app.use("/api/sessions", sessionRouter);
app.use("/", viewRouter);



// LISTEN
app.listen(PUERTO, () => console.log(`Escuchando en el puerto: ${PUERTO}`));