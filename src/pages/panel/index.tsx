import React from "react";
import { useHistory } from 'react-router-dom';
import { makeStyles } from "@material-ui/core/styles";
import { Switch } from "react-router-dom";
import { RouteWithSubRoutes } from "@/router";
import { routesProps } from "@/router/index";
import MenuList from '@material-ui/core/MenuList';
import MenuItem from '@material-ui/core/MenuItem';
import ChatBubbleIcon from '@material-ui/icons/ChatBubble';
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';
import RecordVoiceOverIcon from '@material-ui/icons/RecordVoiceOver';
import RecordVoiceOverOutlinedIcon from '@material-ui/icons/RecordVoiceOverOutlined';

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
  menu: {
    outline: 'none'
  },
  space: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  }
}));

interface Props {
  routes: Array<routesProps>;
}

const Panel = ({ routes }: Props) => {
  const classes = useStyles();

  const history = useHistory();

  const activePath: string = history.location.pathname;
  interface MenuItemProps {
    path: string;
    icon: any;
    activeIcon: any;
  }

  const menu: Array<MenuItemProps> = [
    {
      path: '/panel/chat',
      icon: <ChatBubbleOutlineIcon />,
      activeIcon: <ChatBubbleIcon />
    },
    {
      path: '/panel/buddy',
      icon: <RecordVoiceOverOutlinedIcon />,
      activeIcon: <RecordVoiceOverIcon />
    }
  ];

  const handleCilic = (item: MenuItemProps) => {
    history.push(item.path)
  }

  return (
    <main className={classes.main}>
      <div className={classes.leftBar}>
        <MenuList className={classes.menu}>
          {
            menu.map(item => (
              <MenuItem key={item.path} className={classes.space} style={{ color: item.path === activePath ? '#07C160' : '#737374' }} onClick={() => handleCilic(item)}>
                { item.path === activePath ? item.activeIcon : item.icon}
              </MenuItem>
            ))
          }
        </MenuList>
      </div>
      <Switch>
        {routes.map((route) => (
          <RouteWithSubRoutes key={route.path} {...route} />
        ))}
      </Switch>
    </main>
  );
};

export default Panel;
