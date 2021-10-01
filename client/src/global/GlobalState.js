import {useEffect, useState} from 'react'
import Context from './Context'
import axios from 'axios'


const GlobalState = (props)=>{
	const [accounts, setAccounts] = useState([])

console.log(accounts)

	const getAccounts = ()=>{
		axios.get('http://localhost:3003/accounts').then(res=>{
			setAccounts(res.data)
		}).catch(err=>{
			console.log(err.response)
		})
	}

	
	useEffect(()=>{
		getAccounts()
	}, [])

	const states = {accounts}
	const setters = {}
	const requests = {getAccounts}

	

	return<Context.Provider value={{states, setters, requests}}>
			{props.children}
		  </Context.Provider>

}

export default GlobalState