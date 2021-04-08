import React from "react";
import { useHistory } from 'react-router-dom';
import { makeStyles } from "@material-ui/core/styles";
import { Switch } from "react-router-dom";
import { RouteWithSubRoutes } from "@/router";
import { routesProps } from "@/router/index";
import Avatar from '@material-ui/core/Avatar';
import MenuList from '@material-ui/core/MenuList';
import MenuItem from '@material-ui/core/MenuItem';
import ChatBubbleIcon from '@material-ui/icons/ChatBubble';
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';
import RecordVoiceOverIcon from '@material-ui/icons/RecordVoiceOver';
import RecordVoiceOverOutlinedIcon from '@material-ui/icons/RecordVoiceOverOutlined';

const useStyles = makeStyles((theme) => ({
  main: {
    width: "900px",
    height: "80%",
    position: "absolute",
    top: "50%",
    left: "50%",
    overflow: "hidden",
    display: "flex",
    borderRadius: "5px",
    transform: "translate(-50%,-50%)",
    boxShadow: "0 0 10px rgba(0,0,0,.3)"
  },
  leftBar: {
    width: "60px",
    padding: "20px 0",
    backgroundColor: "#2c2726"
  },
  menu: {
    outline: "none"
  },
  space: {
    margin: "15px 0",
  },
  avatar: {
    width: "34px",
    height: "34px",
    margin: "0 auto"
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
        <Avatar variant="rounded" src="/static/images/avatar/1.jpg" className={classes.avatar}></Avatar>
        <MenuList className={classes.menu}>
          {
            menu.map(item => (
              <MenuItem
                key={item.path}
                className={classes.space}
                style={{ color: item.path === activePath ? '#07C160' : '#737374' }}
                onClick={() => handleCilic(item)}
              >
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
