import CreateUser from '../pages/CreateUser'

let adminRoutes = [
    {
        path: "/createUser",
        name: "Create User",
        component: CreateUser,
        exact: true,
    },
]

export default adminRoutes;