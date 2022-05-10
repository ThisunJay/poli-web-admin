import Billing from '../pages/Billing'
import Delivery from '../pages/Delivery'



let billingRoutes = [

    {
        path: "/billing",
        name: "Billing",
        component: Billing,
        exact: true,
    },
    {
        path: "/delivery",
        name: "Delivery",
        component: Delivery,
        exact: true,
    },


];

export default billingRoutes;
