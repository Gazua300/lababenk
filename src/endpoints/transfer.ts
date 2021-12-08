import { connection } from '../connection/connection'
import { Request, Response } from 'express'
import { Authenticate } from '../services/Authenticate'


export const transfer = async(req:Request, res:Response):Promise<void>=>{
  let statusCode = 400

  try{

    const { name, cpf, recipientName, recipientCpf, value } = req.body

    if(!name || !cpf || !recipientName || !recipientCpf || !value){
      statusCode = 401
      throw new Error('Preencha os campos!')
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



    const [recipient] = await connection('labebank').where({
      cpf: recipientCpf
    })

    if(!recipient){
      statusCode = 404
      throw new Error('Cliente para o qual será feita a tranferência não foi encontrado.')
    }

    if(recipientName !== recipient.name){
      statusCode = 403
      throw new Error('Dados inválidos!')
    }



    await connection('labebank').update({
      balance: client.balance - value
    }).where({
      cpf
    })

    await connection('labebank').update({
      balance: recipient.balance + value
    }).where({
      cpf: recipientCpf
    })

    const id = new Authenticate().generateId()

    await connection('labebank_statement').insert({
      id,
      value,
      date: new Date(),
      description: 'Transferência',
      client_id: cpf
    })


    res.status(200).send('Transferência realizada com sucesso!')
  }catch(error:any){
    res.status(statusCode).send(error.message || error.sqlMessage)
  }
}
