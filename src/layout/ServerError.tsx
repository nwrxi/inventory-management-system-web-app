import { observer } from "mobx-react-lite";
import { Fragment } from "react";

export default observer(function ServerError() {
  return (
    <Fragment>
      <div className="d-flex justify-content-center align-items-center">
        <h1
          style={{ fontSize: "10rem" }}
          className="mr-3 pr-3 text-center align-top inline-block align-content-center"
        >
          500
        </h1>
      </div>
      <div className="d-flex justify-content-center align-items-center">
        <h2
          style={{ fontSize: "2rem" }}
          className="text-center font-weight-normal lead"
          id="desc"
        >
          There was an internal server error. Please try again later.
        </h2>
      </div>
    </Fragment>
  );
});
