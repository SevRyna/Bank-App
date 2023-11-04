import React from "react";
import { createContext, useContext} from 'react';
import { BrowserRouter, 
  Route, 
  Routes, 
  Navigate,
  // useState,
  // useNavigate,
  // useParams
 } from 'react-router-dom';
//  import { Link } from 'react-router-dom';
// import Page from "./component/page";
// import Login from "./container/login";
// import Main from "./container/main";
// import Home from "./container/index";
import Home from "./container/home";
import Signup from "./container/signup";
import Signin from "./container/signin";
import SignupConfirm from "./container/signup-confirm";
import Recovery from "./container/recovery";
import RecoveryConfirm from "./container/recovery-confirm";
import Transaction from "./container/transactions";
// import Transactions from "./container/transactions";
import Send from "./container/send";
import Recieve from "./container/recieve";
import Settings from "./container/settings/index";
import Notifications from "./container/notifications";
import Balance from "./container/balance";
// import Menu from "./component/menu";

const WellcomePage: React.FC = () => {
  return <div className="App-header">
    <Home />
  </div>
};
const SignupPage: React.FC = () => {
  return <div className="App-header">
      <Signup />
    </div>
};
const SigninPage: React.FC = () => {
  return <div className="App-header">
      <Signin />
    </div>
};
const RecoveryPage: React.FC = () => {
  return <div className="App-header">
      <Recovery />
    </div>
};
const NotificationsPage: React.FC = () => {
  return <div className="App-header"><Notifications /></div>
};
const SettingsPage: React.FC = () => {
  return <div className="App-header"><Settings /></div>
};
const RecievePage: React.FC = () => {
  return <div className="App-header"><Recieve /></div>
};
const SendPage: React.FC = () => {
  return <div className="App-header"><Send /></div>
};
//--------------------------------------------------
const SignupConfirmPage: React.FC = () => {
  return <div className="App-header">
      <SignupConfirm />
    </div>
};
const BalancePage: React.FC = () => {
  return <div className="App-header">
  <Balance />
  </div>
};

const RecoveryConfirmPage: React.FC = () => {
  return <div className="App-header"><RecoveryConfirm /></div>
};
//--------------------------------------------------





const TransactionPage: React.FC = () => {
  return <div className="App-header"><Transaction /></div>
};
//--------------------------------------------------
type ContextType = {
  isLogged: boolean;
  login: (status: boolean) => void;
}
const AuthContext = createContext<ContextType | null>(null);

//--------------------------------------------------
const Error: React.FC = () => {
  return <div className="App-header">Error page</div>
};
//--------------------------------------------------
const AuthRoute: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const auth = useContext(AuthContext);

  // if(!auth) return <Error />;
  if(!auth) return <>{children}</>;
  // return auth.isLogged ? <>{children}</> : <Login />;
  return auth.isLogged ? <>{children}</> : <Navigate to="/login" replace />;
};
//--------------------------------------------------
const PrivateRoute: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const auth = useContext(AuthContext);

  // if(!auth) return <Error />;
  if(!auth) return <>{children}</>;
  // return auth.isLogged ? <>{children}</> : <Login />;
  return auth.isLogged ? <>{children}</> : <Navigate to="/login" replace />;
};

//--------------------------------------------------
// const Login: React.FC = () =>  {
//   const auth = useContext(AuthContext);
//   const navigate = useNavigate();

//   const handleClick = () => {
//     if(auth) {
//       auth.login(true);
//       navigate('/dashboard');
//     }
//   };

//   return (
//     <div onClick={handleClick} className="App-header">
//        Login
//     </div>
//   );
// };
//--------------------------------------------------


// type State = {
//   count: number;
// };

// type Action1 = {
//   type: ACTION_TYPE;
// };
 
// enum ACTION_TYPE {
//   INCREMENT = "INCREMENT",
//   DECREMENT = "DECREMENT",
// }

// const stateReducer: React.Reducer<State, Action1> = {
//   state: State,
//   action1: Action1,
// }:  State => {
//   switch (action1.type) {
//     case ACTION_TYPE.INCREMENT:
//       return {...state, count: state.count + 1 };
//     case ACTION_TYPE.DECREMENT:
//       return {...state, count: state.count - 1 };
//     default:
//       return state; 
//     }
// };

// const [state, dispatch] = useReducer<
//   React.Reducer<State, Action1>,
//   InitialState
// >(
//   stateReducer, 
//   { count: 0 },
//   // initState, 
//   (state): State => ({
//       ...state,
//       count: 1,
//     })
//   );


function App() {
  // const [isLogged, login] = React.useState(true);

  return (
    <AuthContext.Provider value={null} >

    {/* <AuthContext.Provider value={{ isLogged, login }}> */}
       {/* <AuthContext.Provider value={authContextData}> */}
      <BrowserRouter>
        <Routes>
          <Route
            index
            element={
              <AuthRoute>
                <WellcomePage />
              </AuthRoute>
            }
          />
          <Route
            path="/signup"
            element={
              <AuthRoute>
                <SignupPage />
              </AuthRoute>
            }
          />
          <Route
            path="/signup-confirm"
            element = {
              <PrivateRoute>
                <SignupConfirmPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/signin"
            element={
              <AuthRoute>
                <SigninPage />
              </AuthRoute>
            }
          />
          <Route
            path="/recovery"
            element={
              <AuthRoute>
                <RecoveryPage />
              </AuthRoute>
            }
          />
          <Route
          path="/recovery-confirm"
          element={
            <AuthRoute>
              <RecoveryConfirmPage />
            </AuthRoute>
          }
          />
          <Route
            path="/balance"
            element={
              <PrivateRoute>
                <BalancePage />
              </PrivateRoute>
            }  
          />
          <Route
            path="/notifications"
            element={
              <PrivateRoute>
                <NotificationsPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/settings"
            element={
              <PrivateRoute>
                <SettingsPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/recieve"
            element={
              <PrivateRoute>
                <RecievePage />
              </PrivateRoute>
            }
          />
          <Route
            path="/send"
            element={
              <PrivateRoute>
                <SendPage />
              </PrivateRoute>
            }
          />
          <Route
            // path="/transaction/:transactionId"
            path="/transaction"
            element={
              <PrivateRoute>
                <TransactionPage />
              </PrivateRoute>
            }
          />
          {/* <Route
            path="/transactions"
            element={
              <PrivateRoute>
                <TransactionsPage />
              </PrivateRoute>
            }
          />           */}
          <Route path="*" Component={Error}
          />
          
        </Routes>
      </BrowserRouter>
    </AuthContext.Provider>
  );    
}

export default App;
