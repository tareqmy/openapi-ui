import {lazy} from 'react';
import * as PATH from './Slugs';

const Dashboard = lazy(() => import('../pages/dashboard/Dashboard'));
const SwaggerUI = lazy(() => import('../pages/swagger_ui/CustomSwaggerUI'));

const PageRoutes = [
    {
        path: PATH.DASHBOARD_PATH,
        component: Dashboard
    },
    {
        path: `${PATH.SWAGGER_UI_PATH}/:id`,
        component: SwaggerUI
    },
]

export default PageRoutes;