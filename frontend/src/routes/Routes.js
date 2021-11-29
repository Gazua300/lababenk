import {Switch, Route} from 'react-router-dom'
import Balance from '../pages/Balance/Balance'
import CreateAccount from '../pages/CreateAccount/CreateAccount'
import Deposit from '../pages/Deposit/Deposit'
import Transfer from '../pages/Transfer/Transfer'
import Payments from '../pages/Payments/Payments'
import Statement from '../pages/Statement/Statement'
import Home from '../pages/Home/Home'
import Login from '../pages/Login/Login'
import Signup from '../pages/Signup/Signup'
import GlobalState from '../global/GlobalState'


const Routes = ()=>{
	return<Switch>
			<GlobalState>
				<Route exact path='/'>
					<Home/>
				</Route>
				<Route exact path='/login'>
					<Login/>
				</Route>
				<Route exact path='/signup'>
					<Signup/>
				</Route>
				<Route exact path='/balance'>
					<Balance/>
				</Route>
				<Route exact path='/register'>
					<CreateAccount/>
				</Route>
				<Route exact path='/deposit'>
					<Deposit/>
				</Route>
				<Route exact path='/transfer'>
					<Transfer/>
				</Route>
				<Route exact path='/pay'>
					<Payments/>
				</Route>
				<Route exact path='/statement'>
					<Statement/>
				</Route>
			</GlobalState>
		  </Switch>
}
export default Routes