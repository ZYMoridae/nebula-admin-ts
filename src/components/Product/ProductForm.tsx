import * as React from "react";
import ReactDOM from "react-dom";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";

import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import _ from "lodash";

import "react-image-gallery/styles/css/image-gallery.css";
import Paper from "@material-ui/core/Paper";

import Fade from "@material-ui/core/Fade";

import CircularProgress from "@material-ui/core/CircularProgress";

import TextField from "@material-ui/core/TextField";

import AsyncSelect from "react-select/async";

import "./ProductForm.css";
// import "../utils/Form.css";

import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

import AddRoundedIcon from "@material-ui/icons/AddRounded";

import SkuForm from "./SkuForm";
import Routes from "../../utils/Routes";
import Utils from "../../utils/Utils";

import { Theme, createStyles } from "@material-ui/core";
import { any } from "prop-types";
const styles = (theme: Theme) =>
  createStyles({
    container: {
      paddingTop: theme.spacing(5),
      marginBottom: theme.spacing(2)
    },
    priceCaption: {
      color: "#B12704",
      marginLeft: theme.spacing(1)
    },
    leftIcon: {
      marginRight: theme.spacing(1)
    },
    button: {
      // backgroundColor: "#00B3A0",
      transition: "all 0.3s",
      marginTop: theme.spacing(1),
      maringRight: theme.spacing(1),
      marginBottom: theme.spacing(1),
      paddingTop: theme.spacing(1),
      paddingBottom: theme.spacing(1),
      paddingRight: theme.spacing(1) * 4,
      paddingLeft: theme.spacing(1) * 4,
      color: "white",
      "&:hover": {
        // backgroundColor: "#00877C",
        transition: "all 0.3s"
      }
    },
    metaContainer: {
      paddingLeft: theme.spacing(2)
    },
    formControl: {
      marginTop: theme.spacing(1),
      maringRight: theme.spacing(1),
      marginBottom: theme.spacing(1),
      minWidth: 120
    },
    table: {
      // minWidth: 700
    },
    divider: {
      marginTop: theme.spacing(2),
      marginBottom: theme.spacing(1)
    },
    textField: {
      width: "100%"
    },
    categorySelect: {
      // width: "100%",
      marginTop: "8px",
      height: "43px"
    },
    skuContainer: {
      paddingTop: theme.spacing(2),
      paddingBottom: theme.spacing(2),
      paddingLeft: theme.spacing(1) * 3,
      paddingRight: theme.spacing(1) * 3,
      marginBottom: theme.spacing(2),
      marginTop: theme.spacing(2)
    },
    skuAttributePanelDetails: {
      display: "block",
      marginTop: theme.spacing(2)
    },
    newButton: {
      width: "100%",
      height: 40
    },
    deleteBtnIcon: {
      marginRight: theme.spacing(1)
    }
  });

type ProductFormState = {
  name: String;
  description: String;
  id: number;
  categoryOptions: any;
  skus: Array<any>;
  skuExpanded: boolean;
  [key: string]: any;
};

type ProductFormProps = {
  classes: any;
  mode: string;
  product: any;
  updateProduct?: any;
  createProduct?: any;
};

class ProductForm extends React.Component<ProductFormProps, ProductFormState> {
  constructor(props: any) {
    super(props);
    this.state = {
      name: "",
      description: "",
      id: 0,
      categoryOptions: [],
      skus: [],
      skuExpanded: false
    };
  }

  componentDidMount() {
    const { product, mode } = this.props;
    if (mode != "new") {
      this.setState({
        name: product.name,
        description: product.description,
        id: product.id,
        categoryOptions: [
          {
            value: product.productCategory.id,
            label: product.productCategory.name
          }
        ],
        skus: product.skus
      });
    }
  }

  /**
   * Handler for field change
   *
   * @param {*} event
   */
  handleChange(event: any) {
    const {
      target: { name, value }
    } = event;
    // Ref: https://github.com/DefinitelyTyped/DefinitelyTyped/issues/26635
    this.setState({ [name]: value } as Pick<
      ProductFormState,
      keyof ProductFormState
    >);
  }

  /*,
   * Handler for Sku field change
   *
   * @param {*} event
   */
  handleSkusChange(event: any) {
    let nameSplit: Array<any> = event.target.name.split("_");

    let nextSkus = this.state.skus;

    nextSkus[nameSplit[0]][nameSplit[1]] = event.target.value;
    this.setState({
      skus: nextSkus
    });
  }

