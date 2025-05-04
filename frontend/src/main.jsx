import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux'
import { appstore, persistor} from './app/store.js'
import { Toaster } from 'sonner'
import { PersistGate } from 'redux-persist/integration/react';

createRoot(document.getElementById('root')).render(
    <Provider store={appstore}>
     <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
     <Toaster/>
    </Provider>

  ,
)
