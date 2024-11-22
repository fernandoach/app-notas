import express from 'express'
import { crearUsuario } from '../services/crearUsuario.js'

const usuariosRoutes = express.Router()

usuariosRoutes.get('/login', (req, res) => {
  return res.render('usuarios/login.ejs')
})

usuariosRoutes.get('/register', (req, res) => {
  return res.render('usuarios/register.ejs')
})

usuariosRoutes.post('/register', async (req, res) => {
  try {
    const { nombreCompleto, genero, email, passwd, repasswd } = req.body
    console.log(req.body)
    await crearUsuario(nombreCompleto, genero, email, passwd, repasswd)
    return res.redirect('/')
  } catch (error) {
    return res.json(error)
  }
})

export { usuariosRoutes }
