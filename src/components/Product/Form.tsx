import * as React from "react";
import _ from "lodash";

import {
  Form,
  Input,
  Button,
  Select,
  Spin,
  Checkbox,
  Icon,
  Typography,
  Collapse,
  Badge
} from "antd";
import { FormComponentProps } from "antd/lib/form/Form";
import Constants from "./../../utils/Constants";
import debounce from "lodash/debounce";
const { TextArea } = Input;
const { Option } = Select;
const { Text } = Typography;
const { Panel } = Collapse;
interface FormProps extends FormComponentProps {
  product?: any;
  mode: string;
  action?: any;
  actionPending?: boolean;
  actionFulfilled?: boolean;
}

let id = 0;

class ProductForm extends React.Component<FormProps> {
  // componentWillMount() {
  //   const { product, mode } = this.props;

  //   const { getFieldDecorator, setFieldsValue } = this.props.form;

  //   console.log(product);

  // }

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
    isFetchingCategory: false,
    data2: [],
    isFetchingSkuAttributeCategory: false
  };

  remove = (k: any) => {
    const { form } = this.props;
    // can use data-binding to get
    const keys = form.getFieldValue("keys");
    // We need at least one passenger
    if (keys.length === 1) {
      return;
    }

    // can use data-binding to set
    form.setFieldsValue({
      keys: keys.filter((key: any) => key !== k)
    });
  };

  add = () => {
    const { form } = this.props;
    // can use data-binding to get
    const keys = form.getFieldValue("keys");
    const nextKeys = keys.concat(id++);
    // can use data-binding to set
    // important! notify form to detect changes
    form.setFieldsValue({
      keys: nextKeys
    });
  };

  removeSkuAttribute = (skuIndex: number, k: any, skuAttribute: any) => {
    const { form, product } = this.props;
    // can use data-binding to get
    const keys = form.getFieldValue(`skuAttributekeys[${skuIndex}]`);
    // We need at least one passenger
    if (keys.length === 1) {
      return;
    }

    let fieldName = `skuAttributekeys[${skuIndex}]`;

    let newKeys = keys.filter((key: any) => key !== k);

    // can use data-binding to set
    form.setFieldsValue({
      [fieldName]: newKeys
    });

    if(!_.isNil(skuAttribute)) {
      console.log("sku", product.skus[skuIndex].skuAttributes, skuAttribute.id);
      product.skus[skuIndex].skuAttributes = product.skus[skuIndex].skuAttributes.filter((item: any) => {
        return item.id != skuAttribute.id;
      });
      console.log("afterSku", skuAttribute);
    }
  };

  addSkuAttribute = (skuIndex: number) => {
    const { form } = this.props;
    // can use data-binding to get
    const keys = form.getFieldValue(`skuAttributekeys[${skuIndex}]`);
    const nextKeys = keys.concat(id++);

    let fieldName = `skuAttributekeys[${skuIndex}]`;
    // can use data-binding to set
    // important! notify form to detect changes
    form.setFieldsValue({
      [fieldName]: nextKeys
    });
  };

  fetchSkuAttributeCategories = debounce((value: any) => {
    if (value === "") {
      this.setState({ data2: [], isFetchingSkuAttributeCategory: false });
    } else {
      this.setState({ data2: [], isFetchingSkuAttributeCategory: true });
      let token = sessionStorage.getItem("token");
      fetch(`/api/skus//attributes/categories${"?keyword=" + value}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json"
        }
      })
        .then(response => response.json())
        .then(body => {
          const data2 = _.isNil(body._embedded)
            ? []
            : body._embedded.skuAttributeCategoryList.map((item: any) => ({
                text: `${item.name}`,
                value: item.id
              }));
          this.setState({ data2, isFetchingSkuAttributeCategory: false });
        });
    }
  }, 800);

  handleSkuAttributeCategoryChange = (
    value: any,
    option: any,
    fieldName: string
  ) => {
    this.setState({
      data2: [],
      isFetchingSkuAttributeCategory: false
    });

    console.warn(this.props.form);

    this.props.form.setFieldsValue({
      [fieldName]: value
    });
  };

  renderSkuAttribute(skuIndex: number, sku: any) {
    const {
      getFieldDecorator,
      getFieldValue,
      getFieldsValue
    } = this.props.form;

    const { isFetchingSkuAttributeCategory, data2 } = this.state;

    console.log("sku", sku);

    if (!_.isNil(sku)) {
      let initialValue: any = [];
      let keyInitalValue: any = []

      let currentSkuAttribute = getFieldValue(`sku[${skuIndex}]`);

      console.log("current", currentSkuAttribute);

      sku.skuAttributes.forEach((skuAttribute: any, index: number) => {
        let temp = {
          // name: skuAttribute.name,
          // skuCode: sku.skuCode,
          value: skuAttribute.value
        };

        initialValue.push(temp);
        keyInitalValue.push(index);
        skuAttribute._index = id;
        id++;
      });

      getFieldDecorator(`skuAttributekeys[${skuIndex}]`, { initialValue: keyInitalValue});
      
      // getFieldDecorator("sku", {initialValue: initialValue});
      console.log(this.props.form.getFieldsValue());
    }else {
      getFieldDecorator(`skuAttributekeys[${skuIndex}]`, { initialValue: [] });
    }


    // getFieldDecorator(`skuAttributekeys[${skuIndex}]`, { initialValue: [] });
    const keys = getFieldValue(`skuAttributekeys[${skuIndex}]`);

    console.log("test", keys);

    return (
      <div>
        {keys.map((k: any, index: any) => (
          <div key={k}>
            <Form.Item {...this.tailFormItemLayout}>
              <Badge
                count={index + 1}
                style={{
                  backgroundColor: "#fff",
                  color: "#999",
                  boxShadow: "0 0 0 1px #d9d9d9 inset"
                }}
              />
              <Text style={{ marginLeft: "8px" }}>Sku Attribute</Text>
            </Form.Item>

            {/* <Form.Item label="Name">
              {getFieldDecorator(`sku[${skuIndex}].attribute[${k}].sk`, {
                initialValue: !_.isNil(sku) && !_.isNil(sku.skuAttributes[index]) ? sku.skuAttributes[index].name : "",
                rules: [
                  {
                    required: true,
                    message: "Please input name"
                  }
                ]
              })(<Input />)}
            </Form.Item> */}

            <Form.Item label="Value">
              {getFieldDecorator(`sku[${skuIndex}].attribute[${k}].value`, {
                initialValue: !_.isNil(sku) && !_.isNil(sku.skuAttributes[index]) ? sku.skuAttributes[index].value : "",
                rules: [
                  {
                    required: true,
                    // whitespace: true,
                    message: "Please input value"
                  }
                ]
              })(<Input />)}
            </Form.Item>

            <Form.Item label="Category">
              {getFieldDecorator(
                `sku[${skuIndex}].attribute[${k}].skuAttributeCategory`,
                {
                  rules: [
                    { required: true, message: "Please input your category!" }
                  ]
                }
              )(
                <Select
                  showSearch
                  filterOption={(input: any, option: any) =>
                    option.props.children
                      .toLowerCase()
                      .indexOf(input.toLowerCase()) >= 0
                  }
                  // optionFilterProp="children"
                  allowClear={true}
                  style={{ width: "100%" }}
                  // value={this.props.form.getFieldValue("roles")}
                  labelInValue
                  // mode="multiple"
                  placeholder="Select product category"
                  // filterOption={false}
                  onSearch={this.fetchSkuAttributeCategories}
                  onChange={(value, option) => {
                    this.handleSkuAttributeCategoryChange(
                      value,
                      option,
                      `sku[${skuIndex}].attribute[${k}][skuAttributeCategory]`
                    );
                  }}
                  notFoundContent={
                    isFetchingSkuAttributeCategory ? (
                      <Spin size="small" />
                    ) : null
                  }
                >
                  {data2.map((d: any) => (
                    <Option key={d.value}>{d.text}</Option>
                  ))}
                </Select>
              )}
            </Form.Item>

            <Form.Item {...this.tailFormItemLayout}>
              {keys.length > 1 ? (
                <Button
                  type="danger"
                  onClick={() => this.removeSkuAttribute(skuIndex, k, sku.skuAttributes[index])}
                >
                  Remove
                </Button>
              ) : null}
            </Form.Item>
          </div>
        ))}
      </div>
    );
  }
  tailFormItemLayout = {
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
  formItemLayoutWithOutLabel = {
    wrapperCol: {
      xs: { span: 24, offset: 0 },
      sm: { span: 20, offset: 4 }
    }
  };
  render() {
    const { mode, product } = this.props;
    const { getFieldDecorator, getFieldError, getFieldValue } = this.props.form;

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
    const formItemLayoutWithOutLabel = {
      wrapperCol: {
        xs: { span: 24, offset: 0 },
        sm: { span: 20, offset: 4 }
      }
    };


    if (mode == Constants.FORM.MODE.UPDATE) {
      let initialValue: any = [];
      let keyInitalValue: any = []
      product.skus.forEach((sku: any, index: number) => {
        let temp = {
          price: sku.price,
          // skuCode: sku.skuCode,
          stock: sku.stock
        };

        initialValue.push(temp);
        keyInitalValue.push(index);
        id++;
      });

      getFieldDecorator("keys", { initialValue: keyInitalValue});
      
      // getFieldDecorator("sku", {initialValue: initialValue});
      console.log(this.props.form.getFieldsValue());
    }


    // getFieldDecorator("keys", { initialValue: [] });
    const keys = getFieldValue("keys");

    console.log("form", this.props.form.getFieldsValue());

    // console.log(product);

    // Sku form items
    const skuFormItems = (
      <div>
        {keys.map((k: any, index: any) => (
          <div key={k}>
            <Form.Item {...tailFormItemLayout}>
              <Badge
                count={index + 1}
                style={{
                  backgroundColor: "#fff",
                  color: "#999",
                  boxShadow: "0 0 0 1px #d9d9d9 inset"
                }}
              />
              <Text style={{ marginLeft: "8px" }}>Sku</Text>
            </Form.Item>

            <Form.Item label="Price">
              {getFieldDecorator(`sku[${k}].price`, {
                initialValue: !_.isNil(product.skus[k]) && !_.isNil(product.skus[k].price) ? product.skus[k].price : "",
                rules: [
                  {
                    required: true,
                    message: "Please input price"
                  }
                ]
              })(<Input />)}
            </Form.Item>

            <Form.Item label="Stock">
              {getFieldDecorator(`sku[${k}].stock`, {
                initialValue: !_.isNil(product.skus[k]) && !_.isNil(product.skus[k].stock) ? product.skus[k].stock : "",
                rules: [
                  {
                    required: true,
                    // whitespace: true,
                    message: "Please input stock"
                  }
                ]
              })(<Input />)}
            </Form.Item>

            {this.renderSkuAttribute(k, product.skus[k])}

            <Form.Item {...tailFormItemLayout}>
              <Button
                type="dashed"
                onClick={() => {
                  this.addSkuAttribute(k);
                }}
                style={{ width: "60%" }}
              >
                <Icon type="plus" /> Add Sku Attribute
              </Button>
            </Form.Item>

            <Form.Item {...tailFormItemLayout}>
              {keys.length > 1 ? (
                <Button type="danger" onClick={() => this.remove(k)}>
                  Remove
                </Button>
              ) : null}
            </Form.Item>
          </div>
        ))}
      </div>
    );

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

          <Form.Item
            label="Name"
            // hasFeedback
            // validateStatus={getFieldError("name") ? "error" : "success"}
          >
            {getFieldDecorator("name", {
              initialValue: product ? product.name : "",
              rules: [
                { required: true, message: "Please input your last name!" }
              ]
            })(<Input id="success" />)}
          </Form.Item>

          <Form.Item
            label="Description"
            // hasFeedback
            // validateStatus={getFieldError("description") ? "error" : "success"}
          >
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

          <Form.Item label="Category">
            {getFieldDecorator("productCategory", {
              initialValue: product
                ? {
                    key: product.productCategory.id,
                    label: product.productCategory.name
                  }
                : {},
              rules: [
                { required: true, message: "Please input your category!" }
              ]
            })(
              <Select
                showSearch
                filterOption={(input: any, option: any) =>
                  option.props.children
                    .toLowerCase()
                    .indexOf(input.toLowerCase()) >= 0
                }
                // optionFilterProp="children"
                allowClear={true}
                style={{ width: "100%" }}
                // value={this.props.form.getFieldValue("roles")}
                labelInValue
                // mode="multiple"
                placeholder="Select product category"
                // filterOption={false}
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

          {skuFormItems}

          <Form.Item {...tailFormItemLayout}>
            <Button type="dashed" onClick={this.add} style={{ width: "60%" }}>
              <Icon type="plus" /> Add Sku
            </Button>
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

const WrappedProductForm = Form.create<FormProps>({
  name: "product_form"
})(ProductForm);

export default WrappedProductForm;
