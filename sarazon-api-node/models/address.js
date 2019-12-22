const Joi = require("@hapi/joi");

const joiAddressesSchema = Joi.object({
  addresses: Joi.array()
    .items(Joi.string().required())
    .required()
});

const validate = addresses => joiAddressesSchema.validate(addresses);

exports.validate = validate;
exports.addressesSchema = joiAddressesSchema;
