import styled from 'styled-components'
import {useState, useEffect} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import BackIcon from '../../img/back1.jpeg'
import { url } from '../../constants/urls'
import axios from 'axios'


const Container = styled.div`
	border: 1px solid;
	margin-top: 10vh;
	margin-bottom: 45vh;
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
		input{
			background: transparent;
			padding: 5px;
		}
	}

	div{
		margin: 10px;
	}
	button{
		width: 210px;
		border-radius: 10px;
		cursor: pointer;
		padding: 2px;
		background-image: linear-gradient(gray, whitesmoke)
	}

`
const Header = styled.header`
	img{
		cursor: pointer;
		border-radius: 10px;
	}
`


const Login = ()=>{
	const history = useNavigate()
	const [form, setForm] = useState({
		email:'',
		cpf:'',
		password:''
	})


	useEffect(()=>{
		const token = localStorage.getItem('token')

		if(token){
			history('/balance')
		}

	}, [])



	const onChange = (e)=>{
		const {name, value} = e.target
		setForm({...form, [name]: value})
	}



	const register = (e)=>{
		e.preventDefault()

		const body = {
			email: form.email,
			cpf: form.cpf,
			password: form.password
		}
		axios.post(`${url}/accounts/login`, body).then(res=>{
			localStorage.setItem('token', res.data)
			history('/balance')
		}).catch(err=>{
			alert(err.response.data)
		})

	}

//=========================Render=======================================
	return<div>
			  <Header>
				<img src={BackIcon} onClick={()=> history('/')} alt=''/>
			  </Header>
			  <Container>
				<form onSubmit={register} >
				<h3>Acesse sua conta</h3>
				<input type='email' name='email' value={form.email} onChange={onChange}
				 placeholder='nome@email.com' required autoFocus/>
				<input type='number' name='cpf' value={form.cpf} onChange={onChange}
				 placeholder='CPF(somente números)' required/>
				<input type='password' name='password' value={form.password} onChange={onChange}
				 placeholder='Senha' required />
				<button>Acessar</button>
				</form>
				<div>Clique <Link to='/signup'>aqui</Link> para abrir uma conta.</div>
			  </Container>
		  </div>
}
export default Login
