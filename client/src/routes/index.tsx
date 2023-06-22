import React, { Suspense } from 'react';
import { useRoutes } from 'react-router-dom';

// layouts
import DefaultLayout from '../layouts/Default';
import VerticalLayout from '../layouts/Vertical';
import HorizontalLayout from '../layouts/Horizontal/';

// components
import PrivateRoute from './PrivateRoute';
import Root from './Root';

// constants
import { LayoutTypes } from '../constants';

// hooks
import { useRedux } from '../hooks';


// lazy load all the views
// auth
const Login = React.lazy(() => import('../pages/auth/Login'));
const Register = React.lazy(() => import('../pages/auth/Register'));
const Confirm = React.lazy(() => import('../pages/auth/Confirm'));
const ForgetPassword = React.lazy(() => import('../pages/auth/ForgetPassword'));
const LockScreen = React.lazy(() => import('../pages/auth/LockScreen'));
const Logout = React.lazy(() => import('../pages/auth/Logout'));

// dashboards
const DashBoard1 = React.lazy(() => import('../pages/dashboards/DashBoard1/'));

// apps
const Screener = React.lazy(() => import('../pages/apps/Screener'));




//watchliat

const Watchlist = React.lazy(() => import('../pages/Watchlist'));





// icons
const FeatherIcons = React.lazy(() => import('../pages/icons/FeatherIcons'));
const MDIIcons = React.lazy(() => import('../pages/icons/MDIIcons'));
const Dripicons = React.lazy(() => import('../pages/icons/DripiIcons'));
const FontAwesomeIcons = React.lazy(() => import('../pages/icons/FontAwesomeIcons'));
const ThemifyIcons = React.lazy(() => import('../pages/icons/ThemifyIcons'));

// forms
const GeneralElements = React.lazy(() => import('../pages/forms/Basic'));
const FormAdvanced = React.lazy(() => import('../pages/forms/Advanced'));
const Validation = React.lazy(() => import('../pages/forms/Validation'));
const FormWizard = React.lazy(() => import('../pages/forms/Wizard'));
const FileUpload = React.lazy(() => import('../pages/forms/FileUpload'));
const Editors = React.lazy(() => import('../pages/forms/Editors'));



// charts
const ApexChart = React.lazy(() => import('../pages/Market/chart/ApexChart'));
const ChartJs = React.lazy(() => import('../pages/Market/chart/ChartJs'));



// lamding
const Landing = React.lazy(() => import('../pages/Landing'));

const loading = () => <div className=""></div>;

type LoadComponentProps = {
  component: React.LazyExoticComponent<() => JSX.Element>;
};

const LoadComponent = ({ component: Component }: LoadComponentProps) => (
  <Suspense fallback={loading()}>
    <Component />
  </Suspense>
);

const AllRoutes = () => {
  const { appSelector } = useRedux();

  const { layout } = appSelector((state) => ({
    layout: state.Layout,
  }));

  const getLayout = () => {
    let layoutCls: React.ComponentType = VerticalLayout;

    switch (layout.layoutType) {
      case LayoutTypes.LAYOUT_HORIZONTAL:
        layoutCls = HorizontalLayout;
        break;
      default:
        layoutCls = VerticalLayout;
        break;
    }
    return layoutCls;
  };
  let Layout = getLayout();

  return useRoutes([
    { path: '/', element: <Root /> },
    {
      // public routes
      path: '/',
      element: <DefaultLayout />,
      children: [
        {
          path: 'auth',
          children: [
            { path: 'login', element: <LoadComponent component={Login} /> },
            { path: 'register', element: <LoadComponent component={Register} /> },
            { path: 'confirm', element: <LoadComponent component={Confirm} /> },
            { path: 'forget-password', element: <LoadComponent component={ForgetPassword} /> },
            { path: 'lock-screen', element: <LoadComponent component={LockScreen} /> },
            { path: 'logout', element: <LoadComponent component={Logout} /> },
          ],
        },
        
        {
          path: 'landing',
          element: <LoadComponent component={Landing} />,
        },
      ],
    },
    {
      // auth protected routes
      path: '/',
      element: <PrivateRoute roles={'Admin'} component={Layout} />,
      children: [
        {
          path: 'dashboard',
          element: <LoadComponent component={DashBoard1} />,
        },
        {
          path: 'apps',
          children: [
            {
              path: 'screener',
              element: <LoadComponent component={Screener} />,
            },
          ],
        },
        {
          path:'market',
          children:[
            {
              path: 'apex',
              element: <LoadComponent component={ApexChart} />,
            },
            {
              path: 'chartjs',
              element: <LoadComponent component={ChartJs} />,
            },
          ],
        },
        {
          path: 'watchlist',
          element: <LoadComponent component={Watchlist} />,
        },
        
        
        {
          path: 'icons',
          children: [
            {
              path: 'feather',
              element: <LoadComponent component={FeatherIcons} />,
            },
            {
              path: 'mdi',
              element: <LoadComponent component={MDIIcons} />,
            },
            {
              path: 'dripicons',
              element: <LoadComponent component={Dripicons} />,
            },
            {
              path: 'font-awesome',
              element: <LoadComponent component={FontAwesomeIcons} />,
            },
            {
              path: 'themify',
              element: <LoadComponent component={ThemifyIcons} />,
            },
          ],
        },
        {
          path: 'forms',
          children: [
            {
              path: 'basic',
              element: <LoadComponent component={GeneralElements} />,
            },
            {
              path: 'advanced',
              element: <LoadComponent component={FormAdvanced} />,
            },
            {
              path: 'validation',
              element: <LoadComponent component={Validation} />,
            },
            {
              path: 'wizard',
              element: <LoadComponent component={FormWizard} />,
            },
            {
              path: 'upload',
              element: <LoadComponent component={FileUpload} />,
            },
            {
              path: 'editors',
              element: <LoadComponent component={Editors} />,
            },
          ],
        },
        
        
        
      ],
    },
  ]);
};

export { AllRoutes };
