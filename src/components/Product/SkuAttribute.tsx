import * as React from "react";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import _ from "lodash";
import "react-image-gallery/styles/css/image-gallery.css";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import AsyncSelect from "react-select/async";
import "./ProductForm.css";
import Indicator from "../utils/Indicator";

import { Theme, createStyles } from "@material-ui/core";

const styles = (theme: Theme) =>
  createStyles({
    textField: {
      width: "100%"
    },
    skuContainer: {
      paddingTop: theme.spacing(2),
      paddingBottom: theme.spacing(2),
      paddingLeft: theme.spacing(3),
      paddingRight: theme.spacing(3),
      marginBottom: theme.spacing(2)
    },
    newButton: {
      width: "100%",
      height: 40,
      marginTop: theme.spacing(1)
    },
    categorySelect: {
      marginTop: "8px",
      height: "43px",
      marginBottom: theme.spacing(1)
    }
  });

type SkuAttributeState = {
  categoryOptions: Array<any>;
  value: String;
};

type SkuAttributeProps = {
  classes: any;
  parentClasses: any;
  skuAttribute: any;
  mode?: String;
  skuAttributeIndex: any;
  handleSkuAttributeChange?: any;
  skuIndex: number;
  handleSkuAttributeCategoryChange?: any;
  // addSkuAttributeOnClickHandler: any;
  // children?: any;
};

class SkuAttribute extends React.Component<
  SkuAttributeProps,
  SkuAttributeState
> {
  constructor(props: any) {
    super(props);
    this.state = {
      categoryOptions: [],
      value: ""
    };
  }

  componentDidMount() {
    const { skuAttribute, mode } = this.props;

    // console.log(skuAttribute);

    if (mode != "new") {
      this.setState({
        value: skuAttribute.value,
        categoryOptions: [
          {
            value: skuAttribute.skuAttributeCategory.id,
            label: skuAttribute.skuAttributeCategory.name
          }
        ]
      });
    }
  }

  handleChange(event: any) {
    const { target: { name, value } } = event;
    // Ref: https://github.com/DefinitelyTyped/DefinitelyTyped/issues/26635
    this.setState({ [name]: value } as Pick<SkuAttributeState, keyof SkuAttributeState>);

    // this.setState({
    //   [event.target.name]: event.target.value
    // });
  }

  render() {
    const {
      classes,
      skuAttribute,
      mode,
      skuAttributeIndex,
      handleSkuAttributeChange,
      skuIndex,
      handleSkuAttributeCategoryChange
    } = this.props;

    const loadOptions = async (inputValue: any, callback: any) => {
      const url = `/api/skus/attributes/categories${"?keyword=" + inputValue}`;
      let token = sessionStorage.getItem("token");
      const response = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json"
        }
      });

      const json = await response.json();
      return json._embedded.skuAttributeCategoryList.map((item: any) => {
        return {
          value: item.id,
          label: item.name
        };
      });
    };

    const handleInputChange = (newValue: any, action: any) => {
      this.setState({
        categoryOptions: newValue
      });
      console.log(newValue, action);
      this.props.handleSkuAttributeCategoryChange(action.name, newValue);
    };

    return (
      <Paper className={classes.skuContainer}>
        <div>
          <Indicator index={skuAttributeIndex + 1} />
        </div>

        {mode != "new" && skuAttribute.id && (
          <Grid item xs={12} sm={12}>
            <TextField
              id="outlined-number"
              label="Attribute Id"
              type="text"
              disabled
              className={classes.textField}
              InputLabelProps={{
                shrink: true
              }}
              multiline
              margin="normal"
              variant="outlined"
              value={skuAttribute.id}
            />
          </Grid>
        )}

        <Grid item xs={12} sm={12}>
          <AsyncSelect
            className={classes.categorySelect}
            name={`${skuIndex}_sku_${skuAttributeIndex}_category`}
            cacheOptions
            placeholder="Please select sku category..."
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
            label="Value"
            name={`${skuIndex}_sku_${skuAttributeIndex}_value`}
            type="text"
            className={classes.textField}
            InputLabelProps={{
              shrink: true
            }}
            multiline
            margin="normal"
            variant="outlined"
            value={skuAttribute.value}
            onChange={handleSkuAttributeChange}
          />
        </Grid>
      </Paper>
    );
  }
}

export default withStyles(styles)(SkuAttribute);
