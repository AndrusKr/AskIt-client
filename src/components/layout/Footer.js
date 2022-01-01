import React from "react";
import { useSelector } from "react-redux";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import { getIsAuth } from "../../redux/selectors/auth";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  footer: {
    paddingBottom: ({ isAuthenticated }) => (isAuthenticated ? "90px" : "10px"),
  },
}));

const Footer = () => {
  const isAuthenticated = useSelector(getIsAuth);
  const classes = useStyles({ isAuthenticated });

  return (
    <footer className={classes.footer}>
      <Container maxWidth="sm">
        <Typography variant="body1" align="center">
          © Andruś Kryvičenka
        </Typography>
      </Container>
    </footer>
  );
};

export default Footer;
