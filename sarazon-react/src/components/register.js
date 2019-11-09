import React, { useState, useRef, useEffect } from "react";
import { Card } from "primereact/card";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { Button } from "primereact/button";
import { Growl } from "primereact/growl";
import { Message } from "primereact/message";
import validate from "../validation/registerForm";
import * as userService from "../services/userService";
import auth from "../services/authService";

const Register = props => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [c_email, setC_email] = useState("");
  const [password, setPassword] = useState("");
  const [c_password, setC_password] = useState("");
  const [errors, setErrors] = useState({});

  const growl = useRef();

  const errorsRef = useRef(errors);

  useEffect(() => {
    errorsRef.current = errors;
  }, [errors]);

  const {
    username: usErr,
    email: emErr,
    c_email: c_emErr,
    password: pwErr,
    c_password: c_pwErr
  } = errors;

  const save = async () => {
    setErrors({});

    const { error } = validate({
      username,
      email,
      c_email,
      password,
      c_password
    });
    if (error) {
      let errs = { ...errorsRef };
      error.details.map(i => (errs[i.path[0]] = i.message));
      setErrors(errs);
    }
    try {
      const response = await userService.register({
        username: username,
        email: email,
        password: password
      });
      auth.loginWithJwt(response.headers["x-auth-token"]);
      window.location = "/";
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        let errs = { ...errorsRef };
        errs.username = ex.response.data;
        setErrors(errs);
      }
    }
  };

  const renderInputText = (label, value, error, handleChange) => (
    <div className={"p-col-12"}>
      <InputText
        placeholder={label}
        onChange={e => handleChange(e.target.value)}
      />
      {error && <Message severity="error" text={error}></Message>}
    </div>
  );

  const renderInputPassword = (label, value, error, handleChange) => (
    <div className={"p-col-12"}>
      <Password
        placeholder={label}
        onChange={e => handleChange(e.target.value)}
      />
      {error && <Message severity="error" text={error}></Message>}
    </div>
  );

  return (
    <>
      <div className="p-grid p-justify-center">
        <Growl ref={el => (growl.current = el)} />
        <div className="p-col-12 p-md-8 p-lg-4">
          <Card
            className="p-fluid"
            style={{ padding: "1em" }}
            title="Create an account"
          >
            <div className="p-grid p-justify-center">
              {renderInputText("Username", username, usErr, setUsername)}
              {renderInputText("Email", email, emErr, setEmail)}
              {renderInputText("Confirm Email", c_email, c_emErr, setC_email)}
              {renderInputPassword("Password", password, pwErr, setPassword)}
              {renderInputPassword(
                "Confirm Password",
                c_password,
                c_pwErr,
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
