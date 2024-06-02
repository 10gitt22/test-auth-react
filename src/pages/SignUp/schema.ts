import { z } from "zod"

export const emailValidator = z.string().email()
export const passwordLengthValidator = z.string().min(8).max(64)

export const SignUpSchema = z.object({
  email: emailValidator,
  password: passwordLengthValidator,
}).superRefine((val, ctx) => {
  const atLeastOneUppercase = /[A-Z]/.test(val.password)
  const atLeastOneNumber = /\d/.test(val.password)

  if (!atLeastOneUppercase) {
    ctx.addIssue({
      code: 'custom',
      message: 'At least one uppercase letter',
    })
  }

  if (!atLeastOneNumber) {
    ctx.addIssue({
      code: 'custom',
      message: 'At least one digit',

    })
  }
})

export type SignUpSchemaType = z.infer<typeof SignUpSchema>