import {useState, useEffect} from 'react'
import axios from 'axios'
import {url} from '../../constants/urls'
import {Container} from './styled'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import {useHistory} from 'react-router-dom'




//==========================Component=======================
const Home = ()=>{
	const history = useHistory()
	const [form, setForm] = useState({
		name:'',
		cpf:''
	})

	useEffect(()=>{
		const token = localStorage.getItem('token')

		if(token === null){
			history.push('/')
		}

	}, [history])


	const onChange = (e)=>{
		const {name, value} = e.target
		setForm({...form, [name]: value})
	}


	const getBalance = (e)=>{
		e.preventDefault()

		const body = {
			name: form.name,
			cpf: Number(form.cpf)
		}

		axios.post(`${url}/accounts/balance`, body).then(res=>{
			console.log(res.data)
			document.getElementById('result').innerHTML = `Seu saldo é ${res.data[0].balance}`
		}).catch(err=>{
			console.log(err.response)
		})

	}

//===============================Renderizaão===========================
	return<div>
		  <Header/>
		  <Container>
				<h3>Consulta de saldo</h3>
			<form onSubmit={getBalance}>
				<input name='name' value={form.name} onChange={onChange}
				 type='text' placeholder='Nome e sobrenome' autoFocus required />
				<input name='cpf' value={form.cpf} onChange={onChange}
				 type='number' min='0' placeholder='CPF(somente números)'required/>
				<button>Ver saldo</button>
				<p id='result'></p>
			</form>
		   </Container>
		   <Footer/>
		  </div>
}
export default Home
