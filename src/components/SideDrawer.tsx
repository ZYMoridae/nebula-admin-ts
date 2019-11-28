import * as React from "react";
import _ from "lodash";

// Ant Design
import { Layout, Menu, Icon } from "antd";
import "./SideDrawer.css";

const { SubMenu } = Menu;
const { Sider } = Layout;

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
    path: "/users",
    key: 2,
    subKey: "sub1"
  },
  {
    name: "Teacher",
    path: "/teachers",
    key: 3,
    subKey: "sub1"
  },
  {
    name: "Role",
    path: "/roles",
    key: 4,
    subKey: "sub1"
  }
];

const productBlock = [
  {
    name: "Product",
    path: "/products",
    key: 5,
    subKey: "sub2"
  },
  {
    name: "Product Category",
    path: "/products/categories",
    key: 6,
    subKey: "sub2"
  },
  {
    name: "Class",
    path: "/classes",
    key: 8,
    subKey: "sub2"
  }
];

const skuBlock = [
  {
    name: "Sku Category",
    path: "/skus/attributes/categories",
    key: 7,
    subKey: "sub3"
  }
];

const supportBlock = [
  {
    name: "Order",
    path: "/orders",
    key: 9
  },
  {
    name: "Invoice",
    path: "/invoices",
    key: 10
  },
  {
    name: "Shipper",
    path: "/shippers",
    key: 11
  },
  {
    name: "Membership",
    path: "/memberships",
    key: 12
  }
];

type SideDrawerState = {
  selectedKeys: Array<any>;
  collapsed: boolean;
  openKeys: Array<any>;
};

type SideDrawerProps = {};

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
    // console.log(collapsed);
    this.setState({ collapsed });
  };

  componentDidMount() {
    // this.checkSelectedItem();
    // console.log(this.state);
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
      ...skuBlock,
      ...productBlock,
      ...supportBlock
    ];

    let i = 0;

    let selectedKeys: any = [];
    let openKeys: any = [];

    for (i = 0; i < allItems.length; i++) {
      // console.log(window.location.pathname, allItems[i].path);
      if (window.location.pathname === allItems[i].path) {
        selectedKeys = [`${allItems[i].key}`];
        openKeys = [allItems[i].subKey];
        // console.log(selectedKeys, openKeys);
        // this.setState({
        //   selectedKeys,
        //   openKeys
        // });
        // console.log(this.state);
        break;
      }
      if (window.location.pathname.startsWith(`${allItems[i].path}`)) {
        selectedKeys = [`${allItems[i].key}`];
        openKeys = [allItems[i].subKey];
        // console.log(selectedKeys, openKeys);

        // console.log(this.state);
        // break;
      }
    }

    this.setState({
      selectedKeys,
      openKeys
    });
  }

  render() {
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

    // console.log(this.state);
    return (
      <Sider
        collapsible
        collapsed={this.state.collapsed}
        onCollapse={this.onCollapse}
      >
        <div className="logo">Plato</div>
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
                <Icon type="shopping" />
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
          <SubMenu
            key="sub3"
            title={
              <span>
                <Icon type="hdd" />
                <span>Sku</span>
              </span>
            }
          >
            {skuBlock.map((item, index) => (
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
              <Icon type="container" />
              <span>{item.name}</span>
            </Menu.Item>
          ))}
        </Menu>
      </Sider>
    );
  }
}

export default SideDrawer;
