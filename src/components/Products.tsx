import * as React from "react";
import Footer from "./Footer";
import { Layout, Table, Divider, Tag, Breadcrumb } from "antd";

const { Header, Content, Sider } = Layout;

const columns = [
  {
    title: "Id",
    dataIndex: "id",
    key: "id",
    render: (text: any, record: any) => (
      <a href={`/products/${record.id}`}>{text}</a>
    )
  },
  {
    title: "Name",
    dataIndex: "name",
    key: "name"
  },
  {
    title: "Category",
    dataIndex: "category",
    key: "category",
    render: (text: any, record: any) => (
      <span>{record.productCategory.name}</span>
    )
  },
  {
    title: "Created At",
    dataIndex: "createdAt",
    key: "createdAt"
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

type ProductsState = {
  offset: number;
  pagination: any;
};

type ProductsProps = {
  totalElements: number;
  perPage: number;
  orderBy: string;
  fetchProductsInfo: any;
  info: any;
  totalPages: number;
  page: number;
  isFetchingProducts: boolean;
  isFetchedProducts: boolean;
};

class Products extends React.Component<ProductsProps, ProductsState> {
  constructor(props: any) {
    super(props);
    this.state = { offset: 0, pagination: {} };
  }

  componentDidMount() {
    const { fetchProductsInfo, page, perPage, orderBy } = this.props;
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

  handleTableChange = (pagination: any, filters: any, sorter: any) => {
    const { fetchProductsInfo } = this.props;
    const pager = { ...this.state.pagination };
    pager.current = pagination.current;
    this.setState({
      pagination: pager
    });
    fetchProductsInfo(pagination.current, pagination.pageSize, "id");
  };

  /**
   * Handle pagination click
   *
   * @param {*} offset
   */
  handleClick(offset: number) {
    const { perPage, orderBy, fetchProductsInfo } = this.props;
    let page = offset / this.props.perPage + 1;
    this.setState({ offset });
    this.updateUrlParmas(page, perPage, orderBy);
    fetchProductsInfo(page, perPage, orderBy);
  }

  render() {
    const {
      info,
      perPage,
      totalPages,
      page,
      isFetchingProducts,
      isFetchedProducts,
      totalElements
    } = this.props;

    const onDeleteClick = (product: any) => {
      window.location.href = "/products/" + product.id;
    };

    return (
      <Layout style={{ padding: "0 24px 24px" }}>
        <Breadcrumb style={{ margin: "16px 0" }}>
          <Breadcrumb.Item>Product</Breadcrumb.Item>
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
            dataSource={info}
            rowKey={record => record.id}
            pagination={{
              defaultPageSize: 10,
              showSizeChanger: true,
              pageSizeOptions: ["10", "20", "30"],
              total: totalElements
            }}
            onChange={this.handleTableChange}
            loading={isFetchingProducts}
          />
        </Content>
        <Footer></Footer>
      </Layout>
    );
  }
}

export default Products;
