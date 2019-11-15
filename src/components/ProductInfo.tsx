import React, { Component, ReactInstance } from 'react';
import ReactDOM from 'react-dom';
import { withStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import Grid from '@material-ui/core/Grid';

import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import _ from 'lodash';

import ShoppingCart from '@material-ui/icons/ShoppingCart';
import PlayCircleOutline from '@material-ui/icons/PlayCircleOutline';

import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Divider from '@material-ui/core/Divider';
import "react-image-gallery/styles/css/image-gallery.css";
import ImageGallery from 'react-image-gallery';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import Snackbar from '@material-ui/core/Snackbar';
import MySnackbarContent from './MySnackbarContent';



import CircularProgress from '@material-ui/core/CircularProgress';

import ProductCategorySideBarContainer from '../containers/ProductCategorySideBarContainer';

import ProductComments from './ProductComments';

import ContentNotFound from './utils/ContentNotFound';
import { isValid } from 'ipaddr.js';

import { Theme, createStyles } from "@material-ui/core";

import ErrorIcon from '@material-ui/icons/ErrorRounded';

const styles = (theme: Theme) => createStyles({
  container: {
    paddingTop: theme.spacing(5),
    marginBottom: theme.spacing(2)
  },
  priceCaption: {
    color: '#B12704',
    marginLeft: theme.spacing(1),
    fontSize: 23
  },
  leftIcon: {
    marginRight: theme.spacing(1),
  },
  button: {
    backgroundColor: '#00B3A0',
    transition: 'all 0.3s',
    marginTop: theme.spacing(2),
    maringRight: theme.spacing(1),
    marginBottom: theme.spacing(1),
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
    color: 'white',
    '&:hover': {
      backgroundColor: '#00877C',
      transition: 'all 0.3s'
    }
  },
  metaContainer: {
    paddingLeft: theme.spacing(2)
  },
  formControl: {
    marginTop: theme.spacing(1),
    maringRight: theme.spacing(1),
    marginBottom: theme.spacing(1),
    minWidth: 120,
  },
  table: {
    // minWidth: 700
  },
  divider: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(1)
  },
  warningText: {
    color: '#a9a9a9',
    marginLeft: theme.spacing(1)
  },
  warningIcon: {
    verticalAlign: 'middle'
  },
  warningContainer: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2)
  },
  productName: {
    fontFamily: "'Ubuntu', sans-serif"
  },
  productMetasContainer: {
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(5)
  }
});


const renderProductNotFoundBlock = () => {
  return (
    <ContentNotFound />
  )
}

/**
 * 
 * @param productMetas 
 * @param theme 
 * @param classes 
 */
