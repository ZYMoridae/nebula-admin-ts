import * as React from "react";
import _ from "lodash";

import { Form, Input, Button, Select, Spin, Checkbox } from "antd";
import { FormComponentProps } from "antd/lib/form/Form";
import Constants from "./../../utils/Constants";
import debounce from "lodash/debounce";
const { TextArea } = Input;
const { Option } = Select;
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

  fetchCategories = debounce((value: any) => {
    if (value === "") {
      this.setState({ data: [], isFetchingCategory: false });
    } else {
      this.setState({ data: [], isFetchingCategory: true });
      let token = sessionStorage.getItem("token");
      fetch(`/api/product-categories${"?keyword=" + value}`, {
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
            : body._embedded.productCategoryList.map((item: any) => ({
                text: `${item.name}`,
                value: item.id
              }));
          this.setState({ data, isFetchingCategory: false });
        });
    }
  }, 800);

  handleCategoryChange = (value: any) => {
    console.log(value);

    this.setState({
      data: [],
      isFetchingCategory: false
    });

    console.warn(this.props.form);


    this.props.form.setFieldsValue({
      productCategory: value
    });
  };

  state: any = {
    data: [],
    productCategory: [],
    isFetchingCategory: false
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
    const { isFetchingCategory, data, productCategory } = this.state;
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

          <Form.Item label="Role">
            {getFieldDecorator("roles", {
              initialValue: product
                ? {
                    key: product.productCategory.id,
                    label: product.productCategory.name
                  }
                : [],
              rules: [
                { required: true, message: "Please input your category!" }
              ]
            })(
              <Select
                allowClear={true}
                style={{ width: "100%" }}
                // value={this.props.form.getFieldValue("roles")}
                labelInValue
                mode="multiple"  
                placeholder="Select roles"
                filterOption={false}
                onSearch={this.fetchCategories}
                onChange={this.handleCategoryChange}
                notFoundContent={
                  isFetchingCategory ? <Spin size="small" /> : null
                }
              >
                {data.map((d: any) => (
                  <Option key={d.value}>{d.text}</Option>
                ))}
              </Select>
            )}
          </Form.Item>
        </Form>
      </div>
    );
  }
}

const WrappedProductForm = Form.create<FormProps>({
  name: "product_form"
})(ProductForm);

export default WrappedProductForm;
