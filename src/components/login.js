import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import Joi from "@hapi/joi";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { Growl } from "primereact/growl";
import { showMultiple } from "./../utils";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const growl = useRef();

  const schema = Joi.object({
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
    const { error } = validate({ username, password });
    if (error) {
      const alerts = error.details.map(i => ({
        severity: "error",
        summary: "Invalid input",
        detail: i.message
      }));
      showMultiple(growl, alerts);
    }
    console.log("call to server..., redirect");
  };

  const changePassword = () => {
    console.log("change password...");
  };

  const validate = obj => schema.validate(obj, { abortEarly: false });

  return (
    <div className="p-grid p-justify-center">
      <Growl ref={el => (growl.current = el)} />
      <Card className="p-fluid" style={{ padding: "2em" }} title="Login">
        <div className="p-col">
          <InputText
            value={username}
            placeholder="Username"
            onChange={e => setUsername(e.target.value)}
          />
        </div>
        <div className="p-col" style={{ marginBottom: "10px" }}>
          <InputText
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
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
