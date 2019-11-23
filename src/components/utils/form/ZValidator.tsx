import _ from "lodash";

class ZValidator {
  static IS_REQUIRED = "IS_REQUIRED";
  static NUMBER = "NUMBER";
  static EMAIL = "EMAIL";
  static NO_SPECIAL_CHAR = "NO_SPECIAL_CHAR";

  static isEmpty(value: string): boolean {
    return !(_.isNil(value) || value === "");
  }

  static isNumber(value: string): boolean {
    let reg = new RegExp(/^\d+$/);
    return reg.test(value);
  }
}

export default ZValidator;
