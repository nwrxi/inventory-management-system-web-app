import { observer } from "mobx-react-lite";
import React, { Fragment, useContext, useEffect } from "react";
import { BaseStoreContext } from "../../../stores/BaseStore";

export default observer(function InventoryPage() {
  const baseStore = useContext(BaseStoreContext);
  const { setLoading } = baseStore.commonStore;
  const { user } = baseStore.userStore;
  const { getItems, itemsMap } = baseStore.itemStore;

  useEffect(() => {
    setLoading(true);
    getItems();
    setLoading(false);
  }, [getItems, setLoading]);

  return <Fragment>{user?.email}</Fragment>;
});
