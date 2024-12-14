const { z } = require("zod");

const email = z.string().email();
const full_name = z.string().min(1);
const password = z
  .string()
  .min(8)
  .regex(/[A-Z/]/)
  .regex(/[a-z]/)
  .regex(/[0-9]/);

const registerSchema = z.object({
  email,
  full_name,
  password,
});

const loginSchema = z.object({
  email,
  password,
});

const schemas = {
  registerSchema,
  loginSchema,
};

module.exports = schemas;
