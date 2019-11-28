import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Fade from "@material-ui/core/Fade";
import Grid from "@material-ui/core/Grid";
import _ from "lodash";
import { Theme, createStyles } from "@material-ui/core";
// import Typography from "@material-ui/core/Typography";

import TextField from "@material-ui/core/TextField";
// import Button from "@material-ui/core/Button";
import AsyncSelect from "react-select/async";

import Routes from "../../utils/Routes";
import Utils from "../../utils/Utils";

import "../utils/Select.css";
import Constants from "./../../utils/Constants";
import ZTextField from "../utils/form/ZTextField";

import ZValidator from "../utils/form/ZValidator";
// import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";

import debounce from "lodash/debounce";

import {
  Layout,
  Form,
  Icon,
  Input,
  Button,
  Checkbox,
  Typography,
  Select,
  Spin
} from "antd";
import { FormComponentProps } from "antd/lib/form/Form";
import { Row, Col } from "antd";
const { Option } = Select;

const styles = (theme: Theme) =>
  createStyles({
    reactSelect: {
      marginTop: "8px",
      height: "43px"
    },
    resetButton: {
      width: "100%"
    }
  });

interface FormState {
  data: Array<any>;
  fetching: boolean;
}

interface FormProps extends FormComponentProps {
  user?: any;
  mode: string;
  action?: any;
  actionPending?: boolean;
  actionFulfilled?: boolean;
}

class UserForm extends React.Component<FormProps> {
  // constructor(props: any) {
  //   super(props);
  //   this.state = {
  //     username: "",
  //     email: "",
  //     id: -1,
  //     firstname: "",
  //     lastname: "",
  //     address1: "",
  //     address2: "",
  //     telephone: "",
  //     genderOptions: [],
  //     roleOptions: [],
  //     gender: "",
  //     validationErrors: {},
  //     isFormValid: true,
  //     useDefaultPwd: true,
  //     password: ""
  //   };
  // }
  // componentDidMount() {
  //   const { user, mode } = this.props;
  //   if (mode != "new") {
  //     console.log(user);
  //     let roleOptions = user.roles.map((role: any) => {
  //       return {
  //         value: role.id,
  //         label: role.code
  //       };
  //     });
  //     console.log(roleOptions);
  //     this.setState({
  //       username: user.username,
  //       email: user.email,
  //       id: user.id,
  //       gender: user.gender,
  //       firstname: user.firstname,
  //       lastname: user.lastname,
  //       address1: user.address1,
  //       address2: user.address2,
  //       telephone: user.telephone,
  //       genderOptions: [
  //         {
  //           value: user.gender,
  //           label: user.gender.toUpperCase()
  //         }
  //       ],
  //       roleOptions: roleOptions,
  //       validationErrors: {}
  //     });
  //   }
  // }

  // handleChange(event: any) {
  //   let {
  //     target: { name, value }
  //   } = event;

  //   if (name === "useDefaultPwd") {
  //     value = event.target.checked;
  //   }

  //   // Ref: https://github.com/DefinitelyTyped/DefinitelyTyped/issues/26635
  //   this.setState({ [name]: value } as Pick<FormState, keyof FormState>, () => {
  //     // this.validateForm(name);
  //   });
  // }

  // validateForm(field: string) {
  //   if (field === "username") {
  //     if (_.isNil(this.state.username) || this.state.username === "") {
  //       this.setFormError("username", "Username can not by empty!");
  //     } else {
  //       this.setFormError("username", undefined);
  //     }
  //   }

  //   if (field === "email") {
  //     if (_.isNil(this.state.email) || this.state.email === "") {
  //       this.setFormError("email", "Email can not by empty!");
  //     } else {
  //       this.setFormError("email", undefined);
  //     }
  //   }
  // }

  // validationCallback({
  //   name,
  //   isValid,
  //   errorMsg
  // }: {
  //   name: string;
  //   isValid: boolean;
  //   errorMsg: string;
  // }) {
  //   this.setFormError(name, errorMsg);

  //   let prevValidationErrors = this.state.validationErrors;

  //   prevValidationErrors[name] = isValid;

  //   let isFormValid = true;

  //   Object.keys(prevValidationErrors).forEach(key => {
  //     isFormValid = isFormValid && prevValidationErrors[key];
  //   });

  //   this.setState({
  //     isFormValid: isFormValid
  //   });
  // }

  // setFormError(field: string, errorMsg: string) {
  //   let next: any = this.state.validationErrors;

  //   next[field] = errorMsg;

  //   this.setState({
  //     validationErrors: next
  //   });
  // }

  // handleSubmit() {
  //   console.log(this.state);
  //   if (!this.state.isFormValid) {
  //     return;
  //   }
  //   if (this.props.mode == Constants.FORM.MODE.UPDATE) {
  //     let _user: any = _.cloneDeep(this.state);
  //     console.log(_user);

  //     if (!_.isNil(_user.genderOptions.value)) {
  //       _user.gender = _user.genderOptions.value;
  //     }

  //     delete _user["genderOptions"];

  //     _user.roles = _user.roleOptions.map((roleOption: any) => {
  //       return {
  //         id: roleOption.value,
  //         code: roleOption.label
  //       };
  //     });

