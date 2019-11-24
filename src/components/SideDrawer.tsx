import * as React from "react";
import { withStyles } from "@material-ui/core/styles";

import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";

import PersonRoundedIcon from "@material-ui/icons/PersonRounded";
import HomeRoundedIcon from "@material-ui/icons/HomeRounded";
import DescriptionRoundedIcon from "@material-ui/icons/DescriptionRounded";
import ClassRoundedIcon from "@material-ui/icons/ClassRounded";
import CardMembershipRoundedIcon from "@material-ui/icons/CardMembershipRounded";
import LocalShippingRoundedIcon from "@material-ui/icons/LocalShippingRounded";
import ShoppingCartRoundedIcon from "@material-ui/icons/ShoppingCartRounded";
import VerifiedUserRoundedIcon from "@material-ui/icons/VerifiedUserRounded";
import SchoolRoundedIcon from "@material-ui/icons/SchoolRounded";
import CategoryRoundedIcon from "@material-ui/icons/CategoryRounded";
import LocalGroceryStoreRoundedIcon from "@material-ui/icons/LocalGroceryStoreRounded";

import { Theme, createStyles } from "@material-ui/core";

import Constants from "../utils/Constants";
import NebulaIcon from "./NebulaIcon";

import _ from "lodash";

import { USER, VENDOR, TEACHER, ADMIN } from "../utils/Role";

// Ant Design
import { Layout, Menu, Breadcrumb, Icon } from "antd";
import "./SideDrawer.css";

const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

const drawerWidth = Constants.styles.sidebar.width;

const styles = (theme: Theme) =>
  createStyles({
    drawer: {
      width: drawerWidth,
      flexShrink: 0
    },
    drawerPaper: {
      width: drawerWidth
    },
    toolbar: {
      height: 64
    },
    itemText: {
      fontSize: "12px",
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif'
    }
  });

const homeBlock = [
  {
    name: "Home",
    path: "/home",
    key: 1
  }
];

const userBlock = [
  {
    name: "User",
    icon: <PersonRoundedIcon fontSize="small" />,
    path: "/users",
    key: 2,
    subKey: "sub1"
  },
  {
    name: "Teacher",
    icon: <SchoolRoundedIcon fontSize="small" />,
    path: "/teachers",
    key: 3,
    subKey: "sub1"
  },
  {
    name: "Role",
    icon: <VerifiedUserRoundedIcon fontSize="small" />,
    path: "/roles",
    key: 4,
    subKey: "sub1"
  }
];

const productBlock = [
  {
    name: "Product",
    icon: <LocalGroceryStoreRoundedIcon fontSize="small" />,
    path: "/products",
    key: 5,
    subKey: "sub2"
  },
  {
    name: "Product Category",
    icon: <CategoryRoundedIcon fontSize="small" />,
    path: "/products/categories",
    key: 6,
    subKey: "sub2"
  },
  {
    name: "Sku Category",
    icon: <CategoryRoundedIcon fontSize="small" />,
    path: "/skus/attributes/categories",
    key: 7,
    subKey: "sub2"
  },
  {
    name: "Class",
    icon: <ClassRoundedIcon fontSize="small" />,
    path: "/classes",
    key: 8,
    subKey: "sub2"
  }
];

const supportBlock = [
  {
    name: "Order",
    icon: <ShoppingCartRoundedIcon fontSize="small" />,
    path: "/orders",
    key: 9
  },
  {
    name: "Invoice",
    icon: <DescriptionRoundedIcon fontSize="small" />,
    path: "/invoices",
    key: 10
  },
  {
    name: "Shipper",
    icon: <LocalShippingRoundedIcon fontSize="small" />,
    path: "/shippers",
    key: 11
  },
  {
    name: "Membership",
    icon: <CardMembershipRoundedIcon fontSize="small" />,
    path: "/memberships",
    key: 12
  }
];

type SideDrawerState = {
  selectedKeys: Array<any>;
  collapsed: boolean;
  openKeys: Array<any>;
};

type SideDrawerProps = {
  classes: any;
};

class SideDrawer extends React.Component<SideDrawerProps, SideDrawerState> {
  constructor(props: any) {
    super(props);
    this.state = {
      collapsed: false,
      selectedKeys: [],
      openKeys: []
    };
  }

  onCollapse = (collapsed: any) => {
    console.log(collapsed);
    this.setState({ collapsed });
  };

  componentDidMount() {
    // this.checkSelectedItem();
    console.log(this.state);
  }

  componentWillMount() {
    this.checkSelectedItem();
  }

  componentDidUpdate() {
    // this.checkSelectedItem();
  }

  checkSelectedItem() {
    const allItems: any = [
      ...homeBlock,
      ...userBlock,
      ...productBlock,
      ...supportBlock
    ];

    let i = 0;
    for (i = 0; i < allItems.length; i++) {
      console.log(allItems[i].path);
      if (window.location.pathname.startsWith(`${allItems[i].path}`)) {
        let selectedKeys = [`${allItems[i].key}`];
        let openKeys = [allItems[i].subKey];
        console.log(selectedKeys, openKeys);
        this.setState({
          selectedKeys,
          openKeys
        });
        console.log(this.state);
        break;
      }
    }
  }


