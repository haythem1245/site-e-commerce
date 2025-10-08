
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css';


import App from './App';
import { CartProvider } from './context/CartContext';

ReactDOM.createRoot(document.getElementById('root')).render(
   <CartProvider>
      <BrowserRouter>
    <App />
  </BrowserRouter>
  </CartProvider>
);



export default App;
