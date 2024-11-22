import { getConnection } from '../db/context.js'
import mssql from 'mssql'
import bcrypt from 'bcrypt'

const crearUsuario = async (nombreCompleto, genero, email, passwd, repasswd) => {
  try {
    if (passwd === repasswd) {
      const connection = await getConnection()
      const newPassword = await bcrypt.hash(passwd, 12)
      const query = await connection
        .request()
        .input('nombreCompleto', mssql.VarChar, nombreCompleto)
        .input('genero', mssql.Char, genero)
        .input('email', mssql.VarChar, email)
        .input('passwd', mssql.VarChar, newPassword)
        .query(
        `
          INSERT INTO Usuarios(nombreCompleto, genero, email, passwd)
          VALUES(@nombreCompleto, @genero, @email, @passwd);
        `
        )
      return query
    }
    return null
  } catch (error) {
    console.log(error)
    return new Error(error)
  }
}

export { crearUsuario }
