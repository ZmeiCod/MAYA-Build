import React from "react";
import { Button, Card, Container, Form, Row } from "react-bootstrap";
import "../index.css";

import { observer } from "mobx-react-lite";
// import { useNavigate } from "react-router-dom";
import { Context } from "../index";
import { ROUTE_HOME } from "../utils/consts";
import { useNavigate } from "react-router-dom";

const Auth = observer(() => {
  const navigate = useNavigate();

  const { user } = React.useContext(Context);

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const login = async () => {
    try {
      let data = user.login(email, password)
      if (data) {
        navigate(ROUTE_HOME)
      }
    } catch (e) {
      console.log(e)
    }
  }
  
  return (
    <Container
      className="d-flex justify-content-center align-items-center"
      style={{ height: window.innerHeight - 54 }}
    >
      <Card style={{ width: 600 }} className="p-5">
        <h2 className="m-auto">Авторизация</h2>
        <Form>
          <Form.Control
            className="mt-3 form-control-custom"
            placeholder="Введите ваш email..."
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Form.Control
            className="mt-3 form-control-custom"
            placeholder="Введите ваш пароль..."
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
          />
          <Row
            className="d-flex justify-content-center mt-3 pl-3 pr-3"
            style={{ marginRight: 0, marginLeft: 0 }}
          >
            <Button
              className="BTN"
              onClick={login}
              variant={"outline-none"}
            >
              Войти
            </Button>
          </Row>
        </Form>
      </Card>
    </Container>
  );
});

export default Auth;
