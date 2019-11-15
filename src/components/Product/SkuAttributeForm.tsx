import * as React from "react";
import { withStyles } from "@material-ui/core/styles";
import { Theme, createStyles } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import _ from "lodash";
import "react-image-gallery/styles/css/image-gallery.css";
import Fade from "@material-ui/core/Fade";
import "./ProductForm.css";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import AddRoundedIcon from "@material-ui/icons/AddRounded";
import SkuAttribute from "./SkuAttribute";

const styles = (theme: Theme) => createStyles({});

type SkuAttributeFormState = {
  skuAttributeExpanded: boolean
};

type SkuAttributeFormProps = {
  classes: any,
  parentClasses: any,
  skuIndex: number,
  skus: Array<any>,
  addSkuAttributeOnClickHandler: any
};

class SkuAttributeForm extends React.Component<
  SkuAttributeFormProps,
  SkuAttributeFormState
> {
  constructor(props: any) {
    super(props);
    this.state = {
      skuAttributeExpanded: false
    };
  }

  handlePanelChange() {
    this.setState({
      skuAttributeExpanded: !this.state.skuAttributeExpanded
    });
  }

  addSkuAttributeOnClickHandler(skuIndex: number) {
    if (
      _.isNil(this.props.skus[skuIndex].skuAttributes) ||
      this.props.skus[skuIndex].skuAttributes.length == 0
    ) {
      this.setState({
        skuAttributeExpanded: true
      });
    }
    this.props.addSkuAttributeOnClickHandler(skuIndex);
  }

  render() {
    const { parentClasses, skuIndex, skus } = this.props;

    return Array.isArray(skus[skuIndex].skuAttributes) &&
      skus[skuIndex].skuAttributes.length > 0 ? (
      <Fade in={true} timeout={1000}>
        <ExpansionPanel
          expanded={this.state.skuAttributeExpanded}
          onChange={() => {
            this.handlePanelChange();
          }}
        >
          <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1bh-content"
            id="panel1bh-header"
          >
            Sku Attributes
          </ExpansionPanelSummary>
          <ExpansionPanelDetails
            className={parentClasses.skuAttributePanelDetails}
          >
            {Array.isArray(skus[skuIndex].skuAttributes) &&
              skus[skuIndex].skuAttributes.map((skuAttribute: any, index: number) => (
                <SkuAttribute
                  key={index}
                  {...this.props}
                  skuAttributeIndex={index}
                  skuAttribute={skuAttribute}
                ></SkuAttribute>
              ))}

            <Button
              size="small"
              variant="outlined"
              className={parentClasses.newButton}
              color="primary"
              onClick={() => {
                this.addSkuAttributeOnClickHandler(skuIndex);
              }}
            >
              <AddRoundedIcon />
              Add Sku Attribute
            </Button>
          </ExpansionPanelDetails>
        </ExpansionPanel>
      </Fade>
    ) : (
      <Button
        size="small"
        variant="outlined"
        className={parentClasses.newButton}
        color="primary"
        onClick={() => {
          this.addSkuAttributeOnClickHandler(skuIndex);
        }}
      >
        <AddRoundedIcon />
        Add Sku Attribute
      </Button>
    );
  }
}

export default withStyles(styles)(SkuAttributeForm);
