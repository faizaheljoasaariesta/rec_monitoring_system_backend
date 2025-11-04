import Joi from 'joi';

const loginUserSchema = Joi.object({
  username: Joi.string()
    .email({ tlds: false })
    .regex(/^[^@]+@(mail\.ugm\.ac\.id|ugm\.ac\.id)$/)
    .required()
    .messages({
      'string.base': 'Email must be a string.',
      'string.email': 'Email must be in a valid format.',
      'string.pattern.base': 'Email is only allowed with the domain @rectech-global.com',
      'any.required': 'Email is required.',
    }),
  password: Joi.string()
    .min(4)
    .max(16)
    .required()
    .messages({
      'string.base': 'Passcode must be a text string.',
      'string.min': 'Passcode must be at least 4 characters long.',
      'string.max': 'Passcode must not exceed 16 characters.',
      'any.required': 'Passcode is required.',
    }),
});

export default loginUserSchema;
