import {BrowserRouter} from 'react-router-dom'
import GlobalState from './global/GlobalState'
import Router from './routes/Routes'
import {createGlobalStyle} from 'styled-components'


const GlobalStyle = createGlobalStyle`
	body{
    background-image: linear-gradient(to top, whitesmoke, gray);
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