  /**
   * Handle sku attribute change
   *
   * @param {*} event
   */
  handleSkuAttributeChange(event: any) {
    let nextState = this.state.skus;

    let split = event.target.name.split("_");

    nextState[split[0]].skuAttributes[split[2]][split[3]] = event.target.value;
    this.setState({
      skus: nextState
    });
  }

  handleSkuAttributeCategoryChange(name: string, categoryOption: any) {
    let split: Array<any> = name.split("_");

    let nextState = this.state.skus;

    nextState[split[0]].skuAttributes[split[2]].skuAttributeCategory = {
      id: categoryOption.value,
      name: categoryOption.label
    };

    nextState[split[0]].skuAttributes[split[2]].skuAttributeCategoryId =
      categoryOption.value;

    this.setState({
      skus: nextState
    });
  }

  /**
   * Update product AJAX call
   */
  handleSubmit() {
    if (this.props.mode == "update") {
      // console.log(this.state);

      let _product = {
        ...this.props.product,
        ...this.state
      };

      _product.vendorId = this.props.product.vendor.id;
      _product.categoryId = this.state.categoryOptions[0].value;

      // console.log(_product.vendorId, _product.categoryId);

      delete _product.categoryOptions;

      _product.skus.forEach((sku: any, index: number) => {
        if (_.isNil(sku.productId)) {
          sku.productId = _product.id;
        }

        if (Array.isArray(sku.skuAttributes)) {
          sku.skuAttributes.forEach((skuAttribute: any, index2: number) => {
            delete skuAttribute.skuAttributeCategory;
          });
        }
      });

      this.props.updateProduct(_product);
    } else {
      let _product: any = this.state;

      _product.categoryId = this.state.categoryOptions.value;

      if (Array.isArray(_product.skus)) {
        _product.skus.forEach((sku: any) => {
          sku.createdUserId = Utils.getCurrentUser().id;
        });

        _product.skus.forEach((sku: any) => {
          if (Array.isArray(sku.skuAttributes)) {
            sku.skuAttributes.forEach((skuAttribute: any) => {
              delete skuAttribute.skuAttributeCategory;
            });
          }
        });
      }

      _product.vendorId = Utils.getCurrentUser().id;

      delete _product.id;

      this.props.createProduct(_product);
    }
  }

  /**
   * Triggered when delete button clicked
   *
   * @param {*} index
   * @param {*} event
   */
  onSkuDeleteClick(index: number, event: any) {
    this.setState({
      skus: this.state.skus.filter((item, _index) => {
        return _index != index;
      })
    });
  }

  addSkuOnClickHandler() {
    if (!_.isNil(this.state.skus) && this.state.skus.length == 0) {
      this.setState({
        skuExpanded: true
      });
    }

    let item: any = {
      price: "",
      stock: "",
      skuAttributes: []
    };

    this.setState({
      skus: !Array.isArray(this.state.skus)
        ? [item]
        : [...this.state.skus, item]
    });
  }

  addSkuAttributeOnClickHandler(skuIndex: number) {
    let nextSkus = this.state.skus;

    let item = {
      value: "",
      skuAttributeCategory: {
        id: "",
        name: ""
      },
      skuCode: ""
    };

    if (!_.isNil(nextSkus[skuIndex].skuCode)) {
      item.skuCode = nextSkus[skuIndex].skuCode;
    }

    if (!Array.isArray(nextSkus[skuIndex].skuAttributes)) {
      nextSkus[skuIndex].skuAttributes = [];
    }

    nextSkus[skuIndex].skuAttributes = [
      ...nextSkus[skuIndex].skuAttributes,
      item
    ];

    this.setState({
      skus: nextSkus
    });
  }

