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
import { updateUsername } from "../services/profileService";
import { getUser } from "../services/userService";

const Profile = () => {
  const [user, setUser] = useState({
    // username: "Sara",
    // email: "example@gmail.com",
    // password: "********"
  });
  const [input, setInput] = useState("");
  const [c_input, setC_Input] = useState("");
  const [dialog, setDialog] = useState({
    username: false,
    password: false
  });
  const [errors, setErrors] = useState({});

  const growl = useRef();
  const errorsRef = useRef(errors);
  const userRef = useRef(user);
  const dialogRef = useRef(dialog);

  useEffect(() => {
    const getProfile = async () => {
      const { data } = await getUser();
      const { username, email } = data;
      const user = {
        username,
        email,
        password: "********"
      };
      setUser(user);
    };
    getProfile();
  }, []);

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

  const handleSave = async value => {
    setErrors({});
    let error = validateInput(value, input, errorsRef, setErrors, input);
    if (value === "password")
      error = validateInput("c_password", c_input, errorsRef, setErrors, input);
    if (error) return;

    let user = { ...userRef.current };
    user[value] = input;
    setUser(user);
    // save changes in db
    const { status } = await updateUsername(input);
    if (status === 200)
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
          <div className="p-col bold">{label}:</div>
          <div className="p-col">{value}</div>
        </div>
        {label !== "Email" && (
          <div className="p-col-3">
            <Button
              label="Edit"
              onClick={() => handleToggleDialog(label.toLowerCase())}
            ></Button>
          </div>
        )}
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
        <label className="bold">{`New ${label}`}</label>
      </div>
      <div className="p-col">
        {label === "username" ? (
          <InputText value={input} onChange={e => setInput(e.target.value)} />
        ) : (
          <Password value={input} onChange={e => setInput(e.target.value)} />
        )}
        {errors[label] && (
          <Message severity="error" text={errors[label]}></Message>
        )}
      </div>
      {label === "password" && (
        <>
          <div className="p-col">
            <label className="bold">{`Confirm ${label}`}</label>
          </div>
          <div className="p-col">
            <Password
              value={c_input}
              onChange={e => setC_Input(e.target.value)}
            />
            {errors.c_password && (
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
        {renderCard("Email", user.email)}
        {renderCard("Username", user.username)}
        {renderCard("Password", user.password)}
      </div>
      {renderDialog("username")}
      {renderDialog("password")}
    </div>
  );
};

export default Profile;
