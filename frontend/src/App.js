import {BrowserRouter} from 'react-router-dom'
import GlobalState from './global/GlobalState'
import Router from './routes/Routes'
import {createGlobalStyle} from 'styled-components'


const GlobalStyle = createGlobalStyle`
	body{
    background-image: linear-gradient(90deg, whitesmoke, gray);
    background-size: cover;
	}
  h3{
    text-shadow: 2px 2px 4px whitesmoke;
  }
  input{
    width: 200px;
    border-radius: 10px;
  }

`

function App() {
  return (
    <BrowserRouter>
      <GlobalState>
    	  <GlobalStyle/>
   		  <Router/>
      </GlobalState>   		
    </BrowserRouter>
  );
}

export default App;
