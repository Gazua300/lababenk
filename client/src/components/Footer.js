import styled from 'styled-components'
import Exit from '../img/exit.png'
import Home from '../img/home.jpg'
import {useHistory} from 'react-router-dom'


const Containter = styled.div`
	display: flex;
	justify-content: space-between;
	img{
		cursor: pointer;
	}
`


const Footer = ()=>{
	const history = useHistory()

	const logout = ()=>{
		const decide = window.confirm('Tem certeza que deseja deslogar?')

		if(decide){
			localStorage.removeItem('token')
			history.push('/')
		}
	}


	return<Containter>
			<img src={Home} onClick={()=> history.push('/')} alt=''/>
			<img src={Exit} onClick={logout} alt=''/>
		  </Containter>
}
export default Footer