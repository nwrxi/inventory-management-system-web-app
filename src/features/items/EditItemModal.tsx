import { useContext } from "react";
import { observer } from "mobx-react-lite";
import { Modal } from "react-bootstrap";
import { BaseStoreContext } from "../../stores/BaseStore";
import EditItemForm from "./EditItemForm";

export default observer(function EditItemsModal() {
  const baseStore = useContext(BaseStoreContext);
  const { isEditShowing, setEditShow } = baseStore.modalStore;

  return (
    <Modal
      dialogAs={EditItemForm}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      show={isEditShowing}
      onHide={() => setEditShow(false)}
    >
      <Modal.Dialog size="lg" />
    </Modal>
  );
});
