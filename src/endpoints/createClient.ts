import { connection } from '../connection/connection'
import { Request, Response } from 'express'
import { Authenticate } from '../services/Authenticate'


export const createClient = async(req:Request, res:Response):Promise<void>=>{
  var statusCode = 400

	try{

		const {name, cpf, email, initialDate, password, passwordConf} = req.body
		const [day, month, year] = initialDate.split('/')
		const birthDate = new Date(`${year}-${month}-${day}`)
		const millisecondsAge = Date.now() - birthDate.getTime()
		const age = millisecondsAge / 1000 / 60 / 60 /24 / 365
    const auth = new Authenticate()
    const id = auth.generateId()
    const token = auth.token(id)


    if(
      !name || 
      !cpf ||
      !email ||
      !initialDate ||
      !password ||
      !passwordConf
      ){
      statusCode = 401
      throw new Error('Preencha os campos!')
    }


    
		if(age < 18){
      statusCode = 401
			throw new Error('Necessário ser maior de idade!')
      
		}

    var arrCpf = String(cpf).split('').map(num=>{
      return Number(num)
    })
    
    if(arrCpf.length !== 11){
      statusCode = 403
      throw new Error('CPF inválido!')
    }
    
    
    const clients = await connection('labebank')

    clients.map(client=>{
      if(
        email === client.email ||
        auth.compare(String(cpf), client.cpf)
        ){
        statusCode = 401
        throw new Error('Conta já existe nos registros')
      }
    })    
    

    if(password !== passwordConf){
      statusCode = 401
      throw new Error('As senhas não correspondem!')
    }
    

		await connection('labebank').insert({
      id,
			name,
			cpf: auth.hash(String(cpf)),
      email,
			birth_date: birthDate,
			balance: 0,
      password: auth.hash(password)
		})


    res.status(200).send(token)
	}catch(error: any){
		res.status(statusCode).send({message: error.message || error.sqlMessage})
	}
}
