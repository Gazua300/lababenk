import { connection } from '../connection/connection'
import { Request, Response } from 'express'
import { Authenticate } from '../services/Authenticate'


export const payment = async(req:Request, res:Response):Promise<void>=>{
  let statusCode = 400
  try{

		const {name, cpf, initialDate, value, description} = req.body
		const [day, month, year] = initialDate.split('/')
		const date = new Date(`${year}-${month}-${day}`)


    if(date.getTime() < Date.now()){
      statusCode = 403
      throw new Error('Data do pagagmento não pode ser inferior a data atual!')
    }
    if(!name || !cpf || !initialDate || !value || !description){
      statusCode = 401
      throw new Error('Preencha os campos.')
    }

    const [user] = await connection('labebank').where({
      cpf
    })


    if(!user){
      statusCode = 404
      throw new Error('Cliente não encontrado.')
    }

    if(name !== user.name){
      statusCode = 401
      throw new Error('Dados inválidos!')
    }


    if(value > user.balance){
      statusCode = 403
      throw new Error('Saldo insuficiente para efetuar pagamento!')
    }

    await connection('labebank').update({
      balance: user.balance - value
    }).where({
      cpf
    })

    const id = new Authenticate().generateId()

    await connection('labebank_statement').insert({
      id,
      value,
      date,
      description,
      client_id: cpf
    })

    res.status(200).send(`pagamento de ${value} efetuado`)
	}catch(error: any){
		res.status(statusCode).send({message: error.message})
	}
}
