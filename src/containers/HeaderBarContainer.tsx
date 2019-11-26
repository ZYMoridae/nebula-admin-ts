import * as React from "react";
import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";
import Badge from "@material-ui/core/Badge";
import MenuItem from "@material-ui/core/MenuItem";
// import Menu from "@material-ui/core/Menu";
import { fade } from "@material-ui/core/styles/colorManipulator";
import { withStyles } from "@material-ui/core/styles";
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MailIcon from "@material-ui/icons/Mail";
import NotificationsIcon from "@material-ui/icons/Notifications";
import MoreIcon from "@material-ui/icons/MoreVert";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import NebulaIcon from "../components/NebulaIcon";
import Routes from "../utils/Routes";

import { withTranslation, WithTranslation } from "react-i18next";

import Constants from "../utils/Constants";

import { Theme, createStyles } from "@material-ui/core";

import "./HeaderBar.css";

const drawerWidth = Constants.styles.sidebar.width;

// Ant design

import { Layout, Menu, Breadcrumb, Icon, Avatar, Dropdown } from "antd";

const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

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
            U
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
