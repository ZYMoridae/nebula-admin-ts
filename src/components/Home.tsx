import React, { Component } from "react";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import "react-animated-slider/build/horizontal.css";
import ChevronRight from "@material-ui/icons/ChevronRight";
import Grid from "@material-ui/core/Grid";
import Fade from "@material-ui/core/Fade";

import ContentLoader from "react-content-loader";
import _ from "lodash";
import AutorenewIcon from "@material-ui/icons/Autorenew";

import { Bar } from "react-chartjs-2";

import { useTranslation } from "react-i18next";

import Constants from "../utils/Constants";

import { Theme, createStyles } from "@material-ui/core";

const styles = (theme: Theme) =>
createStyles({
  root: {
    width: "100%"
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular
  },
  subHeader: {
    fontWeight: 600
  },
  promotionMetaContainer: {
    textAlign: "center",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)"
  },
  title: {
    color: "#3d3d3d"
  },
  nav: {
    color: "#3d3d3d"
  },
  blockContainer: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3)
  },
  productsHero: {
    width: "100%",
    borderBottom: "1px solid #d3d3d3",
    display: "flex",
    justifyContent: "space-between"
  },
  fetchedProductsContainer: {
    marginBottom: theme.spacing(3)
  },
  renewIcon: {
    paddingTop: "4px",
    textAlign: "right",
    color: theme.palette.primary.main,
    transition: "all 0.5s",
    "&:hover": {
      color: "#d14d12",
      transition: "all 0.5s"
    }
  },
  wrapperTop: {
    marginTop: theme.spacing(5)
  },
  moreIcon: {
    fontSize: "0.75rem",
    lineHeight: "1.66",
    verticalAlign: "text-top"
  },
  // toolbar: theme.mixins.toolbar,
  content: {
    marginLeft: Constants.styles.sidebar.width,
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3)
  }
});

type HomeState = {
};

type HomeProps = {
  classes: any;
};


class Home extends React.Component<HomeProps, HomeState>{
  constructor(props: any) {
    super(props);
  }

  componentDidMount() {
  }

  render() {
    const {
      classes,
    } = this.props;

    const data = {
      labels: ["January", "February", "March", "April", "May", "June", "July"],
      datasets: [
        {
          label: "My First dataset",
          backgroundColor: "rgba(255,99,132,0.2)",
          borderColor: "rgba(255,99,132,1)",
          borderWidth: 1,
          hoverBackgroundColor: "rgba(255,99,132,0.4)",
          hoverBorderColor: "rgba(255,99,132,1)",
          data: [65, 59, 80, 81, 56, 55, 40]
        }
      ]
    };

    return (
      <div className={classes.root}>
        <Fade in={true} timeout={1000}>
          <div>
            <main className={classes.content}>
              <div className={classes.toolbar} />

              <Bar
                data={data}
                width={100}
                height={50}
                options={{ maintainAspectRatio: false }}
              />
              <Typography paragraph>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
                Rhoncus dolor purus non enim praesent elementum facilisis leo
                vel. Risus at ultrices mi tempus imperdiet. Semper risus in
                hendrerit gravida rutrum quisque non tellus. Convallis convallis
                tellus id interdum velit laoreet id donec ultrices. Odio morbi
                quis commodo odio aenean sed adipiscing. Amet nisl suscipit
                adipiscing bibendum est ultricies integer quis. Cursus euismod
                quis viverra nibh cras. Metus vulputate eu scelerisque felis
                imperdiet proin fermentum leo. Mauris commodo quis imperdiet
                massa tincidunt. Cras tincidunt lobortis feugiat vivamus at
                augue. At augue eget arcu dictum varius duis at consectetur
                lorem. Velit sed ullamcorper morbi tincidunt. Lorem donec massa
                sapien faucibus et molestie ac.
              </Typography>
              <Typography paragraph>
                Consequat mauris nunc congue nisi vitae suscipit. Fringilla est
                ullamcorper eget nulla facilisi etiam dignissim diam. Pulvinar
                elementum integer enim neque volutpat ac tincidunt. Ornare
                suspendisse sed nisi lacus sed viverra tellus. Purus sit amet
                volutpat consequat mauris. Elementum eu facilisis sed odio
                morbi. Euismod lacinia at quis risus sed vulputate odio. Morbi
                tincidunt ornare massa eget egestas purus viverra accumsan in.
                In hendrerit gravida rutrum quisque non tellus orci ac.
                Pellentesque nec nam aliquam sem et tortor. Habitant morbi
                tristique senectus et. Adipiscing elit duis tristique
                sollicitudin nibh sit. Ornare aenean euismod elementum nisi quis
                eleifend. Commodo viverra maecenas accumsan lacus vel facilisis.
                Nulla posuere sollicitudin aliquam ultrices sagittis orci a.
              </Typography>
            </main>
          </div>
        </Fade>
      </div>
    );
  }
}

export default withStyles(styles)(Home);
