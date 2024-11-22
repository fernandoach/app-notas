import express from 'express'

const notasRoutes = express.Router()

notasRoutes.get('/', (req, res) => {
  return res.render('notas/index.ejs')
})

export { notasRoutes }
