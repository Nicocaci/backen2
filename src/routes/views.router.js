
import { Router } from "express";
const router = Router();

// FORMULARIO DE REGISTRO

router.get("/registro", (req,res) => {
    res.render("registro");
})



// FORMULARIO DE LOGIN

router.get("/login", (req,res) => {
    res.render("login");
})

// HOME PERFIL

router.get("/perfil", (req,res) => {
    res.render("perfil",{user: req.session.user} )
})









export default router;