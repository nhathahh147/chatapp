import "./App.css";
import Login from "./components/Login";
import { Route, Switch, BrowserRouter } from "react-router-dom";
import ChatRoom from "./components/ChatRoom";
import AuthProvider from "./Context/AuthProvider";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Switch>
          <Route component={Login} path={"/login"} />
          <Route component={ChatRoom} path={"/"} />
        </Switch>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
