import { connection } from '../connection/connection'
import { Request, Response } from 'express'
import { Authenticate } from '../services/Authenticate'


export const transfer = async(req:Request, res:Response):Promise<void>=>{
  let statusCode = 400

  try{

    const { email, cpf, recipientName, recipientCpf, value } = req.body
    const auth = new Authenticate()
    const id = auth.generateId()
    const anotherId = auth.generateId()

    if(!email || !cpf || !recipientName || !recipientCpf || !value){
      statusCode = 401
      throw new Error('Preencha os campos!')
    }

    if(recipientCpf === cpf){
      statusCode = 401
      throw new Error('Os CPFs do depositante e destinatário são os mesmos!')
    }


    const [client] = await connection('labebank').where({
      email
    })

    if(!client){
      statusCode = 404
      throw new Error('Cliente não encontrado!')
    }

    if(!auth.compare(String(cpf), client.cpf)){
      statusCode = 404
      throw new Error('Cliente não encontrado!')
    }


    const recipient = await connection('labebank')

    const [cpfFound] = recipient.filter(client=>{
      return auth.compare(String(recipientCpf), client.cpf)
    })

    if(!cpfFound){
      statusCode = 404
      throw new Error('Destinatário do despósito não encontrado!')
    }

    if(cpfFound.name !== recipientName){
      statusCode = 404
      throw new Error('Destinatário do despósito não encontrado!')
    }

    
    
    
    await connection('labebank').update({
      balance: client.balance - value
    }).where({
      cpf: client.cpf
    })

    await connection('labebank').update({
      balance: cpfFound.balance + value
    }).where({
      cpf: cpfFound.cpf
    })

    
    await connection('labebank_statement').insert({
      id,
      value,
      date: new Date(),
      description: `Transferência de R$ ${value}.00 para conta correspondente ao email ${cpfFound.email}`,
      client_id: client.cpf
    })

    await connection('labebank_statement').insert({
      id: anotherId,
      value,
      date: new Date(),
      description: `Valor de R$ ${value}.00 recebido por transferência da conta correspondente ao email ${client.email}`,
      client_id: cpfFound.cpf
    })


    res.status(200).send('Transferência realizada com sucesso.')
  }catch(error:any){
    res.status(statusCode).send(error.message || error.sqlMessage)
  }
}
