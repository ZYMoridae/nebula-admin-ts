import React, { Component } from "react";
import _ from "lodash";

import "../utils/Select.css";
import Constants from "./../../utils/Constants";

import debounce from "lodash/debounce";

import { Form, Input, Button, Select, Spin, Checkbox } from "antd";
import { FormComponentProps } from "antd/lib/form/Form";
const { Option } = Select;

interface FormProps extends FormComponentProps {
  user?: any;
  mode: string;
  action?: any;
  actionPending?: boolean;
  actionFulfilled?: boolean;
}

class UserForm extends React.Component<FormProps> {
  fetchRoles = debounce((value: any) => {
    if (value === "") {
      this.setState({ data: [], fetching: false });
    } else {
      this.setState({ data: [], fetching: true });
      let token = sessionStorage.getItem("token");
      fetch(`/api/users/roles${"?keyword=" + value}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json"
        }
      })
        .then(response => response.json())
        .then(body => {
          const data = _.isNil(body._embedded)
            ? []
            : body._embedded.roleList.map((item: any) => ({
                text: `${item.code}`,
                value: item.id
              }));
          this.setState({ data, fetching: false });
        });
    }
  }, 800);

  handleChange = (value: any) => {
    console.log(value);

    this.setState({
      data: [],
      fetching: false
    });

    console.warn(this.props.form);

    this.props.form.setFieldsValue({
      roles: value
    });
  };

  handleSubmit = (e: any) => {
    event.preventDefault();

    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        if (this.props.mode == Constants.FORM.MODE.UPDATE) {
          let _user: any = _.cloneDeep(values);
          console.log(_user);

          _user.roles = _user.roles.map((roleOption: any) => {
            return {
              id: roleOption.key,
              code: roleOption.label
            };
          });

          this.props.action(_user);
        } else if (this.props.mode == Constants.FORM.MODE.NEW) {
          // FIXME: Remove Id
          let _user: any = _.cloneDeep(values);

          _user.roles = _user.roles.map((roleOption: any) => {
            return {
              id: roleOption.key,
              code: roleOption.label
            };
          });

          if (!this.state.showPasswordField) {
            _user.password = `welcome@${new Date().getFullYear()}`;
          }

          this.props.action(_user);
        }

        console.log("Received values of form: ", values);
      }
    });
  };

  state: any = {
    data: [],
    value: [],
    fetching: false,
    showPasswordField: false
  };

  onChange = (e: any) => {
    this.setState({
      showPasswordField: !e.target.checked
    });
  };

  render() {
    const { user, mode, actionPending, actionFulfilled } = this.props;
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 }
      }
    };

    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0
        },
        sm: {
          span: 16,
          offset: 8
        }
      }
    };

    const { fetching, data, value } = this.state;

    return (
      <div style={{ maxWidth: "700px" }}>
        <Form {...formItemLayout} onSubmit={this.handleSubmit}>
          {mode == Constants.FORM.MODE.UPDATE && (
            <Form.Item label="Id">
              {getFieldDecorator("id", {
                initialValue: user.id,
                rules: [
                  { required: true, message: "Please input your username!" }
                ]
              })(<Input disabled={true} />)}
            </Form.Item>
          )}

          <Form.Item label="Username">
            {getFieldDecorator("username", {
              initialValue: user ? user.username : "",
              rules: [
                { required: true, message: "Please input your username!" }
              ]
            })(<Input />)}
          </Form.Item>

          {mode == Constants.FORM.MODE.NEW && (
            <div>
              <Form.Item {...tailFormItemLayout}>
                {getFieldDecorator("useDefaultPwd", {
                  initialValue: true,
                  valuePropName: "checked",
                  rules: []
                })(
                  <Checkbox onChange={this.onChange}>
                    User default password
                  </Checkbox>
                )}
              </Form.Item>

              {this.state.showPasswordField && (
                <Form.Item label="Password">
                  {getFieldDecorator("password", {
                    initialValue: "",
                    rules: [
                      { required: true, message: "Please input your password!" }
                    ]
                  })(<Input />)}
                </Form.Item>
              )}
            </div>
          )}

          <Form.Item label="Email">
            {getFieldDecorator("email", {
              initialValue: user ? user.email : "",
              rules: [{ required: true, message: "Please input your email!" }]
            })(<Input />)}
          </Form.Item>
          <Form.Item label="Telephone">
            {getFieldDecorator("telephone", {
              initialValue: user ? user.telephone : "",
              rules: [
                { required: true, message: "Please input your telephone!" }
              ]
            })(<Input />)}
          </Form.Item>
          <Form.Item label="Gender">
            {getFieldDecorator("gender", {
              initialValue: user ? user.gender : "M",
              rules: [{ required: true, message: "Please input your gender!" }]
            })(
              <Select style={{ width: "100%" }}>
                <Option value="M">Male</Option>
                <Option value="F">Female</Option>
              </Select>
            )}
          </Form.Item>
          <Form.Item label="First Name">
            {getFieldDecorator("firstname", {
              initialValue: user ? user.firstname : "",
              rules: [
                { required: true, message: "Please input your first name!" }
              ]
            })(<Input />)}
          </Form.Item>
          <Form.Item label="Last Name">
            {getFieldDecorator("lastname", {
              initialValue: user ? user.lastname : "",
              rules: [
                { required: true, message: "Please input your last name!" }
              ]
            })(<Input />)}
          </Form.Item>
          <Form.Item label="Address1">
            {getFieldDecorator("address1", {
              initialValue: user ? user.address1 : "",
              rules: [
                { required: true, message: "Please input your address1!" }
              ]
            })(<Input />)}
          </Form.Item>
          <Form.Item label="Address2">
            {getFieldDecorator("address2", {
              initialValue: user ? user.address2 : "",
              rules: [
                { required: true, message: "Please input your address2!" }
              ]
            })(<Input />)}
          </Form.Item>
          <Form.Item label="Role">
            {getFieldDecorator("roles", {
              initialValue: user
                ? user.roles.map((role: any) => {
                    return {
                      key: role.id,
                      label: role.code
                    };
                  })
                : [],
              rules: [{ required: true, message: "Please input your roles!" }]
            })(
              <Select
                allowClear={true}
                style={{ width: "100%" }}
                // value={this.props.form.getFieldValue("roles")}
                labelInValue
                mode="multiple"
                placeholder="Select roles"
                filterOption={false}
                onSearch={this.fetchRoles}
                onChange={this.handleChange}
                notFoundContent={fetching ? <Spin size="small" /> : null}
              >
                {data.map((d: any) => (
                  <Option key={d.value}>{d.text}</Option>
                ))}
              </Select>
            )}
          </Form.Item>
          <Form.Item {...tailFormItemLayout}>
            <Button type="primary" htmlType="submit" loading={actionPending}>
              Save
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}

const WrappedUserForm = Form.create<FormProps>({ name: "user_form" })(UserForm);

export default WrappedUserForm;
