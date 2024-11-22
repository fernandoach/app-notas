import { getConnection } from '../db/context.js'
import mssql from 'mssql'

const listarUsuarioPorEmail = async (email) => {
  try {
    const connection = await getConnection()
    const query = await connection
      .request()
      .input('email', mssql.VarChar, email)
      .query(
        `
          SELECT email
          FROM Usuarios 
          WHERE email=@email;
        `
      )
    return query.recordset
  } catch (error) {
    return new Error(error)
  }
}

export { listarUsuarioPorEmail }
