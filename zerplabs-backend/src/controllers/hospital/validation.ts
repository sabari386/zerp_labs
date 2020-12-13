import * as Joi from '@hapi/joi';

export const patientCreateSchema = Joi.object().keys({
  
  fullname: Joi.string().min(3).max(15).allow("").required().messages({
    "string.base": `class name should be a type of 'text'`,
    "string.empty": `class name cannot be an empty field`,
    "string.min": `class name should have a minimum length of {#limit}`,
    "string.max": `class name should have a maximum length of {#limit}`,
    "any.required": `class name is a required field`
  }),
  age: Joi.string().required().messages({
    "number.base": `age should be a type of 'string'`,
    "number.empty": `age cannot be an empty field`,
    "number.min": `age should have a minimum length of {#limit}`,
    "number.required": `age is a required field`
  }),
  gender: Joi.string().required().messages({
    "string.base": `subject should be a type of 'text'`,
    "string.empty": `subject cannot be an empty field`,
    "any.required": `subject is a required field`
  }),
  mobileNo: Joi.string().required().messages({
    "number.base": `phone number should be a type of 'number'`,
    "number.empty": `phone number cannot be an empty field`,
    "number.min": `phone number should have a minimum length of {#limit}`,
    "any.required": `phone number is a required field`
  }),
  email: Joi.string().required().messages({
    "string.base": `email should be a type of 'text'`,
    "string.empty": `email cannot be an empty field`,
    "string.email": `email must be valid`,
    "any.required": `email is a required field`
  }),
  address: Joi.string().required().messages({
    "string.base": `subject should be a type of 'text'`,
    "string.empty": `subject cannot be an empty field`,
    "any.required": `subject is a required field`
  })
});