import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Fade from "@material-ui/core/Fade";
import Grid from "@material-ui/core/Grid";
import _ from "lodash";
import { Theme, createStyles } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";

import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import AsyncSelect from "react-select/async";

import Routes from "../../utils/Routes";
import Utils from "../../utils/Utils";

import "../utils/Select.css";
import Constants from "./../../utils/Constants";
import ZTextField from "../utils/form/ZTextField";

const styles = (theme: Theme) =>
  createStyles({
    reactSelect: {
      marginTop: "8px",
      height: "43px"
    },
    resetButton: {
      width: "100%"
    }
  });

type FormState = {
  username: string;
  email: string;
  id?: number;
  firstname: string;
  lastname: string;
  address1: string;
  address2: string;
  telephone: string;
  genderOptions: any;
  roleOptions: any;
  validationErrors: any;
};

type FormProps = {
  classes: any;
  user: any;
  mode: string;

  action?: any;
  actionPending?: boolean;
  actionFulfilled?: boolean;
};

class Form extends React.Component<FormProps, FormState> {
  constructor(props: any) {
    super(props);
    this.state = {
      username: "",
      email: "",
      id: -1,
      firstname: "",
      lastname: "",
      address1: "",
      address2: "",
      telephone: "",
      genderOptions: [],
      roleOptions: [],
      validationErrors: {}
    };
  }
  componentDidMount() {
    const { user, mode } = this.props;
    if (mode != "new") {
      console.log(user);
      let roleOptions = user.roles.map((role: any) => {
        return {
          value: role.id,
          label: role.code
        };
      });
      console.log(roleOptions);
      this.setState({
        username: user.username,
        email: user.email,
        id: user.id,
        firstname: user.firstname,
        lastname: user.lastname,
        address1: user.address1,
        address2: user.address2,
        telephone: user.telephone,
        genderOptions: [
          {
            value: user.gender,
            label: user.gender.toUpperCase()
          }
        ],
        roleOptions: roleOptions,
        validationErrors: {}
      });
    }
  }

  handleChange(event: any) {
    const {
      target: { name, value }
    } = event;
    // Ref: https://github.com/DefinitelyTyped/DefinitelyTyped/issues/26635
    this.setState({ [name]: value } as Pick<FormState, keyof FormState>, () => {
      // this.validateForm(name);
    });
  }

  validateForm(field: string) {
    if (field === "username") {
      if (_.isNil(this.state.username) || this.state.username === "") {
        this.setFormError("username", "Username can not by empty!");
      } else {
        this.setFormError("username", undefined);
      }
    }

    if (field === "email") {
      if (_.isNil(this.state.email) || this.state.email === "") {
        this.setFormError("email", "Email can not by empty!");
      } else {
        this.setFormError("email", undefined);
      }
    }
  }

  validationCallback({
    name,
    isValid,
    errorMsg
  }: {
    name: string;
    isValid: boolean;
    errorMsg: string;
  }) {
    this.setFormError(name, errorMsg);
  }

  setFormError(field: string, errorMsg: string) {
    let next: any = this.state.validationErrors;

    next[field] = errorMsg;

    this.setState({
      validationErrors: next
    });
  }

  handleSubmit() {
    if (this.props.mode == Constants.FORM.MODE.UPDATE) {
      let _user: any = _.cloneDeep(this.state);
      console.log(_user);

      _user.gender = _user.genderOptions.value;
      delete _user["genderOptions"];

      _user.roles = _user.roleOptions.map((roleOption: any) => {
        return {
          id: roleOption.value,
          code: roleOption.label
        };
      });

      delete _user["roleOptions"];

      this.props.action(_user);
    }
  }

  handleGenderOptionChange = (newValue: any) => {
    this.setState({
      genderOptions: newValue
    });
  };

  handleRoleOptionChange = (newValue: any) => {
    this.setState({
      roleOptions: newValue
    });
  };

  // FIXME Should we load gender dynamically
  loadGenderOptions = async (inputValue: any, callback: any) => {
    return [
      {
        value: "M",
        label: "M"
      },
      {
        value: "F",
        label: "F"
      }
    ];
  };

