import * as React from "react";
import _ from "lodash";

import Constants from "../../utils/Constants";
import Form from "./Form";

// Ant Design
import Footer from "../Footer";
import { Layout, Breadcrumb } from "antd";

const { Content } = Layout;

type EditProps = {
  fetchUser: any;
  id: number;
  user: any;
  fetchUserPending: boolean;
  fetchUserFulfilled: boolean;
  updateUser: any;
  updateUserPending: boolean;
  updateUserFulfilled: boolean;
};

class Edit extends React.Component<EditProps> {
  componentDidMount() {
    const { fetchUser, id } = this.props;
    fetchUser(id);
  }

  render() {
    const {
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
          <Breadcrumb.Item>Update</Breadcrumb.Item>
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
    );
  }
}

export default Edit;
