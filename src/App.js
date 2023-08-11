import './App.css';
import SignUp from './components/signUp';
import { Route, Routes } from 'react-router';
import SignIn from './components/signIn';
import NavigationRoute from './components/navigation';


function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='signin' element={<SignIn/>}/>
        <Route path='/' element={<SignUp/>}/>
        <Route path='notes/*' element={<NavigationRoute/>}/>
      </Routes>
    </div>
  );
}

export default App;
