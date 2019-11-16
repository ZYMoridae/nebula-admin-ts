import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import WarningIcon from "@material-ui/icons/WarningRounded";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import { Theme, createStyles } from "@material-ui/core";

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
  expanded: boolean;
};

type MyProps = {
  classes: any;
  theme: any;
  warningText?: string;
  paddingTop?: number;
  paddingBottom?: number;
};

class ContentNotFound extends React.Component<MyProps, MyState> {
  render() {
    const {
      theme,
      warningText,
      classes,
      paddingTop,
      paddingBottom
    } = this.props;

    let defaultStyle = {
      emptyCartCaptionContainer: {
        paddingLeft: theme.spacing(5),
        paddingRight: theme.spacing(5),
        paddingTop: theme.spacing(10),
        paddingBottom: theme.spacing(10),
        marginBottom: theme.spacing(3),
        marginTop: theme.spacing(3),
        // FIXME:
        textAlign: "center" as "center"
      }
    };

    if (paddingTop != undefined) {
      defaultStyle.emptyCartCaptionContainer.paddingTop = paddingTop;
    }

    if (paddingBottom != undefined) {
      defaultStyle.emptyCartCaptionContainer.paddingBottom = paddingBottom;
    }

    return (
      <Paper style={defaultStyle.emptyCartCaptionContainer}>
        <WarningIcon
          fontSize="large"
          color="primary"
          className={classes.warningIcon}
        />

        <Typography
          variant="caption"
          gutterBottom
          className={classes.warningText}
        >
          {warningText && warningText != ""
            ? warningText
            : "Content was not found!"}
        </Typography>
      </Paper>
    );
  }
}

export default withStyles(styles, { withTheme: true })(ContentNotFound);
