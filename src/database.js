import mongoose from "mongoose";

    mongoose.connect("mongodb+srv://nicocaci:nicocaci@coderhouse.ihpiu.mongodb.net/sessions?retryWrites=true&w=majority&appName=coderhouse")
    .then(() => console.log ("Conectado a la BS"))
    .catch(() => console.log ("Error al conectar la BS "))