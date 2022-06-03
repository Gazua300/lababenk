import styled from 'styled-components'
import Exit from '../img/exit.png'
import Home from '../img/home.jpg'
import { useNavigate } from 'react-router-dom'

const Containter = styled.div`
	display: flex;
	justify-content: space-between;
	img{
		cursor: pointer;
	}
`


const Footer = ()=>{
	const history = useNavigate()

	const logout = ()=>{
		const decide = window.confirm('Tem certeza que deseja deslogar?')

		if(decide){
			localStorage.removeItem('token')
			history('/')
		}
	}


	return<Containter>
			<img src={Home} onClick={()=> history('/')} alt=''/>
			<img src={Exit} onClick={logout} alt=''/>
		  </Containter>
}
export default Footer