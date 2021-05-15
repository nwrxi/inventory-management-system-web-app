import { Card } from "@material-ui/core";
import { observer } from "mobx-react-lite";
import { CSSProperties, Fragment, useContext } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { isMobile } from "react-device-detect";
import { history } from "../..";
import { BaseStoreContext } from "../../stores/BaseStore";

export default observer(function AccountPage() {
  const baseStore = useContext(BaseStoreContext);
  const { user } = baseStore.userStore;

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

  return (
    <Fragment>
      {user && (
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
                          `/inventory/${user.firstName + " " + user.lastName}`
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
              <Col>
                <div className="align-items-center">
                  <div className="ml-3 w-100">
                    <h4 className="mb-0 mt-0">
                      {user.firstName} {user.lastName}
                    </h4>
                    <hr />
                    <div>Email: {user.email}</div>
                    <hr />
                    <div>
                      Role:
                      {user.isAdmin === "True" && " Administrator"}
                      {user.isAdmin === "False" && " User"}
                    </div>
                    <hr />
                    {isMobile && (
                      <Button
                        onClick={() =>
                          history.push(
                            `/inventory/${user.firstName + " " + user.lastName}`
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
