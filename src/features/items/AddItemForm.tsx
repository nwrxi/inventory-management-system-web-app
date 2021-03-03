import { Field, Form, Formik } from "formik";
import React, { CSSProperties, Fragment, useContext } from "react";
import { Alert, Button, Spinner } from "react-bootstrap";
import * as Yup from "yup";
import { LinkContainer } from "react-router-bootstrap";
import { BaseStoreContext } from "../../stores/BaseStore";
import { observer } from "mobx-react-lite";
import {isMobile} from "react-device-detect";

let loginPageStyle: CSSProperties = {
  position: "absolute",
  left: "50%",
  top: "50%",
  transform: "translate(-50%, -80%)",
  maxWidth: "530px",
  background: "#ffffff",
  padding: "30px",
  borderRadius: "10px",
  boxShadow: "0px 0px 10px 10px rgba(0,0,0,0.15)",
};

if(isMobile){
    loginPageStyle = {
        maxWidth: "530px",
        background: "#ffffff",
        padding: "30px",
        borderRadius: "10px",
        boxShadow: "0px 0px 10px 10px rgba(0,0,0,0.15)",
    };
}

const labelStyle: CSSProperties = {
  float: "left",
};

export default observer(function AddItemForm() {
  const baseStore = useContext(BaseStoreContext);
  const { setShow } = baseStore.modalStore;

  return (
    <Formik
      initialValues={{
        name: "",
        barcode: "",
        error: null,
      }}
      onSubmit={(values, { setErrors }) => console.log(values)}
      validationSchema={Yup.object({
        name: Yup.string().required("Item name is required"),
        barcode: Yup.number().required("Barcode is required"),
      })}
    >
      {({
        setFieldValue,
        handleSubmit,
        touched,
        isSubmitting,
        errors,
        isValid,
        dirty,
      }) => (
        <Fragment>
          <div className="container">
            <div className="login-wrapper" style={loginPageStyle}>
              <h2>Add new item</h2>
              <Form className="form-container" onSubmit={handleSubmit}>
                <div className="form-group">
                  <label style={labelStyle} htmlFor="name">
                    Item name
                  </label>
                  <Field
                    type="text"
                    name="name"
                    className={"form-control"}
                    placeholder="Item name"
                  />
                  {touched.name && errors.name && (
                    <span className="help-block text-danger">
                      {errors.name}
                    </span>
                  )}
                </div>
                <div className="form-group">
                  <label style={labelStyle} htmlFor="barcode">
                    Barcode
                  </label>
                  <Field
                    type="text"
                    name="barcode"
                    pattern="\d*"
                    onChange={(e: any) => {
                      e.preventDefault();
                      const { value } = e.target;
                      const regex = /^[0-9]*$/;
                      if (regex.test(value.toString())) {
                        setFieldValue("barcode", value);
                      }
                    }}
                    className={"form-control"}
                    placeholder="Barcode"
                  />
                  {touched.barcode && errors.barcode && (
                    <span className="help-block text-danger">
                      {errors.barcode}
                    </span>
                  )}
                </div>
                {errors.error && (
                  <Alert variant="danger">Wrong login or password</Alert>
                )}
                {!isSubmitting && (
                  <Button
                    disabled={!dirty || !isValid}
                    variant="primary"
                    type="submit"
                  >
                    Login
                  </Button>
                )}
                {isSubmitting && (
                  <Button variant="primary" disabled>
                    <Spinner
                      as="span"
                      animation="grow"
                      size="sm"
                      role="status"
                      aria-hidden="true"
                    />
                    Submit
                  </Button>
                )}
                <Button
                  onClick={() => setShow(false)}
                  className="ml-2"
                  variant="danger"
                >
                  Cancel
                </Button>
              </Form>
            </div>
          </div>
        </Fragment>
      )}
    </Formik>
  );
});
