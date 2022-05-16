import Login from '../pages/Login'
import ShowLoan from '../pages/ShowLoan'


let indexRoutes = [

    {
        path: "/",
        name: "Login",
        component: Login,
        exact: true,
    },
    {
        path: "/showLoan",
        name: "Show Loan",
        component: ShowLoan,
        exact: true,
    },
];

export default indexRoutes;
