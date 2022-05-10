import React from 'react';
import './App.css';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Login from './pages/Login';
import Billing from './pages/Billing';
import BillingReport from './pages/BillingReport';
import Delivery from './pages/Delivery';
import DeliveryReport from './pages/DeliveryReport';
import CreateUser from './pages/CreateUser';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import RootRouter from './RootRouter'
function App() {
  return (
    <div style={{ position: 'relative' }}>
      <ToastContainer />
      {/* <Router>
        <Switch>
          <Route path='/' exact component={Login} />
          <Route path='/billing' component={Billing} />
          <Route path='/billingReport' component={BillingReport} />
          <Route path='/delivery' component={Delivery} />
          <Route path='/deliveryReport' component={DeliveryReport} />
          <Route path='/createUser' component={CreateUser} />
        </Switch>
      </Router> */}
      <RootRouter />
    </div>
  );
}

export default App;
