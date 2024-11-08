import express from 'express'
import dotenv from 'dotenv'
import { dirname, join } from 'path'
import { fileURLToPath } from 'url'

dotenv.config()

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const app = express()

app.use(express.json())
app.set('view engine', 'ejs')
app.use(express.static('public'))
app.set('views', join(__dirname, 'views'))

app.get('/', async (request, response) => {
  return response.render('pages/index.ejs')
})

app.listen(process.env.PORT || 3000, () => {
  console.log(`Server on => http://localhost:${process.env.PORT || 3000}`)
})
