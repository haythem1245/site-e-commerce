
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css';


import App from './App';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthProvider';
import { DataProvider } from './context/DataContext';

ReactDOM.createRoot(document.getElementById('root')).render(
<DataProvider>
  <AuthProvider>
   <CartProvider>
      <BrowserRouter>
    <App />
  </BrowserRouter>
  </CartProvider>
  </AuthProvider>
  </DataProvider>
);



export default App;
