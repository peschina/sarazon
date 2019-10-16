import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import Joi from "@hapi/joi";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { Growl } from "primereact/growl";
import { Message } from "primereact/message";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [unError, setUnError] = useState();
  const [pwError, setPwError] = useState();

  const growl = useRef();

  const formSchema = Joi.object({
    username: Joi.string()
      .min(4)
      .max(50)
      .required(),
    password: Joi.string()
      .min(5)
      .max(12)
      .required()
  });

  const login = () => {
    setUnError("");
    setPwError("");
    const { error } = validateForm({ username, password });
    if (error) {
      const alerts = error.details.map(i => {
        i.path[0] === "username"
          ? setUnError(i.message)
          : setPwError(i.message);
      });
      return;
    }
    console.log("call to server..., redirect");
  };

  const changePassword = () => {
    console.log("change password...");
  };

  const validateForm = obj => formSchema.validate(obj, { abortEarly: false });

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
            onClick={login}
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
