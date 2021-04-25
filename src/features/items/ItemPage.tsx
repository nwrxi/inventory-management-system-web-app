import { observer } from "mobx-react-lite";
import React, { useContext, useEffect, CSSProperties, Fragment } from "react";
import { Row, Col, Button, Image } from "react-bootstrap";
import { history } from "../..";
import Loading from "../../layout/Loading";
import { BaseStoreContext } from "../../stores/BaseStore";

export default observer(function ItemPage(id: any) {
  const baseStore = useContext(BaseStoreContext);
  const { getItem, selectedItem, itemLoading } = baseStore.itemStore;

  useEffect(() => {
    try {
      getItem(id);
    } catch (error) {
      console.log(error);
    }
  }, [getItem, id]);

  if (itemLoading) return <Loading />;

  return <Fragment>{selectedItem?.name}</Fragment>;
});
