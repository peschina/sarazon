import Joi from "@hapi/joi";

const schema = Joi.object({
  name: Joi.string()
    .min(2)
    .max(200)
    .required(),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
    .required(),
  message: Joi.string()
    .min(2)
    .max(250)
    .required()
});

const validate = obj => schema.validate(obj, { abortEarly: false });

export default validate;
