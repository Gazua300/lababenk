import {Routes, Route} from 'react-router-dom'
import Balance from '../pages/Balance/Balance'
import Deposit from '../pages/Deposit/Deposit'
import Transfer from '../pages/Transfer/Transfer'
import Payments from '../pages/Payments/Payments'
import Statement from '../pages/Statement/Statement'
import Home from '../pages/Home/Home'
import Login from '../pages/Login/Login'
import Signup from '../pages/Signup/Signup'



const Router = ()=>{
	return<Routes>
			<Route exact path='/' element={<Home/>}/>
			<Route exact path='/login' element={<Login/>}/>
			<Route exact path='/signup' element={<Signup/>} />
			<Route exact path='/balance' element={<Balance/>}/>
			<Route exact path='/deposit' element={<Deposit/>}/>
			<Route exact path='/transfer' element={<Transfer/>}/>
			<Route exact path='/pay' element={<Payments/>}/>
			<Route exact path='/statement' element={<Statement/>}/>
		  </Routes>
}
export default Router
