import Login from "./components/Forms/Login";
import React , {useState , useEffect} from "react";
import Registration from "./components/Forms/Registration";
import Admin from "./components/Admin/Adminn";
import Test from "./components/Quiz/MainQuizz";
import { BrowserRouter as Router, Switch, Route , Redirect } from "react-router-dom";


export default function App() {
  const [check, setcheck] = useState({
    loginToken: localStorage.getItem("token")
      ? localStorage.getItem("token")
      : null
  });
  
  return (
    <>
    <Router>
        <Switch>
          <Route  exact  path="/test"
            render={() => {
                      if (check.loginToken) return <Test />;
                      else return <Redirect to="/login" />;
                    }}
          ></Route> 
          <Route path="/login" exact>
              <Login  />
          </Route>
          <Route path="/register" exact>
              <Registration />
          </Route>
          <Route path="/admin" exact>
              <Admin />
          </Route>
        </Switch> 
    </Router>
    </>
  );
}
