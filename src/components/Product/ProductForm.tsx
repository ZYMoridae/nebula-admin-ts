import * as React from "react";
import _ from "lodash";

import { Form, Input, Button, Select, Spin, Checkbox } from "antd";
import { FormComponentProps } from "antd/lib/form/Form";
import Constants from "./../../utils/Constants";

const { TextArea } = Input;

interface FormProps extends FormComponentProps {
  product?: any;
  mode: string;
  action?: any;
  actionPending?: boolean;
  actionFulfilled?: boolean;
}

class ProductForm extends React.Component<FormProps> {
  handleSubmit = (e: any) => {
    event.preventDefault();

    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        if (this.props.mode == Constants.FORM.MODE.UPDATE) {
        } else if (this.props.mode == Constants.FORM.MODE.NEW) {
        }

        console.log("Received values of form: ", values);
      }
    });
  };

  render() {
    const { mode, product } = this.props;
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

    return (
      <div style={{ maxWidth: "700px" }}>
        <Form {...formItemLayout} onSubmit={this.handleSubmit}>
          {mode == Constants.FORM.MODE.UPDATE && (
            <Form.Item label="Id">
              {getFieldDecorator("id", {
                initialValue: product.id,
                rules: [
                  { required: true, message: "Please input your username!" }
                ]
              })(<Input disabled={true} />)}
            </Form.Item>
          )}

          <Form.Item label="Name">
            {getFieldDecorator("name", {
              initialValue: product ? product.name : "",
              rules: [
                { required: true, message: "Please input your last name!" }
              ]
            })(<Input />)}
          </Form.Item>

          <Form.Item label="Description">
            {getFieldDecorator("description", {
              initialValue: product ? product.description : "",
              rules: [
                {
                  required: true,
                  message: "Please input your last description!"
                }
              ]
            })(<TextArea rows={4} />)}
          </Form.Item>
        </Form>

        {/* <Form.Item label="Role">
            {getFieldDecorator("roles", {
              initialValue: user
                ? user.roles.map((role: any) => {
                    return {
                      key: role.id,
                      label: role.code
                    };
                  })
                : [],
              rules: [{ required: true, message: "Please input your category!" }]
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
          </Form.Item> */}
      </div>
    );
  }
}

const WrappedProductForm = Form.create<FormProps>({
  name: "product_form"
})(ProductForm);

export default WrappedProductForm;
