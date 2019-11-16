import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { Theme, createStyles } from "@material-ui/core";
import Utils from "../../utils/Utils";

const styles = (theme: Theme) =>
  createStyles({
    warningText: {
      color: "#a9a9a9",
      marginLeft: theme.spacing(1)
    },
    warningIcon: {
      verticalAlign: "middle"
    }
  });

type MyState = {
  backgroundProcess: any;
  open: boolean;
};

type MyProps = {
  classes: any;
  theme: any;
  fetchTokenAliveInfo: () => void;
  info: any;
};

class BackgroundProcessComponent extends React.Component<MyProps, MyState> {
  constructor(props: any) {
    super(props);
    this.state = {
      backgroundProcess: null,
      open: true
    };
  }

  handleClickOpen = () => {
    this.setState({
      open: true
    });
  };

  handleClose = () => {
    // this.setState({
    //   open: false
    // });
    Utils.logout();
  };

  componentWillMount() {
    let backgroundProcess = setInterval(() => {
      this.props.fetchTokenAliveInfo();
    }, 20000);
    this.setState({
      backgroundProcess: backgroundProcess
    });
  }

  componentWillUnmount() {
    this.setState({
      backgroundProcess: null
    });
  }

  render() {
    const { info } = this.props;
    return (
      <div>
        {info && !info.isTokenAlive && (
          <Dialog
            open={this.state.open}
            onClose={this.handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              {"Session expired"}
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                Your session is expired. Please login again!
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              {/* <Button onClick={this.handleClose} color="primary">
              Disagree
          </Button> */}
              <Button onClick={this.handleClose} color="primary" autoFocus>
                Ok
              </Button>
            </DialogActions>
          </Dialog>
        )}
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(
  BackgroundProcessComponent
);
