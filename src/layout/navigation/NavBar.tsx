import { observer } from "mobx-react-lite";
import React, { useContext } from "react";
import { Navbar, Nav, NavDropdown, Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { BaseStoreContext } from "../../stores/BaseStore";

export default observer(function NavBar() {
  const baseStore = useContext(BaseStoreContext);
  const { user, logout } = baseStore.userStore;
  const { setShow } = baseStore.modalStore;

    return (
    <Navbar bg="light" expand="lg">
      <LinkContainer to="/inventory">
        <Navbar.Brand>Inventory Management System</Navbar.Brand>
      </LinkContainer>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <LinkContainer to="/inventory">
            <Button variant="primary" onClick={() => setShow(true)}>Add Item</Button>
          </LinkContainer>
          {/* <Nav.Link href="#link">Link</Nav.Link> */}
        </Nav>
        <NavDropdown alignRight title={user?.firstName} id="basic-nav-dropdown">
          <NavDropdown.Item href="#action/3.1">Account</NavDropdown.Item>
          <NavDropdown.Divider />
          <NavDropdown.Item onClick={() => logout()}>Logout</NavDropdown.Item>
        </NavDropdown>
      </Navbar.Collapse>
    </Navbar>
  );
});
