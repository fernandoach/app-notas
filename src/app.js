import express from 'express'
import dotenv from 'dotenv'
import { dirname, join } from 'path'
import { fileURLToPath } from 'url'
import { usuariosRoutes } from './routes/usuarios.js'
import { notasRoutes } from './routes/notas.js'

dotenv.config()

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const app = express()

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.set('view engine', 'ejs')
app.use(express.static('public'))
app.set('views', join(__dirname, 'views'))
app.use('/usuarios', usuariosRoutes)
app.use('/notas', notasRoutes)

app.get('/', async (request, response) => {
  return response.render('pages/index.ejs')
})

app.listen(process.env.PORT || 3000, () => {
  console.log(`Server on => http://localhost:${process.env.PORT || 3000}`)
})
