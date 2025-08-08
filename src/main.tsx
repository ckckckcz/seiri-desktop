import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import Title from "@/components/custom/titleBar"

ReactDOM.createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    {/* <Title/> */}
    <App />
  </BrowserRouter>
);