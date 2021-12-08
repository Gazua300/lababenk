import styled from 'styled-components'
import {useHistory} from 'react-router-dom'


//+======================Style======================
const Container = styled.div`
	h1{
		text-align: center;
		margin-bottom: 20vh;
	}
	div{
		background-color: whitesmoke;
		text-align: center;
		border-radius: 10px;
		box-shadow: 3px 3px 6px;
		width: 20vw;
		padding: 10px;
		margin: auto;
		margin-bottom: 80vh;
		cursor: pointer;
		&:hover{
			transform: scale(1.02)
		}
	}
`

//===============================Component==========================
const Home = ()=>{
	const history = useHistory()

	return<Container>
			<h1>Bem vindos ao Labebank</h1>
			<div onClick={()=> history.push('/login')}>Acessar</div>
		  </Container>
}
export default Home
