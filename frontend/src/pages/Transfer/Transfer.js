import axios from 'axios'
import {useState, useEffect, useContext} from 'react'
import Context from '../../global/Context'
import {url} from '../../constants/urls'
import {Container} from './styled'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import {useHistory} from 'react-router-dom'


//===========================Inicio do compoente funcional=========
const Transfer = ()=>{
	const {states} = useContext(Context)
	const history = useHistory()
	const [form, setForm] = useState({
		name:'',
		cpf:'',
		recipientName:'',
		recipientCpf:'',
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


	const transfer = (e)=>{
		e.preventDefault()

		const body = {
			name: form.name,
			cpf: Number(form.cpf),
			recipientName: form.recipientName,
			recipientCpf: Number(form.recipientCpf),
			value: Number(form.value)
		}

		axios.post(`${url}/accounts/transfer`, body).then(res=>{
			alert(res.data)
			setForm({
				name:'',
				cpf:'',
				recipientName:'',
				recipientCpf:'',
				value:''
			})
		}).catch(err=>{
			alert(err.response.data)
		})

	}


//=============================Render============================
	return<div>
			<Header/>
			 <Container>
				<h3>Transferências</h3>
				<form onSubmit={transfer}>
					<input type='text' name='name' value={form.name} onChange={onChange}
					 placeholder='Nome e sobrenome' required/>
					<input type='number' name='cpf' value={form.cpf}
					 onChange={onChange} placeholder='CPF(somente números)' required/>
					<input type='text' name='recipientName' value={form.recipientName}
					 onChange={onChange} placeholder='Nome do destinatário' required/>
					<input type='number' name='recipientCpf' value={form.recipientCpf}
					 onChange={onChange} placeholder='CPF do destinatário' required/>
					<input type='number' name='value' value={form.value} onChange={onChange}
					 placeholder='Valor R$ 0,00'required/>
					<button>Transferir</button>
				</form>
			  </Container>
			  <Footer/>
		   </div>
}
export default Transfer
