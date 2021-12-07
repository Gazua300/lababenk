import { connection } from '../connection/connection'
import { Request, Response } from 'express'


export const showClients = async(req:Request, res:Response):Promise<void>=>{
  try{

		const result = await connection('labebank')

		res.send(result)
	}catch(error: any){
		res.send({message: error.message || error.sqlMessage})
	}
}
