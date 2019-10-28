import Joi from "@hapi/joi";

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

const validate = obj => schema.validate(obj, { abortEarly: false });

export default validate;