  //     delete _user["roleOptions"];

  //     delete _user["password"];

  //     this.props.action(_user);
  //   }

  //   if (this.props.mode == Constants.FORM.MODE.NEW) {
  //     let _user: any = _.cloneDeep(this.state);
  //     console.log(_user);

  //     if (!_.isNil(_user.genderOptions.value)) {
  //       _user.gender = _user.genderOptions.value;
  //     }

  //     delete _user["genderOptions"];

  //     _user.roles = _user.roleOptions.map((roleOption: any) => {
  //       return {
  //         id: roleOption.value,
  //         code: roleOption.label
  //       };
  //     });

  //     delete _user["roleOptions"];

  //     if (this.state.useDefaultPwd) {
  //       _user.password = `welcome@${new Date().getFullYear()}`;
  //     }

  //     this.props.action(_user);
  //   }
  // }

  // handleGenderOptionChange = (newValue: any) => {
  //   this.setState({
  //     genderOptions: newValue
  //   });
  // };

  // handleRoleOptionChange = (newValue: any) => {
  //   this.setState({
  //     roleOptions: newValue
  //   });
  // };

  // // FIXME Should we load gender dynamically
  // loadGenderOptions = async (inputValue: any, callback: any) => {
  //   return [
  //     {
  //       value: "M",
  //       label: "M"
  //     },
  //     {
  //       value: "F",
  //       label: "F"
  //     }
  //   ];
  // };

  // loadRoleOptions = async (inputValue: any, callback: any) => {
  //   const url = `/api/users/roles${"?keyword=" + inputValue}`;
  //   let token = sessionStorage.getItem("token");

  //   let json: any = [];

  //   try {
  //     let response = await fetch(url, {
  //       method: "GET",
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //         Accept: "application/json"
  //       }
  //     });

  //     let json = await response.json();

  //     if (json.status == 403) {
  //       Utils.logout();
  //       location.href = Routes.USER.LOGIN;
  //       return json;
  //     }

  //     json = json._embedded.roleList.map((item: any) => {
  //       return {
  //         value: item.id,
  //         label: item.code
  //       };
  //     });
  //     console.log(json);
  //     return json;
  //   } catch (error) {
  //     // console.log(error);
  //   }
  //   console.log(json);
  //   return json;
  // };
  // hasError(field: string) {
  //   return !_.isNil(this.state.validationErrors[field]);
  // }

  fetchRoles = debounce((value: any) => {
    if (value === "") {
      this.setState({ data: [], fetching: false });
    } else {
      console.log("fetching user", value);
      // this.lastFetchId += 1;
      // const fetchId = this.lastFetchId;
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
          // if (fetchId !== this.lastFetchId) {
          //   // for fetch callback order
          //   return;
          // }
          // console.log(body);
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
          console.log(_user);

          _user.roles = _user.roles.map((roleOption: any) => {
            return {
              id: roleOption.key,
              code: roleOption.label
            };
          });

          this.props.action(_user);
        }

        console.log("Received values of form: ", values);
      }
    });
  };

  state: any = {
    data: [],
    value: [],
    fetching: false
  };

  // lastFetchId: number = 0;
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
          <Form.Item label="Id">
            {getFieldDecorator("id", {
              initialValue: user.id,
              rules: [
                { required: true, message: "Please input your username!" }
              ]
            })(<Input disabled={true} />)}
          </Form.Item>
          <Form.Item label="Username">
            {getFieldDecorator("username", {
              initialValue: user.username,
              rules: [
                { required: true, message: "Please input your username!" }
              ]
            })(<Input />)}
          </Form.Item>
          <Form.Item label="Email">
            {getFieldDecorator("email", {
              initialValue: user.email,
              rules: [{ required: true, message: "Please input your email!" }]
            })(<Input />)}
          </Form.Item>
          <Form.Item label="Telephone">
            {getFieldDecorator("telephone", {
              initialValue: user.telephone,
              rules: [
                { required: true, message: "Please input your telephone!" }
              ]
            })(<Input />)}
          </Form.Item>
          <Form.Item label="Gender">
            {getFieldDecorator("gender", {
              initialValue: user.gender,
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
              initialValue: user.firstname,
              rules: [
                { required: true, message: "Please input your first name!" }
              ]
            })(<Input />)}
          </Form.Item>
          <Form.Item label="Last Name">
            {getFieldDecorator("lastname", {
              initialValue: user.lastname,
              rules: [
                { required: true, message: "Please input your last name!" }
              ]
            })(<Input />)}
          </Form.Item>
          <Form.Item label="Address1">
            {getFieldDecorator("address1", {
              initialValue: user.address1,
              rules: [
                { required: true, message: "Please input your address1!" }
              ]
            })(<Input />)}
          </Form.Item>
          <Form.Item label="Address2">
            {getFieldDecorator("address2", {
              initialValue: user.address2,
              rules: [
                { required: true, message: "Please input your address2!" }
              ]
            })(<Input />)}
          </Form.Item>
          <Form.Item label="Role">
            {getFieldDecorator("roles", {
              initialValue: user.roles.map((role: any) => {
                return {
                  key: role.id,
                  label: role.code
                };
              }),
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
            <Button type="primary" htmlType="submit">
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
