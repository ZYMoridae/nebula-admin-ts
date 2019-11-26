import * as React from "react";
import Routes from "../utils/Routes";

import { withTranslation, WithTranslation } from "react-i18next";

import Utils from "../utils/Utils";
import "./HeaderBar.css";
import _ from "lodash";

// Ant design

import { Layout, Menu, Avatar, Dropdown } from "antd";

const { Header } = Layout;

type AppHeadBarState = {};

type AppHeadBarProps = {
  t: any;
};

class AppHeadBar extends React.Component<
  AppHeadBarProps & WithTranslation,
  AppHeadBarState
> {
  render() {
    const { t } = this.props;

    return (
      <Header className="header">
        <Dropdown overlay={menu} trigger={["click"]}>
          <Avatar
            style={{
              color: "#f56a00",
              backgroundColor: "#fde3cf",
              marginRight: "8px"
            }}
          >
            {_.capitalize(Utils.getCurrentUser().user.firstname.charAt(0))}
          </Avatar>
        </Dropdown>
      </Header>
    );
  }
}

const handleLogout = () => {
  sessionStorage.removeItem("user");
  sessionStorage.removeItem("token");
  location.href = Routes.USER.LOGIN;
};

const menu = (
  <Menu>
    <Menu.Item key="0">
      <a href="http://www.alipay.com/">My Profile</a>
    </Menu.Item>
    <Menu.Item key="1">
      <a href="http://www.taobao.com/">Vouchers</a>
    </Menu.Item>
    <Menu.Divider />
    <Menu.Item key="3" onClick={handleLogout}>
      Log Out
    </Menu.Item>
  </Menu>
);

export default withTranslation()(AppHeadBar);
