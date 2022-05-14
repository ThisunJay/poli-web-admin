import CreateUser from '../pages/CreateUser'
import AllUsers from '../pages/AllUsers'
import AllClients from '../pages/AllClients'
import CreateClient from '../pages/CreateClient'
import AllEmployees from '../pages/AllEmployees'
import CreateEmployee from '../pages/CreateEmployee'

let adminRoutes = [
    {
        path: "/createUser",
        name: "Create User",
        component: CreateUser,
        exact: true,
    },
    {
        path: "/allUsers",
        name: "All Users",
        component: AllUsers,
        exact: true,
    },
    {
        path: "/allClients",
        name: "All Clients",
        component: AllClients,
        exact: true,
    },
    {
        path: "/createClient",
        name: "Create Client",
        component: CreateClient,
        exact: true,
    },
    {
        path: "/allEmployees",
        name: "All Employees",
        component: AllEmployees,
        exact: true,
    },
    {
        path: "/createEmployee",
        name: "Create Employee",
        component: CreateEmployee,
        exact: true,
    }
]

export default adminRoutes;