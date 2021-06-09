import React from "react";
import { Helmet } from "react-helmet";
import { Provider } from "react-redux";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import store from "store";
import { AuthRoute, ProtectedRoute, ProtectedStaticRoute } from "utils/routeUtils";
import ResponsiveThemeProvider from "styles/ResponsiveThemeProvider";
import "./App.css";
import Login from "features/Login/Login";
import SignUp from "features/SignUp/SignUp";
import Cover from "features/Cover/Cover";
import Home from "features/Home/Home";
import CreateTrivia from "features/CreateTrivia/CreateTrivia";
import AddQuestion from "features/TriviaDetailHost/AddQuestion/AddQuestion";
import HostTrivia from "features/TriviaDetailHost/TriviaDetailHost";
import Subscribe from "features/Subscribe/Subscribe";
export const persistor = persistStore(store);

function App() {
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{"trivvr"}</title>
        <html lang={"en"} />
        <meta name="description" content={"trivia done right"} />
      </Helmet>
      <div className="App">
        <Provider store={store}>
          <ResponsiveThemeProvider>
            <PersistGate loading={null} persistor={persistor}>
              <Router>
                <Switch>
                  <AuthRoute exact path="/login" component={Login} />
                  <AuthRoute exact path="/signup" component={SignUp} />
                  <AuthRoute exact path="/cover" component={Cover} />
                  <ProtectedRoute
                    path="/create-trivia"
                    exact
                    component={CreateTrivia}
                  />
                  <ProtectedRoute
                    path="/host-trivia/:id"
                    exact
                    component={HostTrivia}
                  />
                  <ProtectedRoute
                    path="/add-question/:triviaID/:roundIndex/:questionIndex"
                    exact
                    component={AddQuestion}
                  />
                  <ProtectedRoute path="/" component={Home} />
                 
                </Switch>
                <ProtectedStaticRoute component={Subscribe} />
              </Router>
            </PersistGate>
          </ResponsiveThemeProvider>
        </Provider>
      </div>
    </>
  );
}

export default App;
