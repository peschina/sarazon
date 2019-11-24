import Joi from "@hapi/joi";

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
    .min(8)
    .required(),
  c_password: Joi.ref("password")
});

const validate = obj => schema.validate(obj, { abortEarly: false });
export default validate;
