import React from "react";
import { TextFieldProps } from "@material-ui/core/TextField";
import TextField from "@material-ui/core/TextField";

import _ from "lodash";
import ValidationErrorMsg from "./ValidationErrorMsg";
import ZValidator from "./ZValidator";

type ValidationCallbackType = ({
  name,
  isValid,
  errorMsg
}: {
  name: string;
  isValid: boolean;
  errorMsg: string;
}) => void;

type ZTextFieldState = {
  isValid: boolean;
  errorMsg: string;
};

type ZTextFieldBaseProps = {
  validator?: Array<string>;
  validationCallback?: ValidationCallbackType;
};

type ZTextFieldProps = ZTextFieldBaseProps & TextFieldProps;

class ZTextField extends React.Component<ZTextFieldProps, ZTextFieldState> {
  constructor(props: any) {
    super(props);
    this.state = {
      isValid: true,
      errorMsg: ""
    };
  }

  onChange(event: any) {
    const { validator, validationCallback } = this.props;
    let { name, value } = event.target;
    let errorMsg = "";
    if (validator.includes(ZValidator.IS_REQUIRED)) {
      let isValid = ZValidator.isEmpty(value);
      errorMsg = isValid
        ? ""
        : ValidationErrorMsg.EMPTY.replace("~~field~~", _.capitalize(name));
      this.doCallback(
        name,
        isValid,
        errorMsg,
        validationCallback,
        this.props.onChange,
        event
      );
      
      if (!isValid) {
        console.log(name, 'is required');
        return;
      }
    }
    if (validator.includes(ZValidator.NUMBER)) {
      let isValid = ZValidator.isNumber(value);
      errorMsg = isValid
        ? ""
        : ValidationErrorMsg.NOT_NUMBER.replace(
            "~~field~~",
            _.capitalize(name)
          );
      this.doCallback(
        name,
        isValid,
        errorMsg,
        validationCallback,
        this.props.onChange,
        event
      );
      if (!isValid) {
        console.log(name, 'number');
        return;
      }
    }
  }

  doCallback(
    name: string,
    isValid: boolean,
    errorMsg: string,
    validationCallback: any,
    onChangeCallbck: any,
    event: any
  ) {
    this.setState({
      isValid: isValid,
      errorMsg: errorMsg
    });
    validationCallback({
      name: name,
      isValid: isValid,
      errorMsg: errorMsg
    });
    onChangeCallbck(event);
  }

  render() {
    const { onChange, validationCallback, ...rest } = this.props;
    return (
      <div>
        <TextField
          {...rest}
          onChange={this.onChange.bind(this)}
          helperText={!this.state.isValid && this.state.errorMsg}
          error={!this.state.isValid}
        ></TextField>
      </div>
    );
  }
}

export default ZTextField;
