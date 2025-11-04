import Joi from 'joi';

const registerUserSchema = Joi.object({
  name: Joi.string()
    .min(3)
    .max(100)
    .required()
    .messages({
      'string.base': 'Name must be a string.',
      'string.min': 'Name must be at least 3 characters long.',
      'string.max': 'Name must not exceed 100 characters.',
      'any.required': 'Name is required.',
    }),
  email: Joi.string()
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
      'string.base': 'Password must be a text string.',
      'string.min': 'Password must be at least 4 characters long.',
      'string.max': 'Password must not exceed 16 characters.',
      'any.required': 'Password is required.',
    }),
  confirmPassword: Joi.any()
    .valid(Joi.ref('password'))
    .required()
    .messages({
      'string.base': 'Password confirmation must be a string.',
      'string.min': 'Password confirmation must be at least 4 characters long.',
      'string.max': 'Password confirmation must not exceed 16 characters.',
      'any.only': 'Password confirmation does not match.',
      'any.required': 'Password confirmation is required.',
    }),
});

export default registerUserSchema;
