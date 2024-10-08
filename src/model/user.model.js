import mongoose from "mongoose";

const schema = new mongoose.Schema({
    first_name: {
        type: String,
        require: true
    },
    last_name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true,
        index: true,
        unique:true
    },
    password: {
        type: String,
        require: true
    },
    age: {
        type: Number,
        requiere:true
    }
})

const UserModel = mongoose.model("users", schema);

export default  UserModel;