import {BrowserRouter} from 'react-router-dom'
import Routes from './routes/Routes'
import {createGlobalStyle} from 'styled-components'


const GlobalStyle = createGlobalStyle`
	body{
    background-image: linear-gradient(to top, whitesmoke, gray);
	}

`

function App() {
  return (
    <BrowserRouter>
    	<GlobalStyle/>
   		<Routes/>   		
    </BrowserRouter>
  );
}

export default App;
