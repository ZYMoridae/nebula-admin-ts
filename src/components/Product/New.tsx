import * as React from "react";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import _ from "lodash";
import "react-image-gallery/styles/css/image-gallery.css";
import Snackbar from "@material-ui/core/Snackbar";
import MySnackbarContent from "../MySnackbarContent";
import Fade from "@material-ui/core/Fade";
import Constants from "../../utils/Constants";
import ProductForm from "./Form";

import { Theme, createStyles } from "@material-ui/core";

const styles = (theme: Theme) =>
  createStyles({
    container: {
      paddingTop: theme.spacing(5),
      marginBottom: theme.spacing(2)
    },
    main: {
      marginLeft: `${Constants.styles.sidebar.width}px`
    }
  });
type NewState = {};

type NewProps = {
  classes: any;
  info: any;
  isShowSuccessToast: any;
  hideSuccessToast: any;
  updateProduct: any;
  createProduct: any;
};

class New extends React.Component<NewProps, NewState> {
  constructor(props: any) {
    super(props);
    this.state = {
      age: "",
      name: "hai",
      labelWidth: 0,
      quantity: 1
    };
  }

  render() {
    const {
      classes,
      info,
      isShowSuccessToast,
      hideSuccessToast,
      updateProduct,
      createProduct
    } = this.props;

    let productInfoBlock: any = "";

    productInfoBlock = (
      <div>

      </div>
    );

    return (
      <div>
        <Snackbar
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left"
          }}
          open={isShowSuccessToast}
          autoHideDuration={1500}
          onClose={hideSuccessToast}
        >
          <MySnackbarContent
            onClose={hideSuccessToast}
            variant="success"
            message="Item has been added!"
          />
        </Snackbar>

        <Fade in={true} timeout={1000}>
          <Grid container className={classes.main}>
            <Grid item xs={1} sm={1}>
              {/* <ProductCategorySideBarContainer></ProductCategorySideBarContainer> */}
            </Grid>

            <Grid item xs={10} sm={8} className={classes.container}>
              {productInfoBlock}
            </Grid>
            <Grid item xs={1} sm={1}></Grid>
          </Grid>
        </Fade>
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(New);
