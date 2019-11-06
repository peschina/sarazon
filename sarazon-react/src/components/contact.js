import React, { useState, useRef, useEffect } from "react";
import { Card } from "primereact/card";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { InputTextarea } from "primereact/inputtextarea";
import { Growl } from "primereact/growl";
import { Message } from "primereact/message";
import validate from "../validation/contactForm";

const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState({});

  const growl = useRef();

  const errorsRef = useRef(errors);

  useEffect(() => {
    errorsRef.current = errors;
  }, [errors]);

  const { name: nameErr, email: emErr, message: msgErr } = errors;

  const save = () => {
    setErrors({});

    const { error } = validate({
      name,
      email,
      message
    });
    if (error) {
      let errs = { ...errorsRef };
      error.details.map(i => (errs[i.path[0]] = i.message));
      setErrors(errs);
    }
    console.log("save data...");
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

  return (
    <>
      <div className="p-grid p-justify-center">
        <Growl ref={el => (growl.current = el)} />
        <div className="p-col-12 p-md-8 p-lg-5">
          <Card
            className="p-fluid"
            style={{ padding: "2em", textAlign: "center" }}
            title="Contact us"
          >
            <div className="p-grid p-justify-center">
              {renderInputText("Name", name, nameErr, setName)}
              {renderInputText("Email", email, emErr, setEmail)}
              <div className={"p-col-12"}>
                <InputTextarea
                  placeholder={"Message"}
                  value={message}
                  rows={8}
                  onChange={e => setMessage(e.target.value)}
                />
                {msgErr && <Message severity="error" text={msgErr}></Message>}
              </div>
              <div className="p-col-3">
                <Button label="Send" onClick={save} />
              </div>
            </div>
          </Card>
        </div>
      </div>
    </>
  );
};

export default Contact;
