import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import ThemePro from './components/ThemePro.jsx'
// import { store ,persistor} from './redux/store.js'
// import { Provider } from 'react-redux'
// import { PersistGate } from 'redux-persist/integration/react'

import { ThemeProvider } from './context/themeContext.jsx'
import { UserProvider } from './context/userContext.jsx'


ReactDOM.createRoot(document.getElementById('root')).render(
    // <PersistGate persistor={persistor}>
    //   <Provider store={store}>
        <UserProvider>
          <ThemeProvider>
            <ThemePro >
              <App />
            </ThemePro>
          </ThemeProvider>
        </UserProvider>
      
    //   </Provider>
    // </PersistGate>
);

