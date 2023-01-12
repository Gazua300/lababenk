const connection = require('../connection/connection')
const Authenticate = require('../services/Authenticate')


const deposit = async(req, res)=>{
  let statusCode = 400

  try{

    const { password, cpf, value, token} = req.body
    const auth = new Authenticate()
    const tokenData = auth.tokenData(token)
    
    
    if(!password || !cpf || !value){
      statusCode = 401
      throw new Error('Preencha os campos.')
    }

    const [user] = await connection('labebank').where({
      id: tokenData.payload
    })

    if(!user){
      statusCode = 404
      throw new Error('Cliente não encontrado!')
    }

    if(!auth.compare(String(cpf), user.cpf)){
      statusCode = 404
      throw new Error('Cliente não encontrado')
    }


    if(!auth.compare(password, user.password)){
      statusCode = 404
      throw new Error('Cliente não encontrado')
    }


    await connection('labebank').update({
      balance: user.balance + value
    }).where({
      cpf: user.cpf
    })

    const id = new Authenticate().generateId()

    await connection('labebank_statement').insert({
      id,
      value,
      date: new Date(),
      description: 'Deposito',
      client_id: user.cpf
    })

    res.status(200).send(`Deposito de ${value} efetuado com sucesso. Saldo atual: ${user.balance + value}`)
  }catch(error){
    res.status(statusCode).send(error.message || error.sqlMessage)
  }
}

module.exports = deposit
