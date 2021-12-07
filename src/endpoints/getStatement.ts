import { connection } from '../connection/connection'
import { Request, Response } from 'express'


export const getStatement = async(req:Request, res:Response):Promise<void>=>{
  try{

		const result = await connection('labebank_statement')

		res.send(result)

	}catch(error: any){
		res.send({message: error.message || error.sqlMessage})
	}
}
