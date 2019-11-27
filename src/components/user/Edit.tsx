import * as React from "react";
import { withStyles } from "@material-ui/core/styles";
import Fade from "@material-ui/core/Fade";
import Grid from "@material-ui/core/Grid";
import _ from "lodash";

import CircularProgress from "@material-ui/core/CircularProgress";
import Constants from "../../utils/Constants";
import Form from "./Form";
import { Theme, createStyles } from "@material-ui/core";

// Ant Design
import Footer from "../Footer";
import { Layout, Table, Breadcrumb } from "antd";

const { Content } = Layout;

const styles = (theme: Theme) =>
  createStyles({
    container: {
      paddingTop: theme.spacing(5),
      marginBottom: theme.spacing(2),
      marginLeft: `${Constants.styles.sidebar.width}px`
    },
    priceCaption: {
      color: "#B12704",
      marginLeft: theme.spacing(1)
    },
    leftIcon: {
      marginRight: theme.spacing(1)
    },
    button: {
      backgroundColor: "#00B3A0",
      transition: "all 0.3s",
      marginTop: theme.spacing(1),
      maringRight: theme.spacing(1),
      marginBottom: theme.spacing(1),
      paddingTop: theme.spacing(1),
      paddingBottom: theme.spacing(1),
      color: "white",
      "&:hover": {
        backgroundColor: "#00877C",
        transition: "all 0.3s"
      }
    },
    metaContainer: {
      paddingLeft: theme.spacing(2)
    },
    formControl: {
      marginTop: theme.spacing(1),
      maringRight: theme.spacing(1),
      marginBottom: theme.spacing(1),
      minWidth: 120
    },
    table: {
      // minWidth: 700
    },
    divider: {
      marginTop: theme.spacing(2),
      marginBottom: theme.spacing(1)
    },
    main: {
      marginLeft: `${Constants.styles.sidebar.width}px`
    }
  });

type EditState = {};

type EditProps = {
  classes: any;
  fetchUser: any;
  id: number;
  user: any;
  fetchUserPending: boolean;
  fetchUserFulfilled: boolean;
  updateUser: any;
  updateUserPending: boolean;
  updateUserFulfilled: boolean;
};

class Edit extends React.Component<EditProps, EditState> {
  componentDidMount() {
    const { fetchUser, id } = this.props;
    fetchUser(id);
  }

  render() {
    const {
      classes,
      user,
      fetchUserPending,
      fetchUserFulfilled,
      updateUser,
      updateUserPending,
      updateUserFulfilled
    } = this.props;

    return (
      <Layout style={{ padding: "0 24px 24px" }}>
        <Breadcrumb style={{ margin: "16px 0" }}>
          <Breadcrumb.Item>User</Breadcrumb.Item>
          <Breadcrumb.Item>List</Breadcrumb.Item>
        </Breadcrumb>
        <Content
          style={{
            background: "#fff",
            padding: 24,
            margin: 0,
            minHeight: 280
          }}
        >
          {fetchUserFulfilled && user && (
            <Form
              user={user}
              mode={Constants.FORM.MODE.UPDATE}
              action={updateUser}
              actionPending={updateUserPending}
              actionFulfilled={updateUserFulfilled}
            ></Form>
          )}
        </Content>
        <Footer></Footer>
      </Layout>

      // <Fade in={true} timeout={1000}>
      //   <Grid container>
      //     <Grid item xs={1} sm={1}></Grid>
      //     <Grid item xs={10} sm={8} className={classes.container}>
      //       {fetchUserPending && <CircularProgress />}
      //       {fetchUserFulfilled && user && (
      //         <Form
      //           user={user}
      //           mode={Constants.FORM.MODE.UPDATE}
      //           action={updateUser}
      //           actionPending={updateUserPending}
      //           actionFulfilled={updateUserFulfilled}
      //         ></Form>
      //       )}
      //     </Grid>
      //     <Grid item xs={1} sm={1}></Grid>
      //   </Grid>
      // </Fade>
    );
  }
}

export default withStyles(styles, { withTheme: true })(Edit);
