import React from "react";
import { TextFieldProps } from "@material-ui/core/TextField";
import TextField from "@material-ui/core/TextField";

import _ from "lodash";
import ValidationErrorMsg from "./ValidationErrorMsg";

type ValidationCallbackType = ({
  name,
  isValid,
  errorMsg
}: {
  name: string;
  isValid: boolean;
  errorMsg: string;
}) => void;

type ZTextFieldState = {};

type ZTextFieldBaseProps = {
  validator?: Array<string>;
  validationCallback?: ValidationCallbackType;
};

type ZTextFieldProps = ZTextFieldBaseProps & TextFieldProps;

class ZTextField extends React.Component<ZTextFieldProps, ZTextFieldState> {
  onChange(event: any) {
    const { validator, validationCallback } = this.props;

    if (validator.includes("isRequired")) {
      let { name, value } = event.target;

      if (_.isNil(value) || value === "") {
        validationCallback({
          name: name,
          isValid: false,
          errorMsg: ValidationErrorMsg.IS_EMPTY.replace("~~field~~", name)
        });
      } else {
        validationCallback({
          name: name,
          isValid: true,
          errorMsg: undefined
        });
      }
    }

    this.props.onChange(event);
  }

  render() {
    const { onChange, validationCallback, ...rest } = this.props;
    return (
      <div>
        <TextField {...rest} onChange={this.onChange.bind(this)}></TextField>
      </div>
    );
  }
}

export default ZTextField;
