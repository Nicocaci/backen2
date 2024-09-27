
import { Router } from "express";
const router = Router();
import UserModel from "../model/user.model.js";

// RUTA PARA REGISTRAR USUARIO Y GUARDARLO EN MONGO DB

router.post("/registro", async (req,res) => {
    const {first_name,last_name,password,email,age} = req.body;
    try {
        const existeUsuario = await UserModel.findOne({email: email});
        if (existeUsuario){
            return res.status(400).send("El correo electronico ingresado ya fue utilizado")
        }
        // SI EL USUARIO NUNCA FUE USADO, PUEDO REGISTRAR EL USUARIO
        const nuevoUser = await UserModel.create({
            first_name,
            last_name,
            password,
            email,
            age,
        })
        // ALMACENAMOS TODOS LOS DATOS DEL USUARIO EN LA SESSION
        req.session.user = {
            first_name: nuevoUser.first_name,
            last_name: nuevoUser.last_name,
            password: nuevoUser.password,
            email: nuevoUser.email,
            age: nuevoUser.age
        }
        
        res.status(200).send("Usuario creado correctamente")
    } catch (error) {
        res.status(500).send("Erorr del servidor")
    }
})

// RUTA PARA EL LOGIN

router.post("/login", async (req,res) =>{
    const {email, password} = req.body;

    try {
        const usuario = await UserModel.findOne({email: email});
        if(usuario){
            // SI EXISTE USUARIO VERIFICO CONTRASEÑA
            if(usuario.password === password){
                req.session.user = {
                    first_name: usuario.first_name,
                    last_name: usuario.last_name,
                    email: usuario.email,
                    age: usuario.age
                }
                res.redirect("/perfil")
            }else{
                res.status(401).send("Password incorrecto")
            }
        }else{
            res.status(404).send("Usuario no encontrado")
        }


    } catch (error) {
        res.status(500).send("error del servidor")
    }
})

export default router;