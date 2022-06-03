import {useEffect, useState} from 'react'
import axios from 'axios'
import {url} from '../../constants/urls'
import {Container} from './styled'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import { useNavigate } from 'react-router-dom'


//+=======================Components==========================
const Payments = ()=>{
	const history = useNavigate()
	const [form, setForm] = useState({
		email:'',
		cpf:'',
		initialDate:'',
		value:'',
		description:''
	})


	useEffect(()=>{
		const token = localStorage.getItem('token')

		if(token === null){
			history('/')
		}

	}, [])


	const onChange = (e)=>{
		const {name, value} = e.target
		setForm({...form, [name]: value})
	}


	const pay = (e)=>{
		e.preventDefault()

		const body = {
			email: form.email,
			cpf: Number(form.cpf),
			initialDate: form.initialDate,
			value: form.value,
			description: form.description
		}

		axios.post(`${url}/accounts/payment`, body).then(res=>{
			alert('Pagamento efetuado com sucesso!')
			setForm({
				email:'',
				cpf:'',
				initialDate:'',
				value:'',
				description:''
			})
		}).catch(err=>{
			alert(err.response.data.message)
		})

	}

//====================================Render=============================
	return<div>
			<Header/>
			 <Container>
				<h3>Pagamentos</h3>
				<form onSubmit={pay}>
					<input type='text' name='email' value={form.email} onChange={onChange}
					 placeholder='nome@email.com' required/>
					<input type='number' name='cpf' value={form.cpf} onChange={onChange}
					 placeholder='CPF(somente números)' required/>
					<input type='date' name='initialDate' value={form.initialDate} onChange={onChange}
					 required/>
					<input type='text' name='description' value={form.description} onChange={onChange}
					 placeholder='Descrição' required/>
					<input type='number' name='value' value={form.value} onChange={onChange}
					 placeholder='Valor R$ 0,00' required/>
					<button>Efetuar pagamento</button>
				</form>
			  </Container>
			  <Footer />
		  </div>
}
export default Payments
