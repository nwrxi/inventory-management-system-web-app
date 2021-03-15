import { observer } from "mobx-react-lite";
import React, { useContext, useEffect, CSSProperties, Fragment } from "react";
import { Row, Col, Button, Image } from "react-bootstrap";
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

  if (userLoading) return <Loading />;

  return (
    <Fragment>
      {selectedUser && (
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
                      {selectedUser.firstName} {selectedUser.lastName}
                    </h4>
                    <div>{selectedUser.email}</div>
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
