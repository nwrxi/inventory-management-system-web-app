import { observer } from "mobx-react-lite";
import React, { CSSProperties } from "react";
import { Spinner } from "react-bootstrap";

export default observer(function Loading() {
  const style: CSSProperties = {
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  };

  return (
    <div className="flex-column align-items-center" style={style}>
      <Spinner animation="border" role="status">
        <span className="sr-only">Loading...</span>
      </Spinner>
      <div className="row">
        <strong>Loading</strong>
      </div>
    </div>
  );
});
