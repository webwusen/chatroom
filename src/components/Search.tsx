import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useTranslation } from "react-i18next";
import SearchIcon from "@material-ui/icons/Search";
const useStyles = makeStyles((theme) => ({
  topSearch: {
    height: '100%',
    overflow: 'hidden'
  },
  searchBox: {
    margin: '12px',
    marginTop: '25px',
    display: 'flex',
    alignItems: 'center',
    backgroundColor: '#DCD9D8',
    border: '1px solid #DCD9D8',
    borderRadius: '4px',
  },
  searchInput: {
    outline: 'none',
    border: '0',
    backgroundColor: 'transparent',
    flex: '1',
    padding: '0',
    height: '25px',
    lineHeight: '25px',
  },
  active: {
    backgroundColor: '#fff'
  },
  searchIcon: {
    '& .MuiSvgIcon-root': {
      verticalAlign: 'top'
    }
  },
  searchContent: {
    flex: '1'
  },
  searchContentTitle: {
    backgroundColor: '#DBD9D8',
    lineHeight: '30px',
    padding: '0 12px',
    color: '#818181'
  }
}));

const Search: React.FC = () => {
  const classes = useStyles();
  const { t } = useTranslation();

  const [activeClass, setActoveClass] = useState<string>('');

  const focusHandler = () => {
    setActoveClass(classes.active)
  }
  const blurHandler = () => {
    setActoveClass('')
  }
  return (
    <div className={classes.topSearch}>
      <div className={`${classes.searchBox} ${activeClass}`}>
        <i className={classes.searchIcon}>
          <SearchIcon />
        </i>
        <input className={classes.searchInput} type="text" placeholder={t('search')} onFocus={() => focusHandler()} onBlur={() => blurHandler()} />
      </div>
      <p className={classes.searchContentTitle}>结果</p>
      <div className={classes.searchContent}>

      </div>
    </div>
  );
};

export default Search;
