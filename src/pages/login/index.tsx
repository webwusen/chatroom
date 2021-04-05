import React, { useState } from "react";
import { withRouter, RouteComponentProps } from "react-router-dom";
import Box from '@material-ui/core/Box';
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { useTranslation } from "react-i18next";
import SwitchLang from "@/components/SwitchLang";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  lang: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
  },
}));

const Login = (props: RouteComponentProps) => {
  const classes = useStyles();
  const { t } = useTranslation();

  interface LoginInfo {
    username: string;
    password: string;
  }

  interface State extends LoginInfo {
    usernameValid: string;
    passwordValid: string;
    showPassword: boolean;
  }

  let storage: string | null = JSON.parse(
    localStorage.getItem("remember") || "null"
  );
  let username = "";
  let password = "";

  if (storage) {
    storage = JSON.parse(storage);
    let userinfo = localStorage.getItem("userinfo");
    let userinfoObj: LoginInfo = JSON.parse(userinfo || "null");
    if (userinfoObj) {
      username = userinfoObj.username;
      password = userinfoObj.password;
    }
  }

  const [remember, setRemember] = useState<boolean>(!!storage);

  const rememberHandleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRemember(event.target.checked);
  };

  const [values, setValues] = useState<State>({
    username: username,
    usernameValid: "",
    password: password,
    passwordValid: "",
    showPassword: false,
  });

  const mapObj: LoginInfo = {
    username: t("usernameRequire"),
    password: t("passwordRequired"),
  };

  const handleChange = (prop: keyof LoginInfo) => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const validKey = `${prop}Valid`;
    let msg = "";
    if (event.target.value === "") {
      msg = mapObj[prop];
    }
    setValues({ ...values, [prop]: event.target.value, [validKey]: msg });
  };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const checkInput = () => {
    const uFlag = values.username !== "";
    const pFlag = values.password !== "";
    if (uFlag && pFlag) {
      return true;
    }
    setValues({
      ...values,
      usernameValid: !uFlag ? mapObj.username : "",
      passwordValid: !pFlag ? mapObj.password : "",
    });
    return false;
  };

  const logIn = () => {
    const flag = checkInput();
    if (flag) {
      if (remember) {
        localStorage.setItem("remember", JSON.stringify(remember));
        localStorage.setItem(
          "userinfo",
          JSON.stringify({
            username: values.username,
            password: values.password,
          })
        );
      }
      props.history.push("/panel");
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box className={classes.lang}>
        <SwitchLang />
      </Box>
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          {t("login.signinTitle")}
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            error={values.usernameValid !== ""}
            helperText={values.usernameValid}
            value={values.username}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label={t("login.username")}
            name={t("login.username")}
            autoComplete="username"
            autoFocus
            onChange={handleChange("username")}
          />
          <TextField
            error={values.passwordValid !== ""}
            helperText={values.passwordValid}
            value={values.password}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name={t("login.password")}
            label={t("login.password")}
            type={values.showPassword ? "text" : "password"}
            autoComplete="current-password"
            onChange={handleChange("password")}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    edge="end"
                  >
                    {!values.showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={remember}
                onChange={rememberHandleChange}
                color="primary"
              />
            }
            label={t("login.remberme")}
          />
          <Button
            type="button"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={logIn}
          >
            {t("login.signin")}
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                {t("login.forgot")}
              </Link>
            </Grid>
            <Grid item>
              <Link href="/join" variant="body2">
                {t("login.signup")}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
};

export default withRouter(Login);
