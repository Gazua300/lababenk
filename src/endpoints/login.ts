import { connection } from '../connection/connection'
import { Request, Response } from 'express'
import { Authenticate } from '../services/Authenticate'


export const login =  async(req:Request, res:Response):Promise<void>=>{
  let statusCode = 400

  try{

    const { email, cpf, password } = req.body

    if(!email || !cpf || !password){
      statusCode = 401
      throw new Error('Preencha os campos')
    }


    const [client] = await connection('labebank').where({
      email
    })

    if(!client){
      statusCode = 404
      throw new Error('Cliente não encontrado!')
    }

    const compare = new Authenticate().compare(password, client.password)
    const compareCpf = new Authenticate().compare(String(cpf), client.cpf)
    const token = new Authenticate().token(cpf)

    if(!compare){
      statusCode = 404
      throw new Error('Senha incorreta!')
    }

    if(!compareCpf){
      statusCode = 404
      throw new Error('Cpf inválido!')
    }


    res.status(200).send(token)
  }catch(error:any){
    res.status(statusCode).send(error.message || error.sqlMessage)
  }
}
