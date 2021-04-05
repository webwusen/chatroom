import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import loadable from "@loadable/component";
import { LoadableComponent } from "loadable__component";
import room from "./room";

export interface routesProps {
  path: string;
  exact?: boolean;
  component: LoadableComponent<any>;
  routes?: Array<routesProps>;
}

const Login = loadable(() => import("@/pages/login"));
const Panel = loadable(() => import("@/pages/panel"));

const token: string | null = localStorage.getItem("userinfo");
const defaultRoute = token ? Panel : Login;
const defaultLink = token ? "/panel/chat" : "login";

export const routes: Array<routesProps> = [
  {
    path: "/",
    exact: true,
    component: defaultRoute,
  },
  {
    path: "/login",
    component: Login,
  },
  {
    path: "/join",
    component: loadable(() => import("@/pages/join")),
  },
  {
    path: "/panel",
    component: Panel,
    routes: room,
  },
];

export function RouteWithSubRoutes(route: routesProps) {
  return (
    <Route
      exact={!!route.exact}
      path={route.path}
      render={(props: any) => (
        <route.component {...props} routes={route.routes} />
      )}
    />
  );
}

export default function Routers() {
  return (
    <Router>
      <Switch>
        {routes.map((route) =>
          route.path === "/" ? (
            <Route
              exact
              path="/"
              key="/"
              render={() => <Redirect to={defaultLink} push />}
            />
          ) : (
            <RouteWithSubRoutes key={route.path} {...route} />
          )
        )}
      </Switch>
    </Router>
  );
}
