const connection = require('../connection/connection')
const Authenticate = require('../services/Authenticate')


const getStatement = async(req, res)=>{
  let statusCode = 400

  try{

	  const { email, cpf } = req.body
    const auth = new Authenticate()


    if(!email || !cpf){
      statusCode = 401
      throw new Error('Preencha os campos')
    }
     
     
    const [client] = await connection('labebank').where({
      email
    })
     
    if(!client){
      statusCode = 404
      throw new Error('Cliente não encontrado!')
    }
      
     
    if(!auth.compare(String(cpf), client.cpf)){
      statusCode = 403
      throw new Error('Cliente não econtrado!')
    }

     
    const statement = await connection('labebank_statement').where({
      client_id: client.cpf
    })

     
    res.status(200).send(statement)
	}catch(error){
		res.status(statusCode).send({message: error.message || error.sqlMessage})
	}
}

module.exports = getStatement
