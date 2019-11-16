import * as React from "react";
// import * as NebulaSvg from "nebula.svg";
import { Theme, createStyles } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
const styles = (theme: Theme) =>
  createStyles({
    nebulaIcon: {
      height: "30px",
      marginRight: theme.spacing(1),
      verticalAlign: "middle"
    }
  });

type MyState = {};

type MyProps = {
  classes: any;
};

class NebulaIcon extends React.Component<MyProps, MyState> {
  render() {
    const { classes } = this.props;

    const nebulaLogoPath = require("./nebula.svg") as string;

    return (
      <span>
        <a href="/">
          <img src={nebulaLogoPath} alt="" className={classes.nebulaIcon} />
        </a>
      </span>
    );
  }
}

export default withStyles(styles)(NebulaIcon);
