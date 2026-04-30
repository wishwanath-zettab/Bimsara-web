import './App.css';
import Routes from './Routes';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <>
      <Routes/>
      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
}

export default App;
