import Login from '../pages/Login'
import Home from '../pages/Home'


let indexRoutes = [

    {
        path: "/",
        name: "Login",
        component: Login,
        exact: true,
    },
    {
        path: "/Home",
        name: "Home",
        component: Home,
        exact: true,
    },
];

export default indexRoutes;
