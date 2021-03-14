import { observer } from "mobx-react-lite";
import { CSSProperties, Fragment, useContext } from "react";
import { Button, Col, Image, Row } from "react-bootstrap";
import { BaseStoreContext } from "../../stores/BaseStore";

export default observer(function AccountPage() {
  const baseStore = useContext(BaseStoreContext);
  const { user } = baseStore.userStore;

  const style: CSSProperties = {
    width: "55vh",
  };

  return (
    <Fragment>
      {user && (
        <div className="container d-flex justify-content-center">
          <div style={style} className="card p-5">
            <Row>
              <Col xs={7} md={5}>
                <div className="image">
                  <Image
                    src="https://react-bootstrap-v3.netlify.app/thumbnail.png"
                    rounded
                    fluid
                  />
                </div>
              </Col>
              <Col xs={6} md={5}>
                <div className="align-items-center">
                  <div className="ml-3 w-100">
                    <h4 className="mb-0 mt-0">
                      {user.firstName} {user.lastName}
                    </h4>
                    <div>{user.email}</div>
                    <hr />
                    <Button variant="outline-primary">
                      Search for items added by user
                    </Button>
                  </div>
                </div>
              </Col>
            </Row>
          </div>
        </div>
      )}
    </Fragment>
  );
});
