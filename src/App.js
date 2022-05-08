import React from 'react';
import './App.css';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './pages/Home';
import Billing from './pages/Billing';
import BillingReport from './pages/BillingReport';
import Delivery from './pages/Delivery';
import DeliveryReport from './pages/DeliveryReport';
import CreateUser from './pages/CreateUser';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div style={{position: 'relative'}}>
      <ToastContainer />
      <Router>
        <Navbar />
        <Switch>
          <Route path='/' exact component={Home} />
          <Route path='/billing' component={Billing} />
          <Route path='/billingReport' component={BillingReport} />
          <Route path='/delivery' component={Delivery} />
          <Route path='/deliveryReport' component={DeliveryReport} />
          <Route path='/createUser' component={CreateUser} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
