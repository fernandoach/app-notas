import express from 'express'
import { crearUsuario } from '../services/crearUsuario.js'
import { listarUsuarioPorEmail } from '../services/listarUsuarioPorEmail.js'

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
    // comprobar que el usuario no existe
    const userExist = await listarUsuarioPorEmail(email)
    const findIndex = userExist.findIndex(o => o.email === email)
    if (findIndex === -1) {
      await crearUsuario(nombreCompleto, genero, email, passwd, repasswd)
      return res.redirect('/usuarios/login')
    }
    return res.redirect('/usuarios/register')
  } catch (error) {
    return res.json(error)
  }
})

export { usuariosRoutes }
