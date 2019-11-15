import React, { Component } from 'react';
import ProductItem from './ProductItem';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import Pagination from "material-ui-flat-pagination";
import CssBaseline from "@material-ui/core/CssBaseline";
import Divider from '@material-ui/core/Divider';
import Grow from '@material-ui/core/Grow';

import { Theme, createStyles } from "@material-ui/core";

const styles = (theme: Theme) => createStyles({
  container: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  textField: {

  },
  dense: {
    marginTop: 16,
  },
  menu: {
    width: 200,
  },
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  loginContainer: {
    padding: theme.spacing(3),
    marginTop: theme.spacing(12),
    display: 'flex',
    flexWrap: 'wrap',
    width: 350
  },
  loginButton: {
    marginTop: theme.spacing(2)
  },
  productsContainer: {
    marginLeft: theme.spacing(10),
    marginRight: theme.spacing(10),
    marginBottom: theme.spacing(7)
  },
  pagination: {
    marginTop: theme.spacing(5),
    textAlign: 'center'
  },
  prodcutContainer: {
    marginTop: theme.spacing(2)
  }

});

type MyState = {
  offset: number
};


type MyProps = {
  dispatch: any,
  classes: any,
  fetchProductsInfo: any,
  page: number,
  perPage: number,
  orderBy: string,
  info: any,
  totalPages: number
};


class Products extends React.Component<MyProps, MyState> {
  constructor(props: any) {
    super(props);
    this.state = { offset: 0 };
  }

  componentDidMount() {
    const { fetchProductsInfo, page, perPage, orderBy } = this.props;
    let currentOffset = (page - 1) * perPage;
    this.handleClick(currentOffset);
    fetchProductsInfo(page, perPage, orderBy);
  }

  updateUrlParmas(page: number, perPage: number, orderBy: string) {
    if (history.pushState) {
      let url = `${window.location.protocol}//${window.location.host}${window.location.pathname}?page=${page}&perPage=${perPage}&orderBy=${orderBy}`;
      window.history.pushState({
        path: url
      }, '', url);
    }
  }

  handleClick(offset: number) {
    const { perPage, orderBy, fetchProductsInfo } = this.props;
    let page = (offset / this.props.perPage) + 1;
    this.setState({ offset });
    this.updateUrlParmas(page, perPage, orderBy);
    fetchProductsInfo(page, perPage, orderBy);
  }
  render() {
    const { info, classes, perPage, totalPages, page } = this.props;

    const theme = createMuiTheme({
      // typography: {
      //   useNextVariants: true,
      // },
    });

    return (
      <div className={classes.productsContainer}>

        <Grid container spacing={4} direction="row" className={classes.prodcutContainer}>
          <Grid item xs={1} lg={2}></Grid>
          <Grid item xs={10} lg={8}>
            <Grid container spacing={4} direction="row" alignContent='center'>
              <Grid item xs={12}>
                <Typography variant="h4" gutterBottom>
                  Products
                </Typography>
                <Divider />
              </Grid>

              {
                Array.isArray(info) ?
                  info.map((product, index) =>
                    <Grow in={true} key={index} timeout={index * 500}>
                      <Grid item xs={6} sm={6} lg={4} >
                        <ProductItem product={product}>
                        </ProductItem>
                      </Grid>
                    </Grow>
                  ) : ''
              }
              <Grid item xs={12}>
                <div>
                  <MuiThemeProvider theme={theme}>
                    <CssBaseline />
                    <Pagination
                      limit={perPage}
                      offset={this.state.offset}
                      total={totalPages * perPage}
                      onClick={(e, offset) => this.handleClick(offset)}
                    />
                  </MuiThemeProvider>
                </div>
              </Grid>
            </Grid>

          </Grid>
          <Grid item xs={1} lg={2}></Grid>
        </Grid>

      </div>
    )
  }
}

export default withStyles(styles)(Products);