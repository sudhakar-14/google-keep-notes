import { Navigation } from '@mui/icons-material';
import './App.css';
import HeaderDiv from './components/header';
import Notes from './components/notes';
import NavigationRoute from './components/navigation';
import BinDiv from './components/bin';


function App() {
  return (
    <div className="App">
      {/* <HeaderDiv/>
      <Notes/> */}
      <NavigationRoute/>
      {/* <BinDiv/> */}
      {/* <Testing2/> */}
    </div>
  );
}

export default App;
