import { connection } from '../connection/connection'
import { Request, Response } from 'express'


export const createClient = async(req:Request, res:Response):Promise<void>=>{
  let statusCode = 400

	try{

		const {name, cpf, initialDate} = req.body
		const [day, month, year] = initialDate.split('/')
		const birthDate = new Date(`${year}-${month}-${day}`)
		const millisecondsAge = Date.now() - birthDate.getTime()
		const age = millisecondsAge / 1000 / 60 / 60 /24 / 365

    if(!name || !cpf || !initialDate){
      statusCode = 401
      throw new Error('Preencha os campos!')
    }

		if(age < 18){

			statusCode = 401
			throw new Error('Necessário ser maior de idade!')

		}else{

			await connection('labebank').insert({
				name,
				cpf,
				birth_date: birthDate,
				balance: 0,
			})

			res.send('Created')

		}


	}catch(error: any){
		res.status(statusCode).send({message: error.message || error.sqlMessage})
	}
}
