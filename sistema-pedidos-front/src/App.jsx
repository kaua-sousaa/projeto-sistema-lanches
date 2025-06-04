import './App.css'
import { BrowserRouter } from "react-router-dom";
import AppRoutes from './routes/AppRoutes';
import Header from './components/layout/Header';
import AuthProvider from './contexts/AuthContext';

function App() {

  return (
      <BrowserRouter>
          <AuthProvider>
            <Header/>
              <AppRoutes />       
          </AuthProvider>
      </BrowserRouter>   
  )
}

export default App
