import React, { useState, useRef } from "react";
import { Link, Redirect } from "react-router-dom";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { Growl } from "primereact/growl";
import { Message } from "primereact/message";
import validate from "../validation/loginForm";
import auth from "../services/authService";

const Login = props => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [unError, setUnError] = useState();
  const [pwError, setPwError] = useState();

  const growl = useRef();

  const handleClick = async () => {
    setUnError("");
    setPwError("");
    const { error } = validate({ username, password });
    if (error) {
      error.details.forEach(i => {
        i.path[0] === "username"
          ? setUnError(i.message)
          : setPwError(i.message);
      });
      return;
    }
    console.log("call to server..., redirect");
    try {
      await auth.login(username, password);
      const { state } = props.location;
      window.location = state ? state.from.pathname : "/";
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        setUnError(ex.response.data);
      }
    }
  };

  const changePassword = () => {
    console.log("change password...");
  };

  if (auth.getCurrentUser()) return <Redirect to="/" />;
  return (
    <div className="p-grid p-justify-center">
      <Growl ref={el => (growl.current = el)} />
      <Card className="p-fluid" style={{ padding: "2em" }} title="Login">
        <div className="p-col">
          <InputText
            name="username"
            value={username}
            placeholder="Username"
            onChange={e => setUsername(e.target.value)}
          />
          {unError && <Message severity="error" text={unError}></Message>}
        </div>
        <div className="p-col" style={{ marginBottom: "10px" }}>
          <InputText
            name="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          {pwError && <Message severity="error" text={pwError}></Message>}
        </div>
        <div className="p-col" style={{ marginBottom: "5px" }}>
          <Button
            style={{ marginBottom: "15px" }}
            label="Sign In"
            icon="pi pi-user"
            onClick={handleClick}
          />
          <Button
            label="Forgot Password?"
            icon="pi pi-question-circle"
            onClick={changePassword}
          />
        </div>
        <div className="p-col">
          <span>
            {`Dont even an account yet?`} <Link to="/register">Sign up</Link>
            {" now"}
          </span>
        </div>
      </Card>
    </div>
  );
};

export default Login;
