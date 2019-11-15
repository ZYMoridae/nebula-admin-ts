import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import { createMuiTheme } from '@material-ui/core/styles';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Grow from '@material-ui/core/Grow';
import Avatar from '@material-ui/core/Avatar';

const theme = createMuiTheme({
  // typography: {
  //   useNextVariants: true,
  // }
});

const getRandomColor = () => {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};


const classes = {
  commentBody: (deepIndex: number) => {
    return {
      // borderLeft: deepIndex != 1 ? 'solid 1px' : '',
      // borderColor: 'lightgrey',
      paddingTop: theme.spacing(1),
      paddingBottom: theme.spacing(1),
      paddingLeft: deepIndex != 1 ? theme.spacing(2) : theme.spacing(1),

      marginLeft: deepIndex == 1 ? 0 : theme.spacing(3) * (deepIndex - 1)
    }
  },
  commentUser: (deepIndex: number) => {
    return {
      // borderLeft: deepIndex != 1 ? 'solid 1px' : '',
      // borderColor: 'lightgrey',
      marginBottom: theme.spacing(1),
      display: 'inline-flex'
    }
  },
  commentUserImage: {
    verticalAlign: 'middle',
    marginRight: theme.spacing(1),
    fontSize: '-webkit-xxx-large',
    color: getRandomColor()
  },
  cBody: {
    // fontSize: '1.3em'
  },
  container: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
  },
  username: {
    fontFamily: "'Roboto', sans-serif",
    fontSize: '1.7em',
    color: '#b24b1c'
  },
  avatar: {
    marginLeft: 8,
    marginRight: 8
  }
};

type MyState = {

};


type MyProps = {
  comment: any,
  deepIndex: number
};


class ProductComments extends React.Component<MyProps, MyState> {
  render() {
    const { comment, deepIndex } = this.props;

    return (
      <div>
        <div style={classes.container}>
          <Typography variant="caption" gutterBottom style={classes.commentBody(deepIndex)}>
            <Typography variant="caption" gutterBottom style={classes.commentUser(deepIndex)}>
              {/* <AccountCircle fontSize="large" style={classes.commentUserImage} /> */}
              <Avatar alt="Remy Sharp" src="https://material-ui.com/static/images/avatar/1.jpg" style={classes.avatar} />
              <div>
                <div style={classes.username}>
                  {comment.user && comment.user.username}
                </div>
                <div>
                  <span style={classes.cBody}>
                    {comment.body}
                  </span>
                </div>
              </div>


            </Typography>
          </Typography>
        </div>
        {comment.childrenComments && comment.childrenComments.map((comment1: any, index: number) =>
          <Grow in={true} key={index} timeout={index * 500}>
            <div>
              <div style={classes.container}>
                <Typography variant="caption" gutterBottom style={classes.commentBody(deepIndex + 1)}>
                  <Typography variant="caption" gutterBottom style={classes.commentUser(deepIndex + 1)}>
                    <AccountCircle fontSize="large" style={classes.commentUserImage} />
                    <div>
                      <div style={classes.username}>
                        {comment1.user && comment1.user.username}
                      </div>
                      <div>
                        <span style={classes.cBody}>
                          {comment1.body}
                        </span>
                      </div>
                    </div>
                  </Typography>
                </Typography>
              </div>
              {comment1.childrenComments && comment1.childrenComments.map((childComment: any, index2: number) => <ProductComments key={index2} comment={childComment} deepIndex={deepIndex + 2}></ProductComments>)}
            </div>
          </Grow>
        )}

      </div>
    )
  }
}

export default ProductComments;