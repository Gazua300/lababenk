const connection = require('../connection/connection')
const Authenticate = require('../services/Authenticate')



const getBalance = async(req, res)=>{
  let statusCode = 400

  try{

    const { cpf, password, token } = req.body
    const auth = new Authenticate()
    const tokenData = new Authenticate().tokenData(token)

    if(!password || !cpf){
      statusCode = 401
      throw new Error('Preencha os campos')
    }

    if(!token){
      statusCode =  401
      throw new Error('Token ausente, malformado ou expirado. Neste caso, por medidas de segurança você deve efetuar login novamente')
    }


    const [client] = await connection('labebank').where({
      id: tokenData.payload
    })


    if(!client){
      statusCode = 404
      throw new Error('Cliente não encontrado')
    }

    if(!auth.compare(String(cpf), client.cpf)){
      statusCode = 404
      throw new Error('Cliente não encontrado')
    }
    
    if(!auth.compare(password, client.password)){
      statusCode = 404
      throw new Error('Cliente não encontrado')
    }


		res.status(200).send(`Seu saldo é ${client.balance}`)
	}catch(error){
		res.status(statusCode).send({message: error.message || error.sqlMessage})
	}
}

module.exports = getBalance
