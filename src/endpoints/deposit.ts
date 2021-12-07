import { connection } from '../connection/connection'
import { Request, Response } from 'express'


export const deposit = async(req:Request, res:Response)=>{
  let statusCode = 400

  try{

    const { name, cpf, value} = req.body

    if(!name || !cpf || !value){
      statusCode = 401
      throw new Error('Preencha os campos.')
    }

    const [user] = await connection('labebank').where({
      cpf
    })

    if(!user){
      statusCode = 404
      throw new Error('Cliente não encontrado!')
    }

    if(user.name !== name){
      statusCode = 404
      throw new Error('Dados inválidos!')
    }


    await connection('labebank').update({
      balance: user.balance + value
    }).where({
      cpf
    })

    await connection('labebank_statement').insert({
      value,
      date: new Date(),
      description: 'Deposito',
      client_id: cpf
    })

    res.status(200).send(`Deposito de ${value} efetuado com sucesso. Saldo atual: ${user.balance + value}`)
  }catch(error:any){
    res.status(statusCode).send(error.message || error.sqlMessage)
  }
}
