import React, { useState, useContext } from "react";

// import compoents botstrap
import { Container, Navbar, Nav, Button, Image } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";

// import css
import "../css/NavbarPublic.css";

// import components
import ModalLogin from "./modal/ModalLogin";
import ModalRegister from "./modal/ModalRegister";

// import context
import { AppContext } from "../contexts/GlobalContext";

// import img
import LogoShapes from "../img/LogoShapes.png";
import Ellipse2 from "../img/Ellipse2.png";
import Vector1 from "../img/Vector1.png";
import Vector2 from "../img/Vector2.png";
import Vector3 from "../img/Vector3.png";
import Vector4 from "../img/Vector4.png";

export default function NavbarPublic({ stateLogin, setStateLogin }) {
  const router = useHistory();

  const [state, dispatch] = useContext(AppContext);
  const [loginShow, setLoginShow] = useState(false);
  const [registerShow, setRegisterShow] = useState(false);

  const onSwitchLogin = () => {
    setRegisterShow(false);
    setLoginShow(true);
  };

  const onSwitchRegister = () => {
    setRegisterShow(true);
    setLoginShow(false);
  };

  const handleLogout = () => {
    dispatch({
      type: "LOGOUT",
    });
    router.push("/");
  };

  return (
    <Navbar
      collapseOnSelect
      expand="lg"
      variant="dark"
      fixed="top"
      className="shadow Container"
      style={{ paddingTop: "20px", paddingBottom: "10px" }}
    >
      <Container fluid>
        <Navbar.Brand as={Link} to="/">
          <Image
            src={LogoShapes}
            style={{ marginRight: "10px", height: "25px", width: "auto" }}
          />
          <span style={{ color: "#EE4622" }}>DUMB</span>
          <span>SOUND</span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            {/* <Nav.Link
              as={Link}
              to="/product"
              style={{
                marginLeft: "10px",
                textAlign: "center",
              }}
            >
              Product
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/loading1"
              style={{
                marginLeft: "10px",
                textAlign: "center",
              }}
            >
              Test Loding 1
            </Nav.Link> */}
          </Nav>
          {/* <Nav.Link
            as={Link}
            to="/cart"
            style={{
              marginLeft: "10px",
              textAlign: "center",
              color: "#b8b8b8",
            }}
          >
            Cart: {state.carts.length}
          </Nav.Link> */}
          <Nav.Link
            style={{
              padding: "0",
              marginLeft: "15px",
            }}
          >
            <Button
              onClick={onSwitchLogin}
              variant=""
              size="sm"
              block
              style={{
                background: "",
                textAlign: "center",
                color: "#fff",
                paddingLeft: "37px",
                paddingRight: "37px",
                border: "1px solid #FFFFFF",
                borderRadius: "5px",
              }}
            >
              Login
            </Button>
          </Nav.Link>
          <Nav.Link
            style={{
              padding: "0",
              marginLeft: "15px",
            }}
          >
            <Button
              onClick={onSwitchRegister}
              variant=""
              size="sm"
              block
              style={{
                background: "#EE4622",
                textAlign: "center",
                color: "#fff",
                paddingLeft: "25px",
                paddingRight: "25px",
                border: "1px solid #EE4622",
                borderRadius: "5px",
              }}
            >
              Register
            </Button>
          </Nav.Link>

          {/* ModalLogin */}
          <ModalLogin
            loginShow={loginShow}
            setLoginShow={setLoginShow}
            setRegisterShow={setRegisterShow}
            stateLogin={stateLogin}
            setStateLogin={setStateLogin}
          />
          {/* EndModalLogin */}

          {/* ModalRegister */}
          <ModalRegister
            registerShow={registerShow}
            setRegisterShow={setRegisterShow}
            setLoginShow={setLoginShow}
          />
          {/* EndModalRegister */}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
