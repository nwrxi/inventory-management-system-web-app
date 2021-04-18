import { Form, Field, Formik } from "formik";
import React, { CSSProperties, Fragment, useContext } from "react";
import { Alert, Button, Spinner } from "react-bootstrap";
import * as Yup from "yup";
import { LinkContainer } from "react-router-bootstrap";
import { BaseStoreContext } from "../../stores/BaseStore";
import { observer } from "mobx-react-lite";
import { AxiosResponse } from "axios";

const loginPageStyle: CSSProperties = {
  position: "absolute",
  left: "50%",
  top: "50%",
  transform: "translate(-50%, -60%)",
  maxWidth: "530px",
  background: "#fff",
  padding: "30px",
  borderRadius: "10px",
  boxShadow: "0px 0px 10px 10px rgba(0,0,0,0.15)",
};

const labelStyle: CSSProperties = {
  float: "left",
};

export type FormikErrors<Values> = {
  [K in keyof Values]?: Values[K] extends object
    ? FormikErrors<Values[K]>
    : AxiosResponse;
};

export default observer(function RegisterForm() {
  const baseStore = useContext(BaseStoreContext);
  const { register } = baseStore.userStore;

  return (
    <Formik
      initialValues={{
        userName: "",
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        error: null,
      }}
      onSubmit={(values, { setStatus, setErrors, setSubmitting }) => {
        register(values).catch((error) => {
          console.log(error.response.data);
          if ("errors" in error.response.data) {
            setStatus({
              password: error.response.data.errors.Password,
            });
          }
          if ("email" in error.response.data) {
            setStatus({
              email: error.response.data.email,
            });
          }

          if ("username" in error.response.data) {
            setStatus({
              userName: error.response.data.username,
            });
          }
          setSubmitting(false);
        });
      }}
      validationSchema={Yup.object({
        userName: Yup.string().required("Username is required"),
        firstName: Yup.string().required("First name is required"),
        lastName: Yup.string().required("Last name is required"),
        email: Yup.string()
          .email("Email not valid")
          .required("Email is required"),
        password: Yup.string()
          .matches(
            /[A-Z]/,
            "Password must contain at least 1 uppercase character."
          )
          .matches(
            /[a-z]/,
            "Password must contain at least 1 lowercase character."
          )
          .matches(/[0-9]/, "Password must contain at least 1 number.")
          .matches(
            /[^a-zA-Z0-9]/,
            "Password must contain at least 1 non alphanumeric character."
          )
          .matches(/^(.{6,99})$/, "Password must be have at least 6 characters")
          .required("Password is required"),
      })}
    >
      {({
        handleSubmit,
        setFieldValue,
        touched,
        isSubmitting,
        errors,
        setStatus,
        isValid,
        dirty,
        status,
      }) => (
        <Fragment>
          <div className="container">
            <div className="login-wrapper" style={loginPageStyle}>
              <h2>Inventory Management System</h2>
              <h3>Register Page</h3>
              <Form className="form-container">
                <div className="form-group">
                  <label style={labelStyle} htmlFor="userName">
                    Username
                  </label>
                  <Field
                    type="text"
                    name="userName"
                    className={"form-control"}
                    placeholder="Username"
                    onChange={(e: any) => {
                      const { value } = e.target;
                      setFieldValue("userName", value);
                      setStatus({
                        email: status.email,
                        password: status.password,
                        userName: "",
                      });
                    }}
                  />
                  {touched.userName && errors.userName && (
                    <span className="help-block text-danger">
                      {errors.userName}
                    </span>
                  )}
                </div>
                <div className="form-group">
                  <label style={labelStyle} htmlFor="firstName">
                    First name
                  </label>
                  <Field
                    type="text"
                    name="firstName"
                    className={"form-control"}
                    placeholder="First Name"
                  />
                  {touched.firstName && errors.firstName && (
                    <span className="help-block text-danger">
                      {errors.firstName}
                    </span>
                  )}
                </div>
                <div className="form-group">
                  <label style={labelStyle} htmlFor="lastName">
                    Last name
                  </label>
                  <Field
                    type="text"
                    name="lastName"
                    className={"form-control"}
                    placeholder="Last Name"
                  />
                  {touched.lastName && errors.lastName && (
                    <span className="help-block text-danger">
                      {errors.lastName}
                    </span>
                  )}
                </div>
                <div className="form-group">
                  <label style={labelStyle} htmlFor="email">
                    Email
                  </label>
                  <Field
                    type="text"
                    name="email"
                    className={"form-control"}
                    placeholder="Email"
                    onChange={(e: any) => {
                      const { value } = e.target;
                      setFieldValue("email", value);
                      setStatus({
                        userName: status.userName,
                        password: status.password,
                        email: "",
                      });
                    }}
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
                    onChange={(e: any) => {
                      const { value } = e.target;
                      setFieldValue("password", value);
                      setStatus({
                        email: status.email,
                        userName: status.userName,
                        password: "",
                      });
                    }}
                  />
                  {touched.password && errors.password && (
                    <span className="help-block text-danger">
                      {errors.password}
                    </span>
                  )}
                </div>
                {status && status.userName && (
                  <Alert variant="danger">{status.userName}</Alert>
                )}
                {status && status.email && (
                  <Alert variant="danger">{status.email}</Alert>
                )}
                {status && status.password && (
                  <Alert variant="danger">{status.password}</Alert>
                )}
                {!isSubmitting && (
                  <Button
                    disabled={!dirty || !isValid}
                    variant="primary"
                    type="submit"
                  >
                    Register
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
                    Register
                  </Button>
                )}
                <LinkContainer to="/login">
                  <Button className="ml-2" variant="danger">
                    Go back to login
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