  // handleClick = (e: any) => {
  //   console.log('click ', e);
  //   this.setState({
  //     selectedKeys: e.key,
  //   });
  // };

  render() {
    // const { classes } = this.props;

    const itemClickHandler = (item: any) => {
      if (item.name == "home") {
        window.location.href = "/home";
      } else {
        if (_.isNil(item.path)) {
          window.location.href = `/${item.name.toLowerCase()}s`;
        } else {
          window.location.href = item.path;
        }
      }
    };

    // //FIXME: Use regular expression check the status
    // const checkSelected = (item: any) => {
    //   let isSelected = false;

    //   if (_.isNil(item.path)) {
    //     isSelected = window.location.pathname == `/${item.name.toLowerCase()}s`;
    //   } else {
    //     isSelected = window.location.pathname.startsWith(`${item.path}`);
    //   }

    //   return isSelected;
    // };
    console.log(this.state);
    return (
      // <div>
      //   <Drawer
      //     className={classes.drawer}
      //     variant="permanent"
      //     classes={{
      //       paper: classes.drawerPaper
      //     }}
      //     anchor="left"
      //   >
      //     <div className={classes.toolbar}></div>
      //     <Divider />
      //     <List>
      //       <ListItem
      //         button
      //         selected={checkSelected({
      //           name: "Home"
      //         })}
      //         onClick={() => {
      //           itemClickHandler({
      //             name: "Home"
      //           });
      //         }}
      //       >
      //         <ListItemIcon>
      //           <HomeRoundedIcon fontSize="small" />
      //         </ListItemIcon>
      //         {/* <ListItemText primary="Home" className={classes.itemText}/> */}
      //         <span className={classes.itemText}>Home</span>
      //       </ListItem>
      //     </List>
      //     <Divider />
      //     <List>
      //       {userBlock.map((item, index) => (
      //         <ListItem
      //           button
      //           selected={checkSelected(item)}
      //           key={index}
      //           onClick={() => {
      //             itemClickHandler(item);
      //           }}
      //         >
      //           <ListItemIcon>{item.icon}</ListItemIcon>
      //           <span className={classes.itemText}>{item.name}</span>
      //           {/* <ListItemText primary={item.name} /> */}
      //         </ListItem>
      //       ))}
      //     </List>
      //     <Divider />
      //     <List>
      //       {productBlock.map((item, index) => (
      //         <ListItem
      //           button
      //           key={index}
      //           selected={checkSelected(item)}
      //           onClick={() => {
      //             itemClickHandler(item);
      //           }}
      //         >
      //           <ListItemIcon>{item.icon}</ListItemIcon>
      //           {/* <ListItemText primary={item.name} /> */}
      //           <span className={classes.itemText}>{item.name}</span>
      //         </ListItem>
      //       ))}
      //     </List>
      //     <Divider />
      //     <List>
      //       {supportBlock.map((item, index) => (
      //         <ListItem
      //           button
      //           selected={checkSelected(item)}
      //           key={index}
      //           onClick={() => {
      //             itemClickHandler(item);
      //           }}
      //         >
      //           <ListItemIcon>{item.icon}</ListItemIcon>
      //           {/* <ListItemText primary={item.name} /> */}
      //           <span className={classes.itemText}>{item.name}</span>
      //         </ListItem>
      //       ))}
      //     </List>
      //   </Drawer>
      // </div>
      
      <Sider
        collapsible
        collapsed={this.state.collapsed}
        onCollapse={this.onCollapse}
      >
        <div className="logo" />
        <Menu
          theme="dark"
          defaultSelectedKeys={["1"]}
          mode="inline"
          selectedKeys={this.state.selectedKeys}
          defaultOpenKeys={this.state.openKeys}
          // onClick={this.handleClick}
        >
          <Menu.Item key="1">
            <Icon type="pie-chart" />
            <span>Home</span>
          </Menu.Item>
          {/* <Menu.Item key="2">
          <Icon type="desktop" />
          <span>User Management</span>
        </Menu.Item> */}
          <SubMenu
            key="sub1"
            title={
              <span>
                <Icon type="user" />
                <span>User</span>
              </span>
            }
          >
            {userBlock.map((item, index) => (
              <Menu.Item
                key={item.key}
                onClick={() => {
                  itemClickHandler(item);
                }}
              >
                {item.name}
              </Menu.Item>
            ))}

            {/* <Menu.Item key="3">User</Menu.Item>
            <Menu.Item key="4">Teacher</Menu.Item>
            <Menu.Item key="5">Role</Menu.Item> */}
          </SubMenu>
          <SubMenu
            key="sub2"
            title={
              <span>
                <Icon type="team" />
                <span>Product</span>
              </span>
            }
          >
            {productBlock.map((item, index) => (
              <Menu.Item
                key={item.key}
                onClick={() => {
                  itemClickHandler(item);
                }}
              >
                {item.name}
              </Menu.Item>
            ))}
          </SubMenu>
          {supportBlock.map((item, index) => (
            <Menu.Item
              key={item.key}
              onClick={() => {
                itemClickHandler(item);
              }}
            >
              <Icon type="file" />
              <span>{item.name}</span>
            </Menu.Item>
          ))}
        </Menu>
      </Sider>
    );
  }
}

export default withStyles(styles)(SideDrawer);