const renderProductMetas = (productMetas: any, theme: any, classes: any) => {
  let block: any = ''
  let isDataValid = true;

  if (productMetas == undefined || !Array.isArray(productMetas)) {
    isDataValid = false;
    block = <ContentNotFound warningText="Product metas was unavailable!" paddingTop={theme.spacing(5)} paddingBottom={theme.spacing(5)} />
  } else {
    block = <Paper>
      <Table className={classes.table}>
        <TableBody>
          {productMetas.map((meta, index) => (
            <TableRow key={index}>
              <TableCell component="th" scope="row" className={classes.tableKey}>
                {meta.key}
              </TableCell>
              <TableCell align="right">{meta.value}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>;
  }

  return (
    <Grid item xs={12} sm={isDataValid ? 6 : 12} className={classes.productMetasContainer}>
      <Typography variant="h6" gutterBottom>
        Product Information
    </Typography>
      {block}
    </Grid>
  );
}

/**
 * 
 * @param productComments 
 * @param theme 
 * @param classes 
 */
const renderCustomerReviews = (productComments: any, theme: any, classes: any) => {
  let block: any = '';
  let isDataValid = true;

  if (productComments == undefined
    || !Array.isArray(productComments)
    || (Array.isArray(productComments) && productComments.length === 0)) {
    isDataValid = false;
    block = <ContentNotFound warningText="No customer reviews!" paddingTop={theme.spacing(5)} paddingBottom={theme.spacing(5)} />
  } else {
    block = <div>
      {productComments.map((productComment, index) =>
        <ProductComments key={index} comment={productComment} deepIndex={1}></ProductComments>
      )}
    </div>;
  }

  return (
    <Grid item xs={12} sm={isDataValid ? 6 : 12}>
      <Typography variant="h6" gutterBottom>
        Customer Reviews
      </Typography>
      {block}
    </Grid>
  );
}

type MyState = {
  age: string,
  name: string,
  labelWidth: number,
  quantity: number
};


type MyProps = {
  fetchProductInfo: any,
  productId: number,
  fetchProductComments: any,

  theme: any,
  classes: any,
  info: any,
  addCartItem: any,
  isShowSuccessToast: any,
  hideSuccessToast: any,
  productComments: any,
  isAddingCartItem: any,
  fetchProductInfoError: any
};

class ProductInfo extends React.Component<MyProps, MyState> {
  private InputLabelRef: ReactInstance;
  constructor(props: any) {
    super(props);
    this.state = {
      age: '',
      name: 'hai',
      labelWidth: 0,
      quantity: 1
    };
    // this.InputLabelRef = React.createRef();
  }


  componentDidMount() {
    const { fetchProductInfo, productId, fetchProductComments } = this.props;
    this.setState({
      labelWidth: (ReactDOM.findDOMNode(this.InputLabelRef) as HTMLInputElement).offsetWidth,
    });
    fetchProductInfo(productId);
    fetchProductComments(productId);
  }


  render() {
    const { theme, classes, info, addCartItem, isShowSuccessToast, hideSuccessToast, productComments, isAddingCartItem, fetchProductInfoError } = this.props;

    let maxQuantity = 20,
      quantityArray = [0];

    if (info.unitsInStock != undefined && info.unitsInStock > 0 && info.unitsInStock < 20) {
      maxQuantity = info.unitsInStock;
    }

    if (info.unitsInStock != undefined) {
      if (info.unitsInStock > 0 && info.unitsInStock < 20) {
        maxQuantity = info.unitsInStock;
      } else if (info.unitsInStock === 0) {
        maxQuantity = 0;
      }

      if (maxQuantity > 0) {
        quantityArray = [...Array(maxQuantity).keys()].map(item => ++item);
      }
    }

    const addCartButtonClickHandler = () => {
      addCartItem({
        "productId": info.id,
        "quantity": this.state.quantity
      });
    }

    const itemQuantityChangeHandler = (event: any) => {
      this.setState({
        quantity: event.target.value
      });
    }

    // TODO: Change product images gallery source
    const images = [
      {
        original: 'https://upserve.com/media/sites/2/Ledger-Restaurant-Bar-brunch_Photo-courtesy-of-Ledger-1024x768.jpg',
        thumbnail: 'https://upserve.com/media/sites/2/Ledger-Restaurant-Bar-brunch_Photo-courtesy-of-Ledger-1024x768.jpg',
      },
      {
        original: 'http://www.fabfoodchicago.com/wp-content/uploads/2017/05/IMG_4980-1024x768.jpg',
        thumbnail: 'http://www.fabfoodchicago.com/wp-content/uploads/2017/05/IMG_4980-1024x768.jpg'
      },
      {
        original: 'http://www.hofbrauhaus.com.au/wp-content/uploads/2019/03/Farmer-Breakfast-1024x768.jpg',
        thumbnail: 'http://www.hofbrauhaus.com.au/wp-content/uploads/2019/03/Farmer-Breakfast-1024x768.jpg'
      },
      {
        original: 'https://upserve.com/media/sites/2/Ledger-Restaurant-Bar-brunch_Photo-courtesy-of-Ledger-1024x768.jpg',
        thumbnail: 'https://upserve.com/media/sites/2/Ledger-Restaurant-Bar-brunch_Photo-courtesy-of-Ledger-1024x768.jpg',
      },
      {
        original: 'http://www.fabfoodchicago.com/wp-content/uploads/2017/05/IMG_4980-1024x768.jpg',
        thumbnail: 'http://www.fabfoodchicago.com/wp-content/uploads/2017/05/IMG_4980-1024x768.jpg'
      },
      {
        original: 'http://www.hofbrauhaus.com.au/wp-content/uploads/2019/03/Farmer-Breakfast-1024x768.jpg',
        thumbnail: 'http://www.hofbrauhaus.com.au/wp-content/uploads/2019/03/Farmer-Breakfast-1024x768.jpg'
      }
    ]

    let productInfoBlock: any = '';

    if (fetchProductInfoError != undefined) {
      productInfoBlock = renderProductNotFoundBlock();
    } else {
      productInfoBlock = <div>
        <Grid container spacing={5}>
          <Grid item xs={12} sm={6}>
            {/* <Image imageStyle={{width: '100%', height: 'auto'}} src="http://saveabandonedbabies.org/wp-content/uploads/2015/08/default.png"/> */}
            <ImageGallery items={images} showNav={false} showPlayButton={false} autoPlay={true} lazyLoad={true} useBrowserFullscreen={false} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <div className={classes.metaContainer}>
              <Typography variant="h5" gutterBottom className={classes.productName}>
                {_.capitalize(info.name)}
              </Typography>

              {/* {info.vendor && <Typography variant="caption" gutterBottom>
                by {_.capitalize(info.vendor.username)}
              </Typography>} */}

              <Typography variant="subtitle1" gutterBottom>
                Price:
                <span className={classes.priceCaption}>
                  ${_.capitalize(info.price)}
                </span>
              </Typography>
              <div>
                {info.unitsInStock === 0 ?
                  <div className={classes.warningContainer}>
                    <ErrorIcon fontSize="small" color="primary" className={classes.warningIcon} />

                    <Typography variant="caption" gutterBottom className={classes.warningText}>
                      {'Product not available now.'}
                    </Typography>
                  </div> :
                  <FormControl variant="outlined" className={classes.formControl}>
                    <InputLabel
                      ref={(ref: any) => {
                        this.InputLabelRef = ref;
                      }}
                      htmlFor="outlined-age-simple"
                    >
                      Quantity
                  </InputLabel>

                    <Select
                      value={this.state.quantity}
                      onChange={itemQuantityChangeHandler}
                      input={
                        <OutlinedInput
                          labelWidth={this.state.labelWidth}
                          name="quantity"
                          id="outlined-age-simple"
                        />
                      }
                    >
                      {
                        quantityArray.map((item, index) =>
                          <MenuItem key={index} value={item}>{item}</MenuItem>
                        )
                      }
                    </Select>
                  </FormControl>}


              </div>
              <div>
                <Button variant="contained" className={classes.button} disabled={isAddingCartItem} fullWidth={true} onClick={() => { addCartButtonClickHandler() }}>
                  <ShoppingCart className={classes.leftIcon} />
                  Add to cart
                </Button>
              </div>
              <div>
                <Button variant="contained" className={classes.button} fullWidth={true}>
                  <PlayCircleOutline className={classes.leftIcon} />
                  Buy now
                </Button>
              </div>
            </div>
          </Grid>
        </Grid>
        <Divider className={classes.divider} />
        {info.productMetas && renderProductMetas(info.productMetas, theme, classes)}
        {/* <Divider className={classes.divider} /> */}
        {renderCustomerReviews(productComments, theme, classes)}
      </div>;
    }

    return (
      <div>
        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
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

        {!info && <CircularProgress />}


        <Grid container >
          <Grid item xs={1} sm={2} lg={3}>
            {/* <ProductCategorySideBarContainer></ProductCategorySideBarContainer> */}
          </Grid>

          <Grid item xs={10} sm={8} lg={6} className={classes.container}>
            {info && productInfoBlock}
          </Grid>
          <Grid item xs={1} sm={2} lg={3}>

          </Grid>
        </Grid>
      </div>
    )
  }
}


export default withStyles(styles, { withTheme: true })(ProductInfo);