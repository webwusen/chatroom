import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

const SwitchLang: React.FC = () => {
  const { i18n } = useTranslation();

  interface langProps {
    label: string;
    value: string;
  }

  const options: Array<langProps> = [
    { label: "中文", value: "zh" },
    { label: "English", value: "en" },
  ];

  const langCache: string | null = localStorage.getItem("lang");

  let defaultLang = options[0];

  if (langCache) {
    defaultLang = JSON.parse(langCache);
  }

  const [lang, setLang] = useState<langProps>(defaultLang);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMenuItemClick = (item: langProps) => {
    if (item.value !== lang.value) {
      localStorage.setItem("lang", JSON.stringify(item));
      setLang(item);
      i18n.changeLanguage(item.value);
    }
    handleClose();
  };
  return (
    <span>
      <Button
        aria-controls="simple-menu"
        aria-haspopup="true"
        endIcon={<ExpandMoreIcon />}
        onClick={handleClick}
      >
        {lang.label}
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {options.map((option) => (
          <MenuItem
            key={option.value}
            selected={option.value === lang.value}
            onClick={() => handleMenuItemClick(option)}
          >
            {option.label}
          </MenuItem>
        ))}
      </Menu>
    </span>
  );
};

export default SwitchLang;
