import styled from 'styled-components'
import {useState} from 'react'
import axios from 'axios'
import {useHistory} from 'react-router-dom'
import BackIcon from '../../img/back1.jpeg'
import {url} from '../../constants/urls'



const Container = styled.div`
	border: 1px solid;
	margin-top: 10vh;
	margin-bottom: 25vh;
	border-radius: 10px;
	box-shadow: 3px 3px 7px;
	h3{
		text-align: center;
	}
	form{
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 15px;
		margin: 10px;
		input[type=date]{
			width: 57vw;
		}
	}

	div{
		margin: 10px;
	}

`
const Header = styled.header`
	img{
		cursor: pointer;
		border-radius: 10px;
	}
`


const Login = ()=>{
	const history = useHistory()
	const [form, setForm] = useState({
		name:'',
		cpf:'',
		email:'',
		initialDate:'',
		password:'',
		confPassword:''
	})


	const onChange = (e)=>{
		const {name, value} = e.target
		setForm({...form, [name]: value})
	}


	
	const signup = (e)=>{
		e.preventDefault()

		const body = {
			name: form.name,
			cpf: Number(form.cpf),
			email: form.email,
			initialDate: form.initialDate,
			password: form.password
		}

		if(form.cpf.length < 10){
			alert('Numeração do CPF inválida.!')
		}else{
			axios.post(`${url}/create`, body).then(res=>{
				console.log(res.data)
				history.push('/login')
			}).catch(err=>{
				alert(err.response.data.message)
			})			
		}
	
	}

//=========================Render=======================================
	return<div>
			<Header>
				<img src={BackIcon} onClick={()=> history.push('/login')} alt=''/>
			</Header>
		  <Container>		  			
			<h3>Cadastre-se</h3>
			<form onSubmit={signup}>
				<input type='text' name='name' value={form.name} onChange={onChange}
				 placeholder='Nome de usuário' autoFocus required/>
				<input type='number' name='cpf' value={form.cpf} onChange={onChange}
				 placeholder='CPF(somente números)' required/>
				<input type='email' name='email' value={form.email} onChange={onChange}
				 placeholder='E-mail' required/>
				<input type='date' name='initialDate' value={form.initialDate} onChange={onChange}
				 required/>
				<input type='password' name='password' value={form.password} onChange={onChange}
				 placeholder='Senha' required/>
				<input type='password' name='confPassword' value={form.confPassword} onChange={onChange}
				 placeholder='Confirme sua senha'/>
				<button>Cadastrar</button>
			</form>
		  </Container>
		  </div>
}
export default Login