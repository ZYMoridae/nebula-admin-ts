import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Fade from "@material-ui/core/Fade";
import Grid from "@material-ui/core/Grid";
import _ from "lodash";
import { Theme, createStyles } from "@material-ui/core";
// import Constants from "../../utils/Contants";

const styles = (theme: Theme) => createStyles({});

type FormState = {};

type FormProps = {
  classes: any;
  user: any;
  mode: string;
};

class Form extends React.Component<FormProps, FormState> {
  componentDidMount() {
    // const { fetchUser, id } = this.props;
    // fetchUser(id);
  }

  render() {
    const { classes, user } = this.props;

    return <div></div>;
  }
}

export default withStyles(styles, { withTheme: true })(Form);
