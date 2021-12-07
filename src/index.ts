import express from 'express'
import cors from 'cors'
import { showClients } from './endpoints/showClients'
import { createClient } from './endpoints/createClient'
import { getStatement } from './endpoints/getStatement'
import { getBalance } from './endpoints/getBalance'
import { payment } from './endpoints/payment'
import { deposito } from './endpoints/deposito'

const app = express()

app.use(express.json())
app.use(cors())



app.get('/accounts', showClients)
app.get('/accounts/statement', getStatement)
app.post('/accounts/create', createClient)
app.post('/accounts/balance', getBalance)
app.post('/accounts/payment', payment)
app.post('/accounts/deposit', deposito)




//======================================Server listening===========================
app.listen(process.env.PORT || 3003, ()=>{
	console.log('Server running at http://localhost:3003')
})
