import { getConnection } from '../db/context.js'
import mssql from 'mssql'

const verifyEmailExist = async (email) => {
  try {
    const connection = await getConnection()
    const query = await connection()
      .request()
      .input('email', mssql.VarChar, email)
      .query(
        `
          SELECT id
          FROM Usuarios
          WHERE email = @email;
        `
      )
    if (query.recordset.length === 0) {
      return true
    } else {
      return false
    }
  } catch (error) {
    console.log(error)
    return new Error(error)
  }
}

export { verifyEmailExist }
