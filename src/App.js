import Login from "./components/Forms/Login";
import React , {useState , useEffect} from "react";
import Registration from "./components/Forms/Registration";
import Admin from "./components/Admin/Adminn";
import Test from "./components/Quiz/MainQuizz";
import { BrowserRouter as Router, Switch, Route , Redirect } from "react-router-dom";


export default function App() {
  const [auth,setAuth] = useState(false)
  const checkAuth = (e) => {
    setAuth(e)
  }
  
  return (
    <>
    <Router>
        <Switch>
          <Route  exact  path="/test"
            render={() => {
                      if (auth) return <Test checkAuth={checkAuth} />;
                      else return <Redirect to="/login" />;
                    }}
          ></Route> 
          <Route path="/login" exact>
              <Login checkAuth={checkAuth}  />
          </Route>
          <Route path="/register" exact>
              <Registration checkAuth={checkAuth} />
          </Route>
          <Route path="/admin" exact>
              <Admin />
          </Route>
        </Switch> 
    </Router>
    </>
  );
}
