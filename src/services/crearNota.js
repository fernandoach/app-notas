import { getConnection } from "../db/context.js"
import mssql from 'mssql'

const crearNota = async (titulo, descripcion, img, prioridad, acceso, usuarioId) => {
  try {
    const connect = await getConnection()
    const queryResult = connect.request()
      .input('titulo', mssql.VarChar, titulo)
      .input('descripcion', mssql.VarChar, descripcion)
      .input('img', mssql.VarBinary, img)
      .input('prioridad', mssql.Int, prioridad)
      .input('acceso', mssql.Char, acceso)
      .input('usuarioId', mssql.Int, usuarioId)
      .query(
      `
        INSERT INTO Notas(titulo, descripcion, img, prioridad, acceso, usuarioId)
        VALUES(@titulo, @descripcion, @img, @prioridad, @acceso, @usuarioId);
      `
      )
  } catch (error) {
    
  }
}

export { crearNota }
