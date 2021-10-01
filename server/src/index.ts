import express from 'express'
import cors from 'cors'
import {connection} from '../connection/connection'

const app = express()

app.use(express.json())
app.use(cors())

//---------------------------------USER------------------------------------

//=================================Show clients============================
app.get('/accounts', async(req, res)=>{
	
	try{

		const result = await connection('labebank')
		res.send(result)

	}catch(error: any){
		res.send({message: error.message || error.sqlMessage})
	}
})

//=================================Create clients===========================
app.post('/accounts/create', async(req, res)=>{
	let statusCode = 404
	
	try{

		const {name, cpf, initialDate} = req.body
		const [day, month, year] = initialDate.split('/')
		const birthDate = new Date(`${year}-${month}-${day}`)
		const millisecondsAge = Date.now() - birthDate.getTime()
		const age = millisecondsAge / 1000 / 60 / 60 /24 / 365

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
})

//=================================Edit client==============================
app.post('/accounts/edit/:id', async(req, res)=>{

	try{

		const [day, month, year] = req.body.initialDate.split('/')
		const birthDate = new Date(`${year}-${month}-${day}`)

		await connection('labebank').update({
			name: req.body.name,
			cpf: req.body.cpf,
			birth_date: birthDate
		}).where({
			id: req.params.id
		})

		res.end()

	}catch(error: any){
		res.send({message: error.message || error.sqlMessage})
	}	
})

//==================================Delete client===========================
app.delete('/accounts/delete/:id', async(req, res)=>{
	
	try{

		await connection('labebank').delete().where({id: req.params.id})
		console.log('Deleted')
		res.end()

	}catch(error: any){
		res.send({message: error.message || error.sqlMessage})
	}
})


//-------------------------------------ACCOUNT----------------------------------
	
//===================================Statement=====================================
app.get('/accounts/statement', async(req, res)=>{
	
	try{

		const result = await connection('labebank_statement')

		res.send(result)

	}catch(error: any){
		res.send({message: error.message || error.sqlMessage})
	}
})

//=====================================Get Balance============================
app.post('/accounts/balance', async(req, res)=>{
	
	try{

		const balance = await connection.raw(`select balance from labebank where cpf=${req.body.cpf}`)
		const result = balance[0]
		
		res.send(result)		

	}catch(error: any){
		res.send({message: error.message || error.sqlMessage})
	}
})	

//====================================Payment(pendente)================================
app.post('/accounts/pay', async(req, res)=>{
	
	try{

		const {name, cpf, initialDate, value, description} = req.body
		const [day, month, year] = initialDate.split('/')
		const date = new Date(`${year}-${month}-day`)

		const client = await connection.raw(`select * from labebank where cpf=${cpf}`)

		res.send(client[0])

	}catch(error: any){
		res.send({message: error.message})
	}
})


//=====================================Deposito(Pendente)========================================
app.post('/accounts/deposit', async(req, res)=>{
	
	try{

		const d = new Date()

		await connection.raw(`update labebank set balance = balance + ${req.body.value}
		where cpf = ${req.body.cpf}`)

		await connection.raw(`insert into labebank_statement(value, description, client_id, date)
		values(${req.body.value}, 'Depósito', ${req.body.cpf}, '${d.getFullYear()}-${d.getMonth()}-${d.getDate()}')`)

		res.status(200).end()

	}catch(error: any){
		res.send({message: error.message || error.sqlMessage})
	}
})






//======================================Server listening===========================
app.listen(3003, ()=>{
	console.log('Server running at http://localhost:3003')
})