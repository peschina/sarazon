import React, { useState, useRef } from "react";
import Joi from "@hapi/joi";
import { Card } from "primereact/card";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { Button } from "primereact/button";
import { Growl } from "primereact/growl";
import { showMultiple } from "../utils";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [c_email, setC_email] = useState("");
  const [password, setPassword] = useState("");
  const [c_password, setC_password] = useState("");

  const growl = useRef();

  const schema = Joi.object({
    username: Joi.string()
      .min(2)
      .max(200)
      .required(),
    email: Joi.string()
      .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
      .required(),
    c_email: Joi.ref("email"),
    password: Joi.string()
      .min(5)
      .max(12)
      .required(),
    c_password: Joi.ref("password")
  });

  const validate = obj => schema.validate(obj, { abortEarly: false });

  const save = () => {
    const { error } = validate({
      username,
      email,
      c_email,
      password,
      c_password
    });
    if (error) {
      const alerts = error.details.map(i => ({
        severity: "error",
        summary: "Invalid input",
        detail: i.message
      }));
      showMultiple(growl, alerts);
    }
    console.log("save data...");
  };

  const renderInputText = (label, value, handleChange) => (
    <div className={"p-col-12"}>
      <span className="p-float-label">
        <InputText
          id={label}
          value={value}
          onChange={e => handleChange(e.target.value)}
        />
        <label htmlFor={label}>{label}</label>
      </span>
    </div>
  );

  const renderInputPassword = (label, value, handleChange) => (
    <div className={"p-col-12"}>
      <span className="p-float-label">
        <Password
          id={label}
          value={value}
          onChange={e => handleChange(e.target.value)}
        />
        <label htmlFor={label}>{label}</label>
      </span>
    </div>
  );

  return (
    <>
      <div className="p-grid p-justify-center">
        <Growl ref={el => (growl.current = el)} />
        <div className="p-col-12 p-md-8 p-lg-3">
          <Card
            className="p-fluid"
            style={{ padding: "1em" }}
            title="Create an account"
          >
            <div className="p-grid p-justify-center">
              {renderInputText("Username", username, setUsername)}
              {renderInputText("Email", email, setEmail)}
              {renderInputText("Confirm Email", c_email, setC_email)}
              {renderInputPassword("Password", password, setPassword)}
              {renderInputPassword(
                "Confirm Password",
                c_password,
                setC_password
              )}
              <div className="p-col">
                <Button label="Register" onClick={save} />
              </div>
            </div>
          </Card>
        </div>
      </div>
    </>
  );
};

export default Register;
