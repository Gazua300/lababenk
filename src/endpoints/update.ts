import { connection } from '../connection/connection'
import { Request, Response } from 'express'
import { Authenticate } from '../services/Authenticate'


export const update = async(req:Request, res:Response):Promise<void>=>{
  let statusCode = 400

  try{

    const { cpf, password } = req.body

    if(!cpf || !password){
      statusCode = 401
      throw new Error('Preencha os campos')
    }


    const [client] = await connection('labebank').where({
      cpf
    })

    if(!client){
      statusCode = 404
      throw new Error('Cliente não encontrado')
    }

    const hash = new Authenticate().hash(password)

    await connection('labebank').update({
      password: hash
    }).where({
      cpf
    })

    res.status(200).send('Dados atualizados!')
  }catch(error:any){
    res.status(statusCode).send(error.message || error.sqlMessage)
  }
}
