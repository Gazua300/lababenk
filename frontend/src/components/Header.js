import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'


const Container = styled.div`
	text-align: center;
	button{
		border-radius: 10px;
		background-image: linear-gradient(to top, gray, whitesmoke);
		cursor: pointer;
		margin: 5px;
	}
`


const Header = ()=>{
	const history = useNavigate()
	return<Container>
			<button onClick={()=> history('/balance')}>Saldo</button>
			<button onClick={()=> history('/statement')}>Extrato</button>
			<button onClick={()=> history('/pay')}>Pagamentos</button>
			<button onClick={()=> history('/signup')}>Criar conta</button>
			<button onClick={()=> history('/transfer')}>Transferências</button>
			<button onClick={()=> history('/deposit')}>Deposito</button>
		  </Container>
}
export default Header
