import CreateCollection from '../pages/CreateCollection'

let collectorRoutes = [
    {
        path: "/createCollection",
        name: "Create Collection",
        component: CreateCollection,
        exact: true,
    },
]

export default collectorRoutes;