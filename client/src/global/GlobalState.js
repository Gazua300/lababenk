import {useEffect, useState} from 'react'
import Context from './Context'
import axios from 'axios'


const GlobalState = (props)=>{
	const [accounts, setAccounts] = useState([])
	const [users, setUsers] = useState([])

console.log(accounts)
console.log(users)

	useEffect(()=>{
		getAccounts()
		getUsers()
	}, [])

	const getAccounts = ()=>{
		axios.get('http://localhost:3003/accounts').then(res=>{
			setAccounts(res.data)
		}).catch(err=>{
			console.log(err.response)
		})
	}

	const getUsers = ()=>{
		axios.get('http://localhost:3003/accounts/login').then(res=>{
			setUsers(res.data)
		}).catch(err=>{
			console.log(err.response)
		})
	}
	

	const states = {accounts, users}
	const setters = {}
	const requests = {getAccounts}

	

	return<Context.Provider value={{states, setters, requests}}>
			{props.children}
		  </Context.Provider>

}

export default GlobalState