import React, { useContext, useState } from "react";
import { observer } from "mobx-react-lite";
import { Button, Modal } from "react-bootstrap";
import { Form, Formik } from "formik";
import { BaseStoreContext } from "../../stores/BaseStore";
import LoginForm from "../user/LoginForm";
import AddItemForm from "./AddItemForm";

export default observer(function AddItemsModal() {
  const baseStore = useContext(BaseStoreContext);
  const { isShowing, setShow } = baseStore.modalStore;

  return (
    <Modal
      dialogAs={AddItemForm}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      show={isShowing}
      onHide={() => setShow(false)}
    >
      <Modal.Dialog size="lg" />
    </Modal>
  );
});
