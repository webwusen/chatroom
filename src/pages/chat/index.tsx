import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Search from "@/components/Search";

const useStyles = makeStyles((theme) => ({
  searchBox: {

  }
}));

const Chat: React.FC = () => {
  const classes = useStyles();

  return (
    <div className="common-main">
      <div className="common-left-bar">
        <Search />
      </div>
      <div className="common-content"></div>
    </div>
  );
};

export default Chat;
