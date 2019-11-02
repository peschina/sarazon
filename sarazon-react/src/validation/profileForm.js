import Joi from "@hapi/joi";

export const validateInput = (path, field, ref, setErrors, input) => {
  const schema = {
    username: Joi.string()
      .min(2)
      .max(200)
      .required(),
    email: Joi.string()
      .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
      .required(),
    c_email: Joi.any().valid(input),
    password: Joi.string()
      .min(5)
      .max(12)
      .required(),
    c_password: Joi.any()
      .valid(input)
      .required()
  };

  const { error } = validate(schema[path], field);
  if (error) {
    let errs = { ...ref.current };
    errs[path] = error.details[0].message;
    setErrors(errs);
  }
  return error;
};

const validate = (schema, obj) => schema.validate(obj);
