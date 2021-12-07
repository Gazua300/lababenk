import { connection } from '../connection/connection'
import { Request, Response } from 'express'


export const getStatement = async(req:Request, res:Response):Promise<void>=>{
  let statusCode = 400

  try{

	   const { name, cpf } = req.body

     if(!name || !cpf){
       statusCode = 401
       throw new Error('Preencha os campos')
     }

     const [client] = await connection('labebank').where({
       cpf
     })

     if(!client){
       statusCode = 404
       throw new Error('Cliente não encontrado!')
     }

     if(name !== client.name){
       statusCode = 403
       throw new Error('Dados inválidos!')
     }


     const statement = await connection('labebank_statement').where({
       client_id: cpf
     })

     res.status(200).send(statement)
	}catch(error: any){
		res.status(statusCode).send({message: error.message || error.sqlMessage})
	}
}
