import loadable from "@loadable/component";
import { routesProps } from "./index";

const routes: Array<routesProps> = [
  {
    path: "/panel/chat",
    component: loadable(() => import("@/pages/chat")),
  },
];

export default routes;
