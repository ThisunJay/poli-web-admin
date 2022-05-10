
import React from 'react';
import { BrowserRouter as Router, Route, Switch, useHistory, withRouter } from 'react-router-dom';
import billingRoutes from './routes/billing'
import indexRoutes from './routes/index'
import adminRoutes from './routes/admin.routes'
import { checkSignedIn, getUserdetails } from './controllers/user.controller'

class RootRouter extends React.Component {

    router = () => {
        let routes = indexRoutes;

        let checkSignedInVal = checkSignedIn()
        if(checkSignedInVal){

            let userDetails = getUserdetails()
            let role = (checkSignedIn) ? userDetails.type : "";
            if (checkSignedInVal === true) {
                routes = [...indexRoutes, ...routes];
            }
    
            if (checkSignedInVal === true && role === "Admin") {
                routes = [...adminRoutes, ...routes];
            }
        }


        return routes;
    }

    render() {
        return (
            <Router >
                <Switch>
                    {this.router().map((prop, key) => {
                        return (
                            <Route
                                path={prop.path}
                                key={key}
                                component={(props) => <prop.component    {...props} />}
                                exact={prop.exact ? true : false}

                            />
                        );
                    })}
                </Switch>
            </Router>
        )
    }
}


export default RootRouter;