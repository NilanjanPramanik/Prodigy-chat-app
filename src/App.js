import './App.css';
import Auth from './component/Auth';
import { useState } from 'react';
import Home from './screen/Home';
import { Cookies } from 'react-cookie';

const cookies =  new Cookies();

function App() {

  const [isAuth, setIsAuth] = useState(cookies.get("auth-token"));
  // console.log(isAuth)
  return (
    <div className="App">
      {
        !isAuth ? (<Auth setIsAuth={setIsAuth}/>) : (<Home />)
      }
    </div>
  );
}

export default App;
