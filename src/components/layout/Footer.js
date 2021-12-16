import React, { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import { setFooter } from "../../redux/actions/language";

const Footer = () => {
  const footer = useRef(null);
  const dispatch = useDispatch();

  useEffect(() => {
    if (footer && footer.current) {
      dispatch(setFooter(footer.current));
    }
  }, [dispatch, footer]);

  return (
    <footer ref={footer}>
      <Container maxWidth="sm">
        <Typography variant="body1" align="center">
          © Andruś Kryvičenka
        </Typography>
      </Container>
    </footer>
  );
};

export default Footer;
