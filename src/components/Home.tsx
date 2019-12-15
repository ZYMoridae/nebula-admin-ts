import React, { Component } from "react";
import "react-animated-slider/build/horizontal.css";
import _ from "lodash";
import Footer from "./Footer";
// Ant Design

import {
  Layout,
  Menu,
  Breadcrumb,
  Icon,
  Statistic,
  Row,
  Col,
  Button,
  Card,
  Skeleton
} from "antd";

const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

interface HomeProps {
  fetchAnalytics: any;
  fetchAnalyticsPending: boolean;
  analytics: any;
}

class Home extends React.Component<HomeProps> {
  constructor(props: any) {
    super(props);
  }

  componentDidMount() {
    const { fetchAnalytics } = this.props;
    fetchAnalytics();
  }

  render() {
    const { fetchAnalyticsPending, analytics } = this.props;

    const data = {
      labels: ["January", "February", "March", "April", "May", "June", "July"],
      datasets: [
        {
          label: "My First dataset",
          backgroundColor: "rgba(255,99,132,0.2)",
          borderColor: "rgba(255,99,132,1)",
          borderWidth: 1,
          hoverBackgroundColor: "rgba(255,99,132,0.4)",
          hoverBorderColor: "rgba(255,99,132,1)",
          data: [65, 59, 80, 81, 56, 55, 40]
        }
      ]
    };

    return (
      <Layout style={{ padding: "0 24px 24px" }}>
        <Breadcrumb style={{ margin: "16px 0" }}>
          <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
        </Breadcrumb>
        <Content
          style={{
            background: "#fff",
            padding: 24,
            margin: 0,
            minHeight: 280
          }}
        >
          <div>
            <Row gutter={16}>
              <Col span={12}>
                <Card>
                  {fetchAnalyticsPending ? (
                    <Skeleton />
                  ) : (
                    <Statistic
                      title="Active Users"
                      prefix={<Icon type="user" />}
                      valueStyle={{ color: "#1890ff" }}
                      value={!_.isNil(analytics) ? analytics.activeUsers : 0}
                    />
                  )}
                </Card>
              </Col>
              <Col span={12}>
                <Card>
                  {fetchAnalyticsPending ? (
                    <Skeleton />
                  ) : (
                    <Statistic
                      title="Transaction"
                      prefix={<Icon type="transaction" />}
                      valueStyle={{ color: "#1890ff" }}
                      value={!_.isNil(analytics) ? analytics.transaction : 0}
                    />
                  )}
                </Card>
              </Col>
            </Row>
            <Row gutter={[16, 32]}>
              <Col span={12}>
                <Card>
                  {fetchAnalyticsPending ? (
                    <Skeleton />
                  ) : (
                    <Statistic
                      title="Orders"
                      prefix={<Icon type="shopping-cart" />}
                      valueStyle={{ color: "#1890ff" }}
                      value={!_.isNil(analytics) ? analytics.totalOrders : 0}
                    />
                  )}
                </Card>
              </Col>
            </Row>
          </div>
        </Content>
        <Footer></Footer>
      </Layout>
    );
  }
}

export default Home;
