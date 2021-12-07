import bcrypt from 'bcryptjs'


export class Authenticate {
  hash = (txt:string)=>{
    const rounds = 12
    const salt = bcrypt.genSaltSync(rounds)
    const cypher = bcrypt.hashSync(txt, salt)

    return cypher
  }

  compare = (txt:string, hash:string)=>{
    return bcrypt.compareSync(txt, hash)
  }
}
