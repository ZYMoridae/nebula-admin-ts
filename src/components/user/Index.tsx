import * as React from "react";

// Ant Design
import Footer from "../Footer";
import { Layout, Table, Breadcrumb, Button, Icon } from "antd";

import { Row, Col } from "antd";

const { Content } = Layout;

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
        {/* <a>Invite {record.name}</a>
        <Divider type="vertical" /> */}
        <a>Delete</a>
      </span>
    )
  }
];

type IndexState = {
  offset: number;
  pagination: any;
  selectedRowKeys: Array<any>;
};

type IndexProps = {
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
    this.state = { offset: 0, pagination: {}, selectedRowKeys: [] };
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
    fetchAllUser(pagination.current, pagination.pageSize, "id");
  };

  onSelectChange = (selectedRowKeys: any) => {
    console.log("selectedRowKeys changed: ", selectedRowKeys);
    this.setState({ selectedRowKeys });
  };

  render() {
    const {
      users,
      perPage,
      totalPages,
      fetchAllUserPending,
      totalElements
    } = this.props;

    const onDeleteClick = (user: any) => {
      window.location.href = "/users/" + user.id;
    };

    const rowSelection = {
      selectedRowKeys: this.state.selectedRowKeys,
      onChange: this.onSelectChange
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
          <Row gutter={8} style={{ marginBottom: "8px" }}>
            <Col span={2} offset={22}>
              <Button
                type="primary"
                onClick={() => {
                  window.location.href = "/users/new";
                }}
              >
                <Icon type="plus" />
                Add
              </Button>
            </Col>
          </Row>

          <Table
            rowSelection={rowSelection}
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
    );
  }
}

export default Index;
