import * as React from "react";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import Pagination from "material-ui-flat-pagination";
import CssBaseline from "@material-ui/core/CssBaseline";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import DeleteIcon from "@material-ui/icons/Delete";
import CircularProgress from "@material-ui/core/CircularProgress";

import IconButton from "@material-ui/core/IconButton";

import SubToolBar from "../../../utils/SubToolBar";

import { Theme, createStyles } from "@material-ui/core";

const styles = (theme: Theme) => createStyles({
  productsContainer: {
    marginLeft: theme.spacing(10),
    marginRight: theme.spacing(10),
    marginBottom: theme.spacing(7)
  },
  pagination: {
    marginTop: theme.spacing(5),
    textAlign: "center"
  },
  prodcutContainer: {
    marginTop: theme.spacing(2),
    marginLeft: 340
  },
  idClick: {
    textDecoration: "underline",
    color: "#0044ff",
    "&:hover": {
      cursor: "pointer"
    }
  },
  table: {
    width: "100%"
  },
  newButton: {
    float: "right"
  },
  paginationWrapper: {
    textAlign: "center"
  }
});


type IndexState = {
  offset: number;
};

type IndexProps = {
  classes: any;
  page: number;
  perPage: number;
  orderBy?: string;
  fetchAllSkuAttributeCategory: any;
  skuAttributeCategories: any;
  totalPages: number;
  fetchAllSkuAttributeCategoryPending: any;
};

class Index extends React.Component<IndexProps, IndexState> {
  constructor(props: any) {
    super(props);
    this.state = { offset: 0 };
  }

  componentDidMount() {
    const { page, perPage, orderBy } = this.props;
    let currentOffset = (page - 1) * perPage;
    this.handleClick(currentOffset);
  }

  updateUrlParmas(page: number, perPage: number, orderBy: string) {
    if (history.pushState) {
      let url = `${window.location.protocol}//${window.location.host}${window.location.pathname}?page=${page}&perPage=${perPage}&orderBy=${orderBy}`;
      window.history.pushState(
        {
          path: url
        },
        "",
        url
      );
    }
  }

  /**
   * Handle pagination click
   *
   * @param {*} offset
   */
  handleClick(offset: number) {
    const { perPage, orderBy, fetchAllSkuAttributeCategory } = this.props;
    let page = offset / this.props.perPage + 1;
    this.setState({ offset });
    this.updateUrlParmas(page, perPage, orderBy);
    fetchAllSkuAttributeCategory(page, perPage, orderBy);
  }

  render() {
    const {
      skuAttributeCategories,
      classes,
      perPage,
      totalPages,
      fetchAllSkuAttributeCategoryPending
    } = this.props;

    const theme = createMuiTheme({
      // typography: {
      //   useNextVariants: true
      // }
    });

    const onDeleteClick = (product: any) => {
      window.location.href = "/skus/attributes/categories/" + product.id;
    };

    return (
      <div className={classes.productsContainer}>
        <main className={classes.content}>
          <Grid className={classes.prodcutContainer}>
            <Grid item xs={1} lg={2}></Grid>
            <Grid item xs={10} lg={12}>
              <Grid>
                <Grid item xs={12}>
                  <SubToolBar
                    title="Sku Attribute Category"
                    href="/skus/attributes/categories/new"
                  />
                </Grid>

                {fetchAllSkuAttributeCategoryPending ? (
                  <CircularProgress />
                ) : (
                  <Grid item xs={12}>
                    <Table className={classes.table} aria-label="simple table">
                      <TableHead>
                        <TableRow>
                          <TableCell>ID</TableCell>
                          <TableCell align="left">Name</TableCell>
                          <TableCell align="right">Action</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {Array.isArray(skuAttributeCategories) &&
                          skuAttributeCategories.map(
                            (skuAttributeCategory, index) => (
                              <TableRow key={index}>
                                <TableCell component="th" scope="row">
                                  <a
                                    className={classes.idClick}
                                    onClick={() => {
                                      onDeleteClick(skuAttributeCategory);
                                    }}
                                  >
                                    {skuAttributeCategory.id}
                                  </a>
                                </TableCell>
                                <TableCell align="left">
                                  {skuAttributeCategory.name}
                                </TableCell>
                                <TableCell align="right">
                                  <IconButton
                                    aria-label="delete"
                                    className={classes.margin}
                                    size="small"
                                    onClick={() => {
                                      onDeleteClick(skuAttributeCategory);
                                    }}
                                  >
                                    <DeleteIcon fontSize="inherit" />
                                  </IconButton>
                                </TableCell>
                              </TableRow>
                            )
                          )}
                      </TableBody>
                    </Table>
                  </Grid>
                )}

                <Grid item xs={12}>
                  <div className={classes.paginationWrapper}>
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
        </main>
      </div>
    );
  }
}

export default withStyles(styles)(Index);
