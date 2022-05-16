import CreateUser from '../pages/CreateUser'
import AllUsers from '../pages/AllUsers'
import AllClients from '../pages/AllClients'
import CreateClient from '../pages/CreateClient'
import AllEmployees from '../pages/AllEmployees'
import CreateEmployee from '../pages/CreateEmployee'
import AllBonds from '../pages/AllBonds'
import CreateBond from '../pages/CreateBond'
import AllLoans from '../pages/AllLoans'
import CreateLoan from '../pages/CreateLoan'
import LoanDetails from '../pages/LoanDetails'
import Home from '../pages/Home'

let adminRoutes = [
    {
        path: "/Home",
        name: "Home",
        component: Home,
        exact: true,
    },
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
    },
    {
        path: "/allBonds",
        name: "All Bonds",
        component: AllBonds,
        exact: true,
    },
    {
        path: "/createBond",
        name: "Create Bond",
        component: CreateBond,
        exact: true,
    },
    {
        path: "/allLoans",
        name: "All Loans",
        component: AllLoans,
        exact: true,
    },
    {
        path: "/createLoan",
        name: "Create Loan",
        component: CreateLoan,
        exact: true,
    },
    {
        path: "/loanDetails",
        name: "Loan Details",
        component: LoanDetails,
        exact: true,
    },
]

export default adminRoutes;