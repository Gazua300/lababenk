import bcrypt from 'bcryptjs'


export class Authenticate {
  hash = (txt:string)=>{
    const rounds = 12
    const salt = bcrypt.genSaltSync(rounds)
    const cypher = bcrypt.hashSync(txt, salt)

    return cypher
  }
}
