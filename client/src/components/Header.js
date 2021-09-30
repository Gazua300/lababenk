import styled from 'styled-components'
import {useHistory} from 'react-router-dom'


const Container = styled.div`
	text-align: center;
	button{
		border-radius: 10px;
		background-color: lightgray;
		cursor: pointer;
		margin: 5px;
	}
`


const Header = ()=>{
	const history = useHistory()
	return<Container>
			<button onClick={()=> history.push('/balance')}>Saldo</button>
			<button onClick={()=> history.push('/statement')}>Extrato</button>
			<button onClick={()=> history.push('/pay')}>Pagamentos</button>
			<button onClick={()=> history.push('/register')}>Criar conta</button>
			<button onClick={()=> history.push('/transfer')}>Transferências</button>
			<button onClick={()=> history.push('/deposit')}>Deposito</button>
		  </Container>
}
export default Header