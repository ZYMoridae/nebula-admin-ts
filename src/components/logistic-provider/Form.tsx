import React, { Component } from "react";
import _ from "lodash";

import "../utils/Select.css";
import Constants from "../../utils/Constants";

import debounce from "lodash/debounce";

import { Form, Input, Button, Select, Spin, Checkbox } from "antd";
import { FormComponentProps } from "antd/lib/form/Form";
const { Option } = Select;

interface FormProps extends FormComponentProps {
  logisticProvider?: any;
  mode: string;
  action?: any;
  actionPending?: boolean;
  actionFulfilled?: boolean;
}

class LogisticProviderForm extends React.Component<FormProps> {

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
          let _logisticProvider: any = _.cloneDeep(values);
          console.log(_logisticProvider);

          this.props.action(_logisticProvider);
        } else if (this.props.mode == Constants.FORM.MODE.NEW) {
          // FIXME: Remove Id
          let _logisticProvider: any = _.cloneDeep(values);

          this.props.action(_logisticProvider);
        }

        console.log("Received values of form: ", values);
      }
    });
  };

  render() {
    const { logisticProvider, mode, actionPending, actionFulfilled } = this.props;
    const { getFieldDecorator, getFieldError } = this.props.form;
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

    // const { fetching, data, value } = this.state;

    return (
      <div style={{ maxWidth: "700px" }}>
        <Form {...formItemLayout} onSubmit={this.handleSubmit}>
          {mode == Constants.FORM.MODE.UPDATE && (
            <Form.Item label="Id">
              {getFieldDecorator("id", {
                initialValue: logisticProvider.id,
                rules: [
                  { required: true, message: "Please input your logisticProvidername!" }
                ]
              })(<Input disabled={true} />)}
            </Form.Item>
          )}

          <Form.Item
            label="Name"
            // hasFeedback
            // validateStatus={getFieldError("logisticProvidername") ? "error" : "success"}
          >
            {getFieldDecorator("name", {
              initialValue: logisticProvider ? logisticProvider.name : "",
              rules: [
                { required: true, message: "Please input your name!" }
              ]
            })(<Input />)}
          </Form.Item>


          <Form.Item label="Contact">
            {getFieldDecorator("contact", {
              initialValue: logisticProvider ? logisticProvider.contact : "",
              rules: [{ required: true, message: "Please input your contact!" }]
            })(<Input />)}
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

const WrappedLogisticProviderForm = Form.create<FormProps>({ name: "logistic_provider_form" })(LogisticProviderForm);

export default WrappedLogisticProviderForm;
