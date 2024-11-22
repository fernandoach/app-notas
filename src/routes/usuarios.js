import express from 'express'
import { crearUsuario } from '../services/crearUsuario.js'
import { listarUsuarioPorEmail } from '../services/listarUsuarioPorEmail.js'
import { listarUsuarioYPasswd } from '../services/listarUsuarioYPasswd.js'
import bcrypt from 'bcrypt'

const usuariosRoutes = express.Router()

usuariosRoutes.get('/login', (req, res) => {
  return res.render('usuarios/login.ejs')
})

usuariosRoutes.post('/login', async (req, res) => {
  try {
    const { email, passwd } = req.body
    const existUser = await listarUsuarioYPasswd(email)
    if (existUser.length === 0) {
      return res.json('usuario y/o contraseña incorrectos')
    }
    const compare = await bcrypt.compare(passwd, existUser[0].passwd)
    return res.json(compare)
  } catch (error) {
    return res.redirect('/usuarios/login')
  }
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
