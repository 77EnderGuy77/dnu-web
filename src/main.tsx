import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { App } from './App'
import './css/index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <BrowserRouter basename="/dnu-web/">
    <App />
  </BrowserRouter>
)
