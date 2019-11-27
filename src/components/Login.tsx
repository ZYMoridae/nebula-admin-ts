import * as React from "react";
import { fetchAuthInfo } from "../actions";

import { Layout, Form, Icon, Input, Button, Checkbox, Typography } from "antd";
import { FormComponentProps } from "antd/lib/form/Form";
import "antd/dist/antd.css";
import "./LoginForm.css";
import { Row, Col } from "antd";

const { Title } = Typography;

const { Footer } = Layout;

interface LoginProps extends FormComponentProps {
  dispatch: any;
  isFetchedAuth: boolean;
  classes: any;
  info: any;
  hideLoginError: any;
  isShowLoginError: boolean;
}

class Login extends React.Component<LoginProps> {
  handleSubmit = (e: any) => {
    event.preventDefault();

    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.dispatch(
          fetchAuthInfo({
            headers: {
              Authorization: `Basic ${btoa(
                `${values.username}:${values.password}`
              )}`
            }
          })
        );
        console.log("Received values of form: ", values);
      }
    });
  };

  render() {
    const {
      isFetchedAuth,
      classes,
      info,
      hideLoginError,
      isShowLoginError
    } = this.props;

    if (
      sessionStorage.getItem("token") != null &&
      sessionStorage.getItem("token") != "undefined"
    ) {
      location.href = "/home";
    }

    if (isFetchedAuth && this.props.info.token != undefined) {
      sessionStorage.setItem("token", this.props.info.token);
      location.href = "/home";
    }

    const { getFieldDecorator } = this.props.form;
    return (
      <Row id="form-container" type="flex" justify="center">
        <Col span={4}>
          <Form onSubmit={this.handleSubmit} className="login-form">
            <Title className="login-title" level={4}>Plato Admin</Title>
            <Form.Item>
              {getFieldDecorator("username", {
                rules: [
                  { required: true, message: "Please input your username!" }
                ]
              })(
                <Input
                  prefix={
                    <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                  }
                  placeholder="Username"
                />
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator("password", {
                rules: [
                  { required: true, message: "Please input your Password!" }
                ]
              })(
                <Input
                  prefix={
                    <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
                  }
                  type="password"
                  placeholder="Password"
                />
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator("remember", {
                valuePropName: "checked",
                initialValue: true
              })(<Checkbox>Remember me</Checkbox>)}
              <a className="login-form-forgot" href="">
                Forgot password
              </a>
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
              >
                Log in
              </Button>
              {/* Or <a href="">register now!</a> */}
              <Footer style={{ textAlign: "center" }}>
                Plato Tech ©{new Date().getFullYear()}
              </Footer>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    );
  }
}

const WrappedLoginForm = Form.create({ name: "normal_login" })(Login);
export default WrappedLoginForm;
