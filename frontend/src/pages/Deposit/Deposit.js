import {useState, useEffect, useContext} from 'react'
import Context from '../../global/Context'
import axios from 'axios'
import {url} from '../../constants/urls'
import {Container} from './styled'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import {useHistory} from 'react-router-dom'



//===================Inicio do componente funcional==========================
const Deposit = ()=>{
	const {states} = useContext(Context)
	const history = useHistory()
	const [form, setForm] = useState({
		name:'',
		cpf:'',
		value:''
	})


	// useEffect(()=>{
	// 	const token = localStorage.getItem('token')
	//
	// 	if(token === null){
	// 		history.push('/')
	// 	}
	//
	// }, [history])



	const onChange = (e)=>{
		const {name, value} = e.target
		setForm({...form, [name]: value})
	}


	const addCash = (e)=>{
		e.preventDefault()

		const body = {
			name: form.name,
			cpf: Number(form.cpf),
			value: Number(form.value)
		}

		axios.post(`${url}/accounts/deposit`, body).then(res=>{
			alert(`Seu deposito de R$ ${form.value} foi efetuado com sucesso.`)
			setForm({
				name:'',
				cpf:'',
				value:''
			})
		}).catch(err=>{
			console.log(err.response)
		})

	}


//===========================Render================================

	return<div>
			 <Header/>
			 <Container>
				<h3>Depositos</h3>
				<form onSubmit={addCash}>
					<input type='text' name='name' value={form.name} onChange={onChange}
					 placeholder='Nome e sobrenome' autoFocus required/>
					<input type='number' name='cpf' value={form.cpf} onChange={onChange}
					 placeholder='CPF(somente números)' required/>
					<input type='number' name='value' value={form.value} onChange={onChange}
					 placeholder='R$ 0,00' required/>
					<button>Efetuar</button>
				</form>
			  </Container>
			  <Footer/>
		  </div>
}
export default Deposit
