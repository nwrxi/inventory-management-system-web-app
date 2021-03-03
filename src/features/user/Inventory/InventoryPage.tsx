import { observer } from "mobx-react-lite";
import React, { useContext, useEffect } from "react";
import { BaseStoreContext } from "../../../stores/BaseStore";
import InventoryTable from "./InventoryTable";

export default observer(function InventoryPage() {
  const baseStore = useContext(BaseStoreContext);
  const { getItems, setItemsLoading } = baseStore.itemStore;

  useEffect(() => {
    setItemsLoading(true);
    getItems().finally(() => setItemsLoading(false));
  }, [getItems, setItemsLoading]);

  return <InventoryTable />;
});
