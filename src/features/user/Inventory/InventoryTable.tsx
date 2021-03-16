import MaterialTable from "material-table";
import { observer } from "mobx-react-lite";
import { useContext } from "react";
import { history } from "../../..";
import { BaseStoreContext } from "../../../stores/BaseStore";

export default observer(function InventoryTable() {
  const baseStore = useContext(BaseStoreContext);
  const { itemsMap, itemsLoading } = baseStore.itemStore;

  return (
    <MaterialTable
      isLoading={itemsLoading}
      title="Inventory"
      columns={[
        { title: "Item name", field: "name" },
        { title: "Barcode", field: "barcode" },
        { title: "Date added", field: "dateAdded", type: "date" },
        { title: "Added by", field: "addedBy" },
      ]}
      data={Array.from(itemsMap.values())}
      actions={[
        {
          icon: "more_horiz",
          tooltip: "Show Item Details",
          onClick: (event, rowData) => alert(rowData.id),
        },
        {
          icon: "account_circle",
          tooltip: "Show User Details",
          onClick: (event, rowData) =>
            history.push(`account/${rowData.user.id}`),
        },
      ]}

      // detailPanel={(rowData) => {
      //   return (
      //     <iframe
      //       title="inventoryDetails"
      //       width="100%"
      //       height="315"
      //       src="https://www.youtube.com/embed/C0DPdy98e4c"
      //       frameBorder="0"
      //       allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
      //       allowFullScreen
      //     />
      //   );
      // }}
    />
  );
});
