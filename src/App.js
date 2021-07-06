import Login from "./components/Forms/Login";
import React from "react";
import Registration from "./components/Forms/Registration";
import Test from "./components/Quiz/MainQuiz";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";


export default function App() {
  
  return (
    <>
      <Router>
        <Switch>
          <Route path="/login" exact>
            <Login  />
          </Route>
          <Route path="/register" exact>
            <Registration />
          </Route>
          <Route path="/test" exact>
            <Test  />
          </Route>
        </Switch>
      </Router>
    </>
  );
}
