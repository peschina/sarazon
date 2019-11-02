import React, { useState, useRef, useEffect } from "react";
import { Dialog } from "primereact/dialog";
import { Card } from "primereact/card";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { Button } from "primereact/button";
import { Growl } from "primereact/growl";
import { Message } from "primereact/message";
import { validateInput } from "../validation/profileForm";
import { showMessage } from "./../utils";

const Profile = () => {
  const [user, setUser] = useState({
    username: "Sara",
    email: "example@gmail.com",
    phone: "3881775564",
    password: "********"
  });
  const [input, setInput] = useState("");
  const [c_input, setC_Input] = useState("");
  const [dialog, setDialog] = useState({
    username: false,
    email: false,
    password: false
  });
  const [errors, setErrors] = useState({});

  const growl = useRef();
  const errorsRef = useRef(errors);
  const userRef = useRef(user);
  const dialogRef = useRef(dialog);

  useEffect(() => {
    errorsRef.current = errors;
  }, [errors]);

  useEffect(() => {
    userRef.current = user;
  }, [user]);

  useEffect(() => {
    dialogRef.current = dialog;
  }, [dialog]);

  useEffect(() => {
    setErrors({});
    setInput("");
    setC_Input("");
  }, [dialog]);

  const handleSave = value => {
    setErrors({});
    let error = validateInput(value, input, errorsRef, setErrors, input);
    if (value === "email")
      error = validateInput("c_email", c_input, errorsRef, setErrors, input);
    if (value === "password")
      error = validateInput("c_password", c_input, errorsRef, setErrors, input);
    if (error) return;

    let user = { ...userRef.current };
    user[value] = input;
    setUser(user);
    // save changes in db
    // if put is successful display alert
    showMessage(growl, "success", `${value} updated successfully`);
    handleToggleDialog(value);
  };

  const handleToggleDialog = value => {
    let dialog = { ...dialogRef.current };
    dialog[value] = !dialog[value];
    setDialog(dialog);
    // save changes in db
  };

  const renderCard = (label, value) => (
    <Card className="p-col">
      <div className="p-grid p-col-12">
        <div className="p-col-9">
          <div className="p-col" style={{ fontWeight: "bold" }}>
            {label}:
          </div>
          <div className="p-col">{value}</div>
        </div>
        <div className="p-col-3">
          <Button
            label="Edit"
            onClick={() => handleToggleDialog(label.toLowerCase())}
          ></Button>
        </div>
      </div>
    </Card>
  );

  const renderDialog = label => (
    <Dialog
      header={`Edit your ${label}`}
      visible={dialog[label]}
      modal={true}
      onHide={() => handleToggleDialog(label)}
    >
      <div className="p-col">
        <span>
          {`You can change the ${label} associated with your account.`}
          <br></br>
          When you have finished, please click on the button to save changes.
        </span>
      </div>
      <div className="p-col">
        <label style={{ fontWeight: "bold" }}>{`New ${label}`}</label>
      </div>
      <div className="p-col">
        {label !== "password" ? (
          <InputText value={input} onChange={e => setInput(e.target.value)} />
        ) : (
          <Password value={input} onChange={e => setInput(e.target.value)} />
        )}
        {errors[label] && (
          <Message severity="error" text={errors[label]}></Message>
        )}
      </div>
      {label !== "username" && (
        <>
          <div className="p-col">
            <label style={{ fontWeight: "bold" }}>{`Confirm ${label}`}</label>
          </div>
          <div className="p-col">
            {label === "email" ? (
              <InputText
                value={c_input}
                onChange={e => setC_Input(e.target.value)}
              />
            ) : (
              <Password
                value={c_input}
                onChange={e => setC_Input(e.target.value)}
              />
            )}
            {label === "email"
              ? errors.c_email && (
                  <Message severity="error" text={errors.c_email}></Message>
                )
              : errors.c_password && (
                  <Message severity="error" text={errors.c_password}></Message>
                )}
          </div>
        </>
      )}
      <div className="p-col">
        <Button label="Save" onClick={() => handleSave(label)} />
      </div>
    </Dialog>
  );

  return (
    <div className="p-grid p-justify-center">
      <Growl ref={el => (growl.current = el)} />
      <div className="p-col-12 p-md-6 p-lg-4">
        {renderCard("Username", user.username)}
        {renderCard("Email", user.email)}
        {renderCard("Password", user.password)}
      </div>
      {renderDialog("username")}
      {renderDialog("email")}
      {renderDialog("password")}
    </div>
  );
};

export default Profile;
