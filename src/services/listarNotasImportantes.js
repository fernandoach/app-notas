import { getConnection } from '../db/context.js'

const getNotasImportantes = async (id) => {
  try {
    const connection = await getConnection()
    const queryResult = connection.request().query(
      `
        SELECT titulo, descripcion, img, prioridad, acceso, usuarioId
        FROM Notas 
        WHERE (id=${id})
        ORDER BY prioridad;
      `
    )

    return queryResult
  } catch (error) {
    console.log(error)
    return error
  }
}

export { getNotasImportantes }
