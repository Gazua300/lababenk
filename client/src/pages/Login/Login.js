import styled from 'styled-components'
import {useState, useEffect, useContext} from 'react'
import Context from '../../global/Context'
//import axios from 'axios'
import {useHistory, Link} from 'react-router-dom'
import BackIcon from '../../img/back1.jpeg'


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
	const {states} = useContext(Context)
	const history = useHistory()
	const [form, setForm] = useState({
		email:'',
		password:''
	})




	useEffect(()=>{
		const token = localStorage.getItem('token')

		if(token !== null){
			history.push('/balance')
		}

	}, [history])


	const onChange = (e)=>{
		const {name, value} = e.target
		setForm({...form, [name]: value})
	}

	const first = Math.random().toString(36).substr(2)
	const add = Math.random().toString(36).substr(2)
	const token = first+add
console.log(token)

	const login = (e)=>{
		e.preventDefault()

		states.users.map(user=>{
			if(form.email === user.email && form.password === user.password){
				history.push('/balance')
				localStorage.setItem('token', token)
			}else{
				alert('Bateu fofo!')
			}
		})
		
	}

//=========================Render=======================================
	return<div>
			  <Header>
				<img src={BackIcon} onClick={()=> history.push('/')} alt=''/>
			  </Header>
			  <Container>
				<form onSubmit={login} >
				<h3>Acesse sua conta</h3>
				<input type='email' name='email' value={form.email} onChange={onChange}
				 placeholder='E-mail' required autoFocus/>
				<input type='password' name='password' value={form.password} onChange={onChange}
				 placeholder='Senha' required />
				<button>Acessar</button>
				</form>
				<div>Clique <Link to='/signup'>aqui</Link> para se cadastrar.</div>
			  </Container>
		  </div>
}
export default Login