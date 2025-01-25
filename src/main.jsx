import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
// import "bootstrap/dist/css/bootstrap.min.css";
import * as bootstrap from 'bootstrap'
import './assets/scss/theme.scss'
import { Provider } from 'react-redux'
import store from './redux/store.js'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';


const queryClient = new QueryClient();
createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </Provider>,
)
