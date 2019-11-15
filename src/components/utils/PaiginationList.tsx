import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Theme, createStyles } from "@material-ui/core";

import NavigateBeforeRoundedIcon from '@material-ui/icons/NavigateBeforeRounded';
import NavigateNextRoundedIcon from '@material-ui/icons/NavigateNextRounded';

import './PaginationList.css';

import _ from 'lodash';
import Typography from '@material-ui/core/Typography';

const styles = (theme: Theme) => createStyles({
  paginationWrapper: {
    width: '100%',
    textAlign: 'center',
    marginBottom: theme.spacing(4),
    marginTop: theme.spacing(4)
  }
});

type MyState = {
  perPage: number,
  orderBy: string,
  page: number
};


type MyProps = {
  classes: any,
  theme: any,
  onPageChanged: any,
  count: number,
  initialPage?: number
};

/**
 * 
 * @param pageNumbersArray 
 * @param onPageChanged 
 * @param page 
 * @param count 
 */
const renderPageNumbers = (pageNumbersArray: Array<any>, onPageChanged: any, page: number, count: number) => {

  let pagginationArray: Array<any> = [];

  const arrayToNode = (pageNumbersArray: Array<any>) => {
    return (
      <div>
        {pageNumbersArray.map((item, index) =>
          _.isNumber(item) ? <li className={`pagination-block page-number ${page === item ? 'active' : ''}`} key={index}><a className='num' onClick={() => { onPageChanged(item); }}>{item}</a></li> : <li key={index} className='pagination-block page-spread'>...</li>
        )}
      </div>
    )
  }

  if (count > 2 && count < 5) {
    pagginationArray = pageNumbersArray;
  } else if (count >= 5) {
    if (page <= 5) {
      let firstFivePageNumbers: Array<any> = [...Array(page + 2).keys()].map(item => ++item);
      firstFivePageNumbers.push('...');
      pagginationArray = firstFivePageNumbers;
    } else {
      if (page + 2 <= count) {
        let curentPageNumbers = [1, 2, '...', page - 2, page - 1, page, page + 1, page + 2, '...'];
        pagginationArray = curentPageNumbers;
      } else {
        let curentPageNumbers: Array<any> = [1, 2, '...'];
        for (var i = count - 4; i <= count; i++) {
          curentPageNumbers.push(i);
        }

        pagginationArray = curentPageNumbers;
      }
    }
  }
  return (
    <div>
      {arrayToNode(pagginationArray)}
    </div>
  )
}


class PaginationList extends React.Component<MyProps, MyState> {
  constructor(props: any) {
    super(props);
    this.state = {
      perPage: 10,
      orderBy: '',
      page: 1
    };
  }

  updateUrlParmas(page: number, perPage: number, orderBy: string) {
    if (history.pushState) {
      let url = `${window.location.protocol}//${window.location.host}${window.location.pathname}?page=${page}&perPage=${perPage}&orderBy=${orderBy}`;
      window.history.pushState({
        path: url
      }, '', url);
    }
  }

  componentWillMount() {
    const { initialPage } = this.props;
    this.setState({
      page: initialPage
    })
  }

  componentDidMount() {
    const { onPageChanged } = this.props;
    onPageChanged(this.state.page, this.state.perPage, this.state.orderBy);

  }


  pageChanged = (item: number) => {
    this.setState({
      page: item
    });
    this.props.onPageChanged(item, this.state.perPage, this.state.orderBy);
    this.updateUrlParmas(item, this.state.perPage, this.state.orderBy);
  }

  previousBtnClick = () => {
    let page = this.state.page;

    if (page - 1 >= 1) {
      page = page - 1;
    }

    this.setState({
      page: page
    });

    this.pageChanged(page);
  }

  nextBtnClick = () => {
    let page = this.state.page;

    if (page + 1 <= this.props.count) {
      page = page + 1;
    }

    this.setState({
      page: page
    });

    this.pageChanged(page);
  }

  render() {
    const { classes, count } = this.props;

    let pageNumbersArray = [...Array(count).keys()].map(item => ++item);

    return (
      <div className={classes.paginationWrapper}>
        <ul className='pagination-container'>

          <li className='pagination-block previousBtn' onClick={this.previousBtnClick}>
            <NavigateBeforeRoundedIcon />
          </li>

          {renderPageNumbers(pageNumbersArray, this.pageChanged, this.state.page, count)}

          <li className='pagination-block nextBtn' onClick={this.nextBtnClick}>
            <NavigateNextRoundedIcon />
          </li>

          <li className='pagination-info'>
            <Typography variant="caption" gutterBottom>
              Total {count} pages
            </Typography>
          </li>
        </ul>
      </div>
    )
  }

}

export default withStyles(styles, { withTheme: true })(PaginationList);