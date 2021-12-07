import { connection } from '../connection/connection'
import { Request, Response } from 'express'



export const getBalance = async(req:Request, res:Response):Promise<void>=>{
  try{

		const balance = await connection.raw(`select balance from labebank where cpf=${req.body.cpf}`)
		const result = balance[0]

		res.status(200).send(result)

	}catch(error: any){
		res.status(400).send({message: error.message || error.sqlMessage})
	}
}
