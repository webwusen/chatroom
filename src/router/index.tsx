import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  useHistory
} from "react-router-dom";
import loadable from "@loadable/component";
import { LoadableComponent } from "loadable__component";
export interface routesProps {
  path: string;
  exact?: boolean;
  component?: LoadableComponent<any>;
  render?: React.FC;
  routes?: Array<routesProps>;
}

const Login = loadable(() => import("@/pages/login"));
const Panel = loadable(() => import("@/pages/panel"));

export const routes: Array<routesProps> = [
  {
    exact: true,
    path: "/",
    render: () => <Redirect to="/panel/chat" />
  },
  {
    path: "/panel",
    component: Panel,
    routes: [
      {
        path: "/panel/chat",
        component: loadable(() => import("@/pages/chat")),
      },
      {
        path: "/panel/buddy",
        component: loadable(() => import("@/pages/buddy")),
      }
    ],
  },
  {
    path: "/login",
    component: Login,
  },
  {
    path: "/join",
    component: loadable(() => import("@/pages/join")),
  },
];

export function RouteWithSubRoutes(route: routesProps) {
  const history = useHistory();
  const token: string | null = localStorage.getItem("userinfo");
  return (
    <Route
      exact={!!route.exact}
      path={route.path}
      render={(props: any) => (
        token ? (
          route.render ?
            route.render({ ...props, route: route }) : route.component && <route.component {...props} routes={route.routes} />
        )
          : (
            <>
              <Login />
              <Redirect to="/login" from={history.location.pathname} />
            </>
          )
      )}
    />
  );
}

export default function Routers() {
  return (
    <Router>
      <Switch>
        {routes.map((route) =>
          <RouteWithSubRoutes key={route.path} {...route} />
        )}
      </Switch>
    </Router>
  );
}