  loadRoleOptions = async (inputValue: any, callback: any) => {
    const url = `/api/users/roles${"?keyword=" + inputValue}`;
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

      json = json._embedded.roleList.map((item: any) => {
        return {
          value: item.id,
          label: item.code
        };
      });
      console.log(json);
      return json;
    } catch (error) {
      // console.log(error);
    }
    console.log(json);
    return json;
  };
  hasError(field: string) {
    return !_.isNil(this.state.validationErrors[field]);
  }
  render() {
    const { classes, user, mode, actionPending, actionFulfilled } = this.props;

    return (
      <div>
        <Grid container spacing={1}>
          <Grid item xs={12} sm={12}>
            <Typography variant="h4" gutterBottom className={classes.title}>
              User
            </Typography>
          </Grid>
          {mode != Constants.FORM.MODE.NEW && (
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
                value={user.id}
              />
            </Grid>
          )}

          <Grid item xs={12} sm={6}>
            <ZTextField
              id="outlined-number"
              label="Username"
              name="username"
              error={this.hasError("username")}
              type="text"
              className={classes.textField}
              InputLabelProps={{
                shrink: true
              }}
              margin="normal"
              variant="outlined"
              value={this.state.username}
              validator={["isRequired"]}
              validationCallback={this.validationCallback.bind(this)}
              helperText={
                this.hasError("username") &&
                this.state.validationErrors["username"]
              }
              onChange={this.handleChange.bind(this)}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              id="outlined-number"
              label="Email"
              name="email"
              type="email"
              error={this.hasError("email")}
              className={classes.textField}
              InputLabelProps={{
                shrink: true
              }}
              margin="normal"
              variant="outlined"
              value={this.state.email}
              onChange={this.handleChange.bind(this)}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              id="outlined-number"
              label="Telephone"
              name="telephone"
              type="text"
              className={classes.textField}
              InputLabelProps={{
                shrink: true
              }}
              margin="normal"
              variant="outlined"
              value={this.state.telephone}
              onChange={this.handleChange.bind(this)}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <AsyncSelect
              className={classes.reactSelect}
              cacheOptions
              placeholder="Please select gender..."
              loadOptions={this.loadGenderOptions.bind(this)}
              defaultOptions
              classNamePrefix="react-select"
              value={this.state.genderOptions}
              onChange={this.handleGenderOptionChange.bind(this)}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              id="outlined-number"
              label="First Name"
              name="firstname"
              type="text"
              className={classes.textField}
              InputLabelProps={{
                shrink: true
              }}
              margin="normal"
              variant="outlined"
              value={this.state.firstname}
              onChange={this.handleChange.bind(this)}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              id="outlined-number"
              label="Last Name"
              name="lastname"
              type="text"
              className={classes.textField}
              InputLabelProps={{
                shrink: true
              }}
              margin="normal"
              variant="outlined"
              value={this.state.lastname}
              onChange={this.handleChange.bind(this)}
            />
          </Grid>

          <Grid item xs={12} sm={12}>
            <TextField
              id="outlined-number"
              label="Address1"
              name="address1"
              type="text"
              className={classes.textField}
              InputLabelProps={{
                shrink: true
              }}
              margin="normal"
              variant="outlined"
              value={this.state.address1}
              onChange={this.handleChange.bind(this)}
            />
          </Grid>

          <Grid item xs={12} sm={12}>
            <TextField
              id="outlined-number"
              label="Address2"
              name="address2"
              type="text"
              className={classes.textField}
              InputLabelProps={{
                shrink: true
              }}
              margin="normal"
              variant="outlined"
              value={this.state.address2}
              onChange={this.handleChange.bind(this)}
            />
          </Grid>

          <Grid item xs={12} sm={12}>
            <AsyncSelect
              className={classes.reactSelect}
              cacheOptions
              isMulti
              placeholder="Please select role..."
              loadOptions={this.loadRoleOptions.bind(this)}
              defaultOptions
              classNamePrefix="react-select"
              value={this.state.roleOptions}
              onChange={this.handleRoleOptionChange.bind(this)}
            />
          </Grid>

          <Grid item xs={12} sm={4}>
            <Button
              variant="outlined"
              color="primary"
              disabled={actionPending}
              className={classes.resetButton}
              // onClick={this.handleSubmit.bind(this)}
            >
              Reset password
            </Button>
          </Grid>

          <Grid item xs={12} sm={12}>
            <Button
              variant="contained"
              color="primary"
              disabled={actionPending}
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

export default withStyles(styles, { withTheme: true })(Form);
