import * as React from "react";
import { Result, Button } from "antd";

class PageNotFound extends React.Component {
  backToHome() {
    window.location.href = "/home";
  }

  render() {
    return (
      <Result
        status="404"
        title="404"
        subTitle="Sorry, the page you visited does not exist."
        extra={
          <Button type="primary" onClick={this.backToHome}>
            Back Home
          </Button>
        }
      />
    );
  }
}

export default PageNotFound;
