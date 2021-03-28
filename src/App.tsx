import React from 'react';
import { Helmet } from 'react-helmet'
import { Provider } from 'react-redux'
import { persistStore } from 'redux-persist'
import { PersistGate } from 'redux-persist/integration/react'
import { BrowserRouter as Router, Switch } from 'react-router-dom'
import store from 'store'
import { AuthRoute, ProtectedRoute } from 'utils/routeUtils'
import ResponsiveThemeProvider from 'styles/ResponsiveThemeProvider'

import Login from 'features/Login/Login'
export const persistor = persistStore(store)

import './App.css';

function App() {

  
  return (
    <>
    <Helmet>
				<meta charSet="utf-8" />
				<title>{'trivvr'}</title>
				<html lang={'en'} />
				<meta
					name="description"
					content={'trivia done right'}
				/>
			</Helmet>
      <div className="App">
      <Provider store={store}>
      <ResponsiveThemeProvider>
				<PersistGate loading={null} persistor={persistor}>
					<Router>
						<Switch>
              <AuthRoute path="/login" component={Login} />

						</Switch>
					</Router>
				</PersistGate>
				</ResponsiveThemeProvider>
			</Provider>

      </div>
    </>
  );
}

export default App;