  render() {
    const { classes, mode } = this.props;

    const handleInputChange = (newValue: any) => {
      this.setState({
        categoryOptions: newValue
      });
    };

    const loadOptions = async (inputValue: any, callback: any) => {
      const url = `/api/product-categories${"?keyword=" + inputValue}`;
      let token = sessionStorage.getItem("token");

      let json: any = [];

      try {
        let response = await fetch(url, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json"
          }
        });

        let json = await response.json();

        if (json.status == 403) {
          Utils.logout();
          location.href = Routes.USER.LOGIN;
          return json;
        }

        json = json._embedded.productCategoryList.map((item: any) => {
          return {
            value: item.id,
            label: item.name
          };
        });

        return json;
      } catch (error) {
        // console.log(error);
      }
      console.log(json);
      return json;
    };

    const handlePanelChange = (name: any) => {
      let expandFieldName: string = name + "Expanded";
      let value: any = !this.state[expandFieldName];

      this.setState({
        [expandFieldName]: value
      } as Pick<ProductFormState, keyof ProductFormState>);
    };

    return (
      <div>
        <Grid container spacing={1}>
          <Grid item xs={12} sm={12}>
            <Typography variant="h4" gutterBottom className={classes.title}>
              Product
            </Typography>
          </Grid>

          {mode != "new" && (
            <Grid item xs={12} sm={12}>
              <TextField
                disabled
                id="outlined-number"
                label="Id"
                name="id"
                type="text"
                className={classes.textField}
                InputLabelProps={{
                  shrink: true
                }}
                margin="normal"
                variant="outlined"
                value={this.state.id}
                onChange={this.handleChange.bind(this)}
              />
            </Grid>
          )}

          <Grid item xs={12} sm={6}>
            <TextField
              id="outlined-number"
              label="Name"
              name="name"
              type="text"
              className={classes.textField}
              InputLabelProps={{
                shrink: true
              }}
              margin="normal"
              variant="outlined"
              value={this.state.name}
              onChange={this.handleChange.bind(this)}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <AsyncSelect
              className={classes.categorySelect}
              cacheOptions
              placeholder="Please select product category..."
              loadOptions={loadOptions}
              defaultOptions
              classNamePrefix="react-select"
              value={this.state.categoryOptions}
              onChange={handleInputChange}
            />
          </Grid>

          <Grid item xs={12} sm={12}>
            <TextField
              id="outlined-number"
              label="Description"
              name="description"
              type="text"
              className={classes.textField}
              InputLabelProps={{
                shrink: true
              }}
              multiline
              margin="normal"
              variant="outlined"
              value={this.state.description}
              onChange={this.handleChange.bind(this)}
            />
          </Grid>

          {/* SKU Block*/}

          <Grid item xs={12} sm={12}>
            {!_.isNil(this.state.skus) && this.state.skus.length > 0 ? (
              <Fade in={true} timeout={1000}>
                <ExpansionPanel
                  expanded={this.state.skuExpanded}
                  onChange={() => {
                    handlePanelChange("sku");
                  }}
                >
                  <ExpansionPanelSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1bh-content"
                    id="panel1bh-header"
                  >
                    Sku
                  </ExpansionPanelSummary>
                  <ExpansionPanelDetails
                    className={classes.skuAttributePanelDetails}
                  >
                    {
                      <SkuForm
                        skus={this.state.skus}
                        parentClasses={classes}
                        // skuAttributeExpanded={this.state.skuAttributeExpanded}
                        handleChange={this.handleSkusChange.bind(this)}
                        // handlePanelChange={handlePanelChange}
                        mode={mode}
                        onSkuDeleteClick={this.onSkuDeleteClick.bind(this)}
                        addSkuAttributeOnClickHandler={this.addSkuAttributeOnClickHandler.bind(
                          this
                        )}
                        handleSkuAttributeChange={this.handleSkuAttributeChange.bind(
                          this
                        )}
                        handleSkuAttributeCategoryChange={this.handleSkuAttributeCategoryChange.bind(
                          this
                        )}
                      />
                    }
                    <Grid item xs={12} md={12}>
                      <Button
                        size="small"
                        variant="outlined"
                        className={classes.newButton}
                        color="primary"
                        onClick={this.addSkuOnClickHandler.bind(this)}
                      >
                        <AddRoundedIcon />
                        Add Sku
                      </Button>
                    </Grid>
                  </ExpansionPanelDetails>
                </ExpansionPanel>
              </Fade>
            ) : (
              <Button
                size="small"
                variant="outlined"
                className={classes.newButton}
                color="primary"
                onClick={this.addSkuOnClickHandler.bind(this)}
              >
                <AddRoundedIcon />
                Add Sku
              </Button>
            )}
          </Grid>

          <Grid item xs={12} sm={12}>
            <Button
              variant="contained"
              color="primary"
              className={classes.button}
              onClick={this.handleSubmit.bind(this)}
            >
              Save
            </Button>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(ProductForm);
