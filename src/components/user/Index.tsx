import * as React from "react";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import Pagination from "material-ui-flat-pagination";
import CssBaseline from "@material-ui/core/CssBaseline";
// import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import DeleteIcon from "@material-ui/icons/Delete";
import CircularProgress from "@material-ui/core/CircularProgress";

import IconButton from "@material-ui/core/IconButton";

import SubToolBar from "../utils/SubToolBar";

import { Theme, createStyles } from "@material-ui/core";

// Ant Design
import Footer from "../Footer";
import { Layout, Table, Divider, Tag, Breadcrumb } from "antd";

const { Header, Content, Sider } = Layout;
// const styles = (theme: Theme) =>
//   createStyles({
//     productsContainer: {
//       marginLeft: theme.spacing(10),
//       marginRight: theme.spacing(10),
//       marginBottom: theme.spacing(7)
//     },
//     pagination: {
//       marginTop: theme.spacing(5),
//       textAlign: "center"
//     },
//     prodcutContainer: {
//       marginTop: theme.spacing(2),
//       marginLeft: 340
//     },
//     idClick: {
//       textDecoration: "underline",
//       color: "#0044ff",
//       "&:hover": {
//         cursor: "pointer"
//       }
//     },
//     table: {
//       width: "100%"
//     },
//     newButton: {
//       float: "right"
//     },
//     paginationWrapper: {
//       textAlign: "center"
//     }
//   });

const columns = [
  {
    title: "Id",
    dataIndex: "id",
    key: "id",
    render: (text: any, record: any) => (
      <a href={`/users/${record.id}`}>{text}</a>
    )
  },
  {
    title: "Username",
    dataIndex: "username",
    key: "username"
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "Email"
  },
  {
    title: "Action",
    key: "action",
    render: (text: any, record: any) => (
      <span>
        <a>Invite {record.name}</a>
        <Divider type="vertical" />
        <a>Delete</a>
      </span>
    )
  }
];

type IndexState = {
  offset: number;
  pagination: any;
};

type IndexProps = {
  // classes: any;
  page: number;
  perPage: number;
  totalElements: number;
  orderBy?: string;
  fetchAllUser: any;
  users: any;
  totalPages: number;
  fetchAllUserPending: any;
};

class Index extends React.Component<IndexProps, IndexState> {
  constructor(props: any) {
    super(props);
    this.state = { offset: 0, pagination: {} };
  }

  componentDidMount() {
    const { page, perPage, orderBy } = this.props;
    let currentOffset = (page - 1) * perPage;
    this.handleClick(currentOffset);
  }

  updateUrlParmas(page: number, perPage: number, orderBy: string) {
    if (history.pushState) {
      let url = `${window.location.protocol}//${window.location.host}${window.location.pathname}?page=${page}&perPage=${perPage}&orderBy=${orderBy}`;
      window.history.pushState(
        {
          path: url
        },
        "",
        url
      );
    }
  }

  /**
   * Handle pagination click
   *
   * @param {*} offset
   */
  handleClick(offset: number) {
    const { perPage, orderBy, fetchAllUser } = this.props;
    let page = offset / this.props.perPage + 1;
    this.setState({ offset });
    this.updateUrlParmas(page, perPage, orderBy);
    fetchAllUser(page, perPage, orderBy);
  }

  handleTableChange = (pagination: any, filters: any, sorter: any) => {
    const { fetchAllUser } = this.props;
    const pager = { ...this.state.pagination };
    pager.current = pagination.current;
    this.setState({
      pagination: pager
    });
    // this.fetch({
    //   results: pagination.pageSize,
    //   page: pagination.current,
    //   sortField: sorter.field,
    //   sortOrder: sorter.order,
    //   ...filters,
    // });
    fetchAllUser(pagination.current, pagination.pageSize, "id");
  };

  render() {
    const {
      users,
      // classes,
      perPage,
      totalPages,
      fetchAllUserPending,
      totalElements
    } = this.props;

    const theme = createMuiTheme({
      // typography: {
      //   useNextVariants: true
      // }
    });

    const onDeleteClick = (user: any) => {
      window.location.href = "/users/" + user.id;
    };

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
          <Table
            columns={columns}
            dataSource={users}
            rowKey={record => record.id}
            pagination={{
              defaultPageSize: 10,
              showSizeChanger: true,
              pageSizeOptions: ["10", "20", "30"],
              total: totalElements
            }}
            onChange={this.handleTableChange}
            loading={fetchAllUserPending}
          />
        </Content>
        <Footer></Footer>
      </Layout>

      // <div className={classes.productsContainer}>
      //   <main className={classes.content}>
      //     <Grid className={classes.prodcutContainer}>
      //       <Grid item xs={1} lg={2}></Grid>
      //       <Grid item xs={10} lg={12}>
      //         <Grid>
      //           <Grid item xs={12}>
      //             <SubToolBar title="User" href="/users/new" />
      //           </Grid>

      //           {fetchAllUserPending ? (
      //             <CircularProgress />
      //           ) : (
      //             <Grid item xs={12}>
      //               <Table className={classes.table} aria-label="simple table">
      //                 <TableHead>
      //                   <TableRow>
      //                     <TableCell>ID</TableCell>
      //                     <TableCell align="right">User Name</TableCell>
      //                     <TableCell align="right">Email</TableCell>
      //                     <TableCell align="right">Action</TableCell>
      //                   </TableRow>
      //                 </TableHead>
      //                 <TableBody>
      //                   {Array.isArray(users) &&
      //                     users.map((user, index) => (
      //                       <TableRow key={index}>
      //                         <TableCell component="th" scope="row">
      //                           <a
      //                             className={classes.idClick}
      //                             onClick={() => {
      //                               onDeleteClick(user);
      //                             }}
      //                           >
      //                             {user.id}
      //                           </a>
      //                         </TableCell>
      //                         <TableCell align="right">
      //                           {user.username}
      //                         </TableCell>
      //                         <TableCell align="right">{user.email}</TableCell>
      //                         <TableCell align="right">
      //                           <IconButton
      //                             aria-label="delete"
      //                             className={classes.margin}
      //                             size="small"
      //                             onClick={() => {
      //                               onDeleteClick(user);
      //                             }}
      //                           >
      //                             <DeleteIcon fontSize="inherit" />
      //                           </IconButton>
      //                         </TableCell>
      //                       </TableRow>
      //                     ))}
      //                 </TableBody>
      //               </Table>
      //             </Grid>
      //           )}

      //           <Grid item xs={12}>
      //             <div className={classes.paginationWrapper}>
      //               <MuiThemeProvider theme={theme}>
      //                 <CssBaseline />
      //                 <Pagination
      //                   limit={perPage}
      //                   offset={this.state.offset}
      //                   total={totalPages * perPage}
      //                   onClick={(e, offset) => this.handleClick(offset)}
      //                 />
      //               </MuiThemeProvider>
      //             </div>
      //           </Grid>
      //         </Grid>
      //       </Grid>
      //       <Grid item xs={1} lg={2}></Grid>
      //     </Grid>
      //   </main>
      // </div>
    );
  }
}

export default Index;
