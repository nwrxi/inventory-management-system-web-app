import { observer } from "mobx-react-lite";
import React, { useContext, useEffect } from "react";
import { RouteComponentProps } from "react-router";
import { history } from "../../..";
import { BaseStoreContext } from "../../../stores/BaseStore";
import InventoryTable from "./InventoryTable";

type TParams = { searchData: string };

export default observer(function InventoryPage({
  match,
}: RouteComponentProps<TParams>) {
  const baseStore = useContext(BaseStoreContext);
  const { getItems, setItemsLoading } = baseStore.itemStore;

  useEffect(() => {
    setItemsLoading(true);
    getItems().finally(() => setItemsLoading(false));
  }, [getItems, setItemsLoading]);

  return <InventoryTable searchData={match.params.searchData} />;
});
