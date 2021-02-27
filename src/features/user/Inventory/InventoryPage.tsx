import { observer } from "mobx-react-lite";
import React, { Fragment, useContext } from "react";
import { BaseStoreContext } from "../../../stores/BaseStore";

export default observer(function InventoryPage() {
  const baseStore = useContext(BaseStoreContext);
  const { user } = baseStore.userStore;

  return <Fragment>{user?.email}</Fragment>;
});
