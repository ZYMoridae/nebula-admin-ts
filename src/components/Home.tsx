import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import HomeIcon from '@material-ui/icons/Home';
// import Slider from 'react-animated-slider';
import 'react-animated-slider/build/horizontal.css';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Grid from '@material-ui/core/Grid';

import FeaturedProduct from './home/FeaturedProduct';
import TodayDealsProduct from './home/TodayDealsProduct';
import RecommendProduct from './home/RecommendProduct';
import ContentLoader from "react-content-loader";
import _ from 'lodash';
import IconButton from '@material-ui/core/IconButton';
import AutorenewIcon from '@material-ui/icons/Autorenew';

import { Theme, createStyles } from "@material-ui/core";

import { default as Slider, Settings as SliderSettings } from 'react-slick';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';


const styles = (theme: Theme) => createStyles({
  root: {
    width: '100%',
    marginTop: theme.spacing(3)
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
  subHeader: {
    fontWeight: 600
  },
  promotionMetaContainer: {
    textAlign: 'center',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)'
  },
  title: {
    color: '#3d3d3d'
  },
  nav: {
    color: '#3d3d3d'
  },
  blockContainer: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3)
  },
  productsHero: {
    width: '100%',
    borderBottom: '1px solid #d3d3d3',
    display: 'flex',
    justifyContent: 'space-between'
  },
  fetchedProductsContainer: {
    marginBottom: theme.spacing(3)
  },
  renewIcon: {
    paddingTop: '4px',
    textAlign: 'right',
    color: theme.palette.primary.main,
    transition: 'all 0.5s',
    '&:hover': {
      color: '#d14d12',
      transition: 'all 0.5s'
    }
  }
});

const RenderLoadingPlaceholder = () => {
  return (
    <ContentLoader
      height={250}
      width={400}
      speed={2}
      primaryColor="#f3f3f3"
      secondaryColor="#ecebeb"
    >
      <rect x="0" y="0" rx="5" ry="5" width="100%" height="180" />
      <rect x="0" y="190" rx="3" ry="3" width="100" height="10" />
      <rect x="120" y="190" rx="3" ry="3" width="200" height="10" />
      <rect x="0" y="210" rx="3" ry="3" width="100%" height="10" />
      <rect x="0" y="230" rx="3" ry="3" width="200" height="10" />
      <rect x="220" y="230" rx="3" ry="3" width="80" height="10" />
    </ContentLoader>
  );
}

const BlockComponent = (props: any) => {
  const { classes, isFetchedProducts, items, title, error } = props;
  const TagName = props.tag;
  const contentLoadersArray = _.range(4);
  const renewClicked = () => {

  };

  return (
    <div>
      <div className={classes.blockContainer}>
        {/* <Fab
                  variant="extended"
                  size="medium"
                  color="primary"
                  aria-label="Add"
                  href="/products"
                >
                  <HomeIcon />
                  Products
                </Fab> */}
        <div className={classes.productsHero}>
          <a href="/products" style={{ textDecoration: 'none' }}>
            <Typography variant="h6" gutterBottom className={classes.nav}>
              {title}
            </Typography>
          </a>
          <span>
            <AutorenewIcon className={classes.renewIcon} onClick={renewClicked} />
          </span>
        </div>
      </div>

      <Grid container spacing={4} className={classes.fetchedProductsContainer}>
        {
          error == null && isFetchedProducts && Array.isArray(items) ?
            items.map((product, index) =>
              <Grid item xs={12} sm={6} lg={3} key={index}>
                <TagName product={product} />
              </Grid>
            ) : contentLoadersArray.map((item, index) =>
              <Grid item xs={12} sm={6} lg={3} key={index}>
                {RenderLoadingPlaceholder()}
              </Grid>
            )
        }
      </Grid>
    </div>
  )
}

type MyState = {

};


type MyProps = {
  dispatch: any,
  classes: any,
  fetchHomeBannerInfo: any,
  fetchFeaturedProducts: any,
  info: any,
  featuredProducts: any,
  isFetchedProducts: any,
  fetchProductsError: any,
  fetchHomeBannerError: any
};

class Home extends React.Component<MyProps, MyState> {

  componentDidMount() {
    const { fetchHomeBannerInfo, fetchFeaturedProducts } = this.props;
    fetchHomeBannerInfo();
    fetchFeaturedProducts(1, 4);
  }

  render() {

    var settings: SliderSettings = {
      arrows: false,
      lazyLoad: "ondemand",
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1
    };

    const { classes, info, featuredProducts, isFetchedProducts, fetchProductsError, fetchHomeBannerError } = this.props;

    return (
      <div className={classes.root}>
 
          <Grid container spacing={0}>
            <Grid item xs={1} md={2} xl={2}>

            </Grid>
            <Grid item xs={10} md={8} xl={8}>
              <div>
                <Slider {...settings}>
                  {info.map((promotion: any, index: number) =>
                    <div key={index}>
                      {/* <img src={promotion.imageUrl} style={{height: 400, width: '100%'}}/> */}

                      <div style={{ background: `url('${promotion.imageUrl}') no-repeat center center`, height: 400, textAlign: 'center', display: 'table', width: '100%' }}>
                        <div style={{ display: 'table-cell', verticalAlign: 'middle' }}>
                          <Typography variant="h3" gutterBottom className={classes.title}>
                            {promotion.title}
                          </Typography>
                          <Typography variant="subtitle2" gutterBottom>
                            {promotion.description}
                          </Typography>
                        </div>
                      </div>
                    </div>
                  )}
                </Slider>
              </div>
              {/* <Slider autoplay={3000} previousButton={<ChevronLeft fontSize='large' className={classes.nav} />} nextButton={<ChevronRight fontSize='large' className={classes.nav} />}>
                {info.map((promotion, index) =>
                  <div key={index} style={{ background: `url('${promotion.imageUrl}') no-repeat center center` }}>
                    <div className={classes.promotionMetaContainer}>
                      <Typography variant="h3" gutterBottom className={classes.title}>
                        {promotion.title}
                      </Typography>
                      <Typography variant="subtitle2" gutterBottom>
                        {promotion.description}
                      </Typography>
                    </div>
                  </div>
                )}
              </Slider>  */}
              {fetchHomeBannerError == null ? '' : <ContentLoader
                height={170}
                width={400}
                speed={2}
                primaryColor="#f3f3f3"
                secondaryColor="#ecebeb"
              >
                <rect x="0" y="10" width="400" height="160" rx="5" />
              </ContentLoader>}

              <BlockComponent classes={classes} title={'Featured Products'} isFetchedProducts={isFetchedProducts} items={featuredProducts} tag={FeaturedProduct} error={fetchProductsError}></BlockComponent>

              <BlockComponent classes={classes} title={'Today\'s Deals'} isFetchedProducts={isFetchedProducts} items={featuredProducts} tag={TodayDealsProduct} error={fetchProductsError}></BlockComponent>

              <BlockComponent classes={classes} title={'Recommend For You'} isFetchedProducts={isFetchedProducts} items={featuredProducts} tag={RecommendProduct} error={fetchProductsError}></BlockComponent>

            </Grid>

            <Grid item xs={1} md={2} xl={2}>

            </Grid>
          </Grid>
 




      </div>
    )
  }
}

export default withStyles(styles)(Home);