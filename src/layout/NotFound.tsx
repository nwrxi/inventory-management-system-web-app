import { CSSProperties } from "@material-ui/styles";
import { observer } from "mobx-react-lite";
import { Fragment } from "react";

export default observer(function NotFound() {
  return (
    <Fragment>
      <div className="d-flex justify-content-center align-items-center">
        <h1
          style={{ fontSize: "10rem" }}
          className="mr-3 pr-3 text-center align-top inline-block align-content-center"
        >
          404
        </h1>
      </div>
      <div className="d-flex justify-content-center align-items-center">
        <h2
          style={{ fontSize: "2rem" }}
          className="text-center font-weight-normal lead"
          id="desc"
        >
          The page you requested was not found.
        </h2>
      </div>
    </Fragment>
  );
});
