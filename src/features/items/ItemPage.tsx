import { observer } from "mobx-react-lite";
import { useContext, useEffect, CSSProperties, Fragment } from "react";
import { Row, Col, Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { history } from "../..";
import Loading from "../../layout/Loading";
import { BaseStoreContext } from "../../stores/BaseStore";

export default observer(function ItemPage(id: any) {
  const baseStore = useContext(BaseStoreContext);
  const {
    getItem,
    deleteItem,
    selectedItem,
    itemLoading,
  } = baseStore.itemStore;
  const { user } = baseStore.userStore;
  const { setEditShow } = baseStore.modalStore;

  useEffect(() => {
    try {
      getItem(id);
    } catch (error) {
      console.log(error);
    }
  }, [getItem, id]);

  const style: CSSProperties = {
    width: "55vh",
  };

  if (itemLoading) return <Loading />;

  return (
    <Fragment>
      {selectedItem && (
        <div className="container d-flex justify-content-center ">
          <Card style={style} className="p-5 w-75 text-center">
            <Row>
              <Col>
                <div className="align-items-center">
                  <div className="ml-3 w-100">
                    <h4 className="mb-0 mt-0">
                      Item name: {selectedItem.name}
                    </h4>
                    
                    {selectedItem.description &&
                    <div> <hr /> Description: {selectedItem.description}</div>
                    }
                    <hr />
                    <div>Barcode: {selectedItem.barcode}</div>
                    <hr />
                    <div>
                      Added on:{" "}
                      {selectedItem.dateAdded.toLocaleDateString() +
                        " " +
                        selectedItem.dateAdded.toLocaleTimeString()}
                    </div>
                    <hr />
                    <div>
                      Added by:{" "}
                      <Link to={`/account/${selectedItem.user.id}`}>
                        {selectedItem.addedBy}
                      </Link>
                    </div>
                    <hr />
                    {(selectedItem.user.id === user!.id ||
                      user!.isAdmin === "True") && (
                      <div>
                        <Button
                          onClick={() => setEditShow(true)}
                          variant="primary"
                        >
                          Edit
                        </Button>
                        <Button
                          style={{ margin: "0 0 0 2vh" }}
                          onClick={() => {
                            deleteItem(selectedItem.id);
                            history.push(`/inventory`);
                          }}
                          variant="danger"
                        >
                          Delete
                        </Button>
                      </div>
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
