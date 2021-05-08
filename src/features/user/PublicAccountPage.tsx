import { Card } from "@material-ui/core";
import { observer } from "mobx-react-lite";
import React, { useContext, useEffect, CSSProperties, Fragment } from "react";
import { Row, Col, Button, Image } from "react-bootstrap";
import { isMobile } from "react-device-detect";
import { history } from "../..";
import Loading from "../../layout/Loading";
import { BaseStoreContext } from "../../stores/BaseStore";

export default observer(function PublicAccountPage(id: any) {
  const baseStore = useContext(BaseStoreContext);
  const { getUserAtId, selectedUser, userLoading } = baseStore.userStore;

  useEffect(() => {
    try {
      getUserAtId(id);
    } catch (error) {
      console.log(error);
    }
  }, [getUserAtId, id]);

  const style: CSSProperties = {
    width: "55vh",
  };

  const btnStyle: CSSProperties = {
    width: "50%",
    height: "50%",
    margin: "0",
    position: "absolute",
    top: "50%",
    transform: "translateY(-50%)",
    msTransform: "translateY(-50%)",
  };

  if (userLoading) return <Loading />;

  return (
    <Fragment>
      {selectedUser && (
        <div className="container d-flex justify-content-center">
          <Card style={style} className="p-5 w-75">
            <Row>
              <Col xs={7} md={5}>
                {!isMobile && (
                  <div className="d-flex justify-content-center align-items-center">
                    <Button
                      style={btnStyle}
                      onClick={() =>
                        history.push(
                          `/inventory/${
                            selectedUser.firstName + " " + selectedUser.lastName
                          }`
                        )
                      }
                      variant="outline-primary"
                    >
                      Search for items added by user
                    </Button>
                  </div>
                )}
                {/* <div className="image">
                  <Image
                    src="https://react-bootstrap-v3.netlify.app/thumbnail.png"
                    rounded
                    fluid
                  />
                </div> */}
              </Col>
              <Col xs={6} md={5}>
                <div className="align-items-center">
                  <div className="ml-3 w-100">
                    <h4 className="mb-0 mt-0">
                      {selectedUser.firstName} {selectedUser.lastName}
                    </h4>
                    <hr />
                    <div>Email: {selectedUser.email}</div>
                    <hr />
                    <div>
                      Role:
                      {selectedUser.isAdmin === "True" && " Administrator"}
                      {selectedUser.isAdmin === "False" && " User"}
                    </div>
                    <hr />
                    {isMobile && (
                      <Button
                        onClick={() =>
                          history.push(
                            `/inventory/${
                              selectedUser.firstName +
                              " " +
                              selectedUser.lastName
                            }`
                          )
                        }
                        variant="outline-primary"
                      >
                        Search for items added by user
                      </Button>
                    )}
                  </div>
                </div>
              </Col>
            </Row>
          </Card>
        </div>
      )}
    </Fragment>
  );
});
