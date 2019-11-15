import * as React from "react";
import { withStyles } from "@material-ui/core/styles";

import { Theme, createStyles } from "@material-ui/core";

const styles = (theme: Theme) =>
  createStyles({
    indicatorClass: {
      backgroundColor: "#2b8eff",
      color: "white",
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
      fontWeight: 500,
      height: theme.spacing(3),
      width: theme.spacing(3),
      textAlign: "center",
      borderRadius: "50%",
      lineHeight: `${theme.spacing(3)}px`,
      marginTop: theme.spacing(1.5),
      marginBottom: theme.spacing(1.5),
      fontSize: "12px"
    }
  });

type IndicatorState = {};

type IndicatorProps = {
  classes: any;
  index: number;
};

class Indicator extends React.Component<IndicatorProps, IndicatorState> {
  render() {
    const { classes, index } = this.props;
    return <div className={classes.indicator}>{index}</div>;
  }
}

export default withStyles(styles, { withTheme: true })(Indicator);
