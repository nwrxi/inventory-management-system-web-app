import { Form, Field, Formik } from "formik";
import React, { CSSProperties, Fragment, useContext, useEffect } from "react";
import { Alert, Button, Spinner } from "react-bootstrap";
import * as Yup from "yup";
import { LinkContainer } from "react-router-bootstrap";
import { BaseStoreContext } from "../../stores/BaseStore";
import { observer } from "mobx-react-lite";

const loginPageStyle: CSSProperties = {
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

const labelStyle: CSSProperties = {
  float: "left",
};

export default observer(function LoginForm() {
  const baseStore = useContext(BaseStoreContext);
  const { login } = baseStore.userStore;

  return (
    <Formik
      initialValues={{
        email: "",
        password: "",
        error: null,
      }}
      onSubmit={(values, { setErrors }) =>
        login(values).catch((error) => setErrors({ error }))
      }
      validationSchema={Yup.object({
        email: Yup.string()
          .email("Email not valid")
          .required("Email is required"),
        password: Yup.string().required("Password is required"),
      })}
    >
      {({ handleSubmit, touched, isSubmitting, errors, isValid, dirty }) => (
        <Fragment>
          <div className="container">
            <div className="login-wrapper" style={loginPageStyle}>
              <h2>Inventory Management System</h2>
              <h3
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                Login Page
              </h3>
              <Form className="form-container" onSubmit={handleSubmit}>
                <div className="form-group">
                  <label style={labelStyle} htmlFor="email">
                    Email
                  </label>
                  <Field
                    type="text"
                    name="email"
                    className={"form-control"}
                    placeholder="Email"
                  />
                  {touched.email && errors.email && (
                    <span className="help-block text-danger">
                      {errors.email}
                    </span>
                  )}
                </div>
                <div className="form-group">
                  <label style={labelStyle} htmlFor="password">
                    Password
                  </label>
                  <Field
                    type="password"
                    name="password"
                    className={"form-control"}
                    placeholder="Password"
                  />
                  {touched.password && errors.password && (
                    <span className="help-block text-danger">
                      {errors.password}
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
                    Login
                  </Button>
                )}
                <LinkContainer to="/register">
                  <Button className="ml-2" variant="danger">
                    Create account
                  </Button>
                </LinkContainer>
              </Form>
            </div>
          </div>
        </Fragment>
      )}
    </Formik>
  );
});
