import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Switch } from "react-router-dom";
import { RouteWithSubRoutes } from "@/router";
import { routesProps } from "@/router/index";

const useStyles = makeStyles((theme) => ({
  main: {
    width: "100%",
    height: "100%",
    overflow: "hidden",
    display: "flex",
  },
  leftBar: {
    width: "60px",
  },
}));

interface Props {
  routes: Array<routesProps>;
}

const Panel = ({ routes }: Props) => {
  const classes = useStyles();
  
  return (
    <main className={classes.main}>
      <div className={classes.leftBar}>1111</div>
      <Switch>
        {routes.map((route) => (
          <RouteWithSubRoutes key={route.path} {...route} />
        ))}
      </Switch>
    </main>
  );
};

export default Panel;
