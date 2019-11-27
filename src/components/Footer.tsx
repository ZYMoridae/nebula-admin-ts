import * as React from "react";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";

import { Theme, createStyles } from "@material-ui/core";
import Constants from "../utils/Constants";

import { Layout, Menu, Breadcrumb, Icon } from 'antd';

const { Header, Content, Footer, Sider } = Layout;


const styles = (theme: Theme) =>
  createStyles({
    container: {
      backgroundColor: "#1d1d1d",
      paddingTop: theme.spacing(2),
      paddingBottom: theme.spacing(2),
      marginLeft: Constants.styles.sidebar.width,
      textAlign: "center"
    },
    footerText: {
      color: "white",
      fontSize: "10px",
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2)
    },
    footerTextContainer: {
      marginTop: theme.spacing(2)
    },
    linkContainer: {
      textAlign: "center",
      display: "inline-flex",
      color: "white",
      width: "100%"
    },
    linkItem: {
      fontSize: "10px",
      marginRight: theme.spacing(2),
      transition: "all 0.15s",
      color: "white",
      textDecoration: "none",
      "&:hover": {
        color: theme.palette.primary.main,
        transition: "all 0.15s",
        textDecoration: "underline"
      }
    }
  });

// type FooterState = {};

// type FooterProps = {
//   classes: any;
// };

class MyFooter extends React.Component{
  render() {
    // const { classes } = this.props;

    return (
      // <div className={classes.container}>
      //   <div>
      //     <Typography
      //       variant="caption"
      //       gutterBottom
      //       align="center"
      //       className={classes.footerText}
      //     >
      //       <a href="/" className={classes.linkItem}>
      //         Condition of Use
      //       </a>
      //       <a href="/" className={classes.linkItem}>
      //         Privacy Notice
      //       </a>
      //       <a href="/" className={classes.linkItem}>
      //         Cookies
      //       </a>
      //     </Typography>
      //   </div>
      //   <div className={classes.footerTextContainer}>
      //     <Typography
      //       variant="caption"
      //       gutterBottom
      //       align="center"
      //       className={classes.footerText}
      //     >
      //       © 2019, Max Studio
      //     </Typography>
      //   </div>
      // </div>
    <Footer style={{ textAlign: 'center' }}>Plato Tech ©{new Date().getFullYear()}</Footer>
    );
  }
}

export default withStyles(styles)(MyFooter);
