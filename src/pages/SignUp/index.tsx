
import { useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { SubmitHandler, useForm, useWatch } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { cn } from '~/utils/classnames'
import { Input, PasswordInput } from '~/ui/Input'
import { Button } from '~/ui/Button'

import { SignUpSchema, emailValidator, passwordLengthValidator, type SignUpSchemaType } from './schema'
import { getHintColor, getInputVariant } from './utils'


export const SignUp = () => {
  const { register, formState: { touchedFields, dirtyFields }, control, handleSubmit } = useForm<SignUpSchemaType>({
    resolver: zodResolver(SignUpSchema),
    reValidateMode: 'onSubmit',
  })

  const navigate = useNavigate()

  const onSubmit: SubmitHandler<SignUpSchemaType> = (data) => {
    console.log(data)
    navigate('/home')
  }

  const email = useWatch({ control, name: 'email' })
  const password = useWatch({ control, name: 'password' })

  // EMAIL CHECKS
  const emailValid = useMemo(() => {
    const parsedData = emailValidator.safeParse(email)
    return parsedData.success
  }, [email])

  // PASSWORD CHECKS
  const passwordLengthValid = useMemo(() => {
    const parsedData = passwordLengthValidator.safeParse(password)
    return parsedData.success
  }, [password])

  const atLeastOneUppercase = useMemo(() => {
    return /[A-Z]/.test(password)
  }, [password])

  const atLeastOneDigit = useMemo(() => {
    return /\d/.test(password)
  }, [password])

  const noSpaces = useMemo(() => {
    return !/\s/.test(password)
  }, [password])

  const passwordHasError = useMemo(() => {
    return !passwordLengthValid || !atLeastOneUppercase || !atLeastOneDigit
  }, [passwordLengthValid, atLeastOneUppercase, atLeastOneDigit])

  return (
    <div className='flex justify-center items-center w-full min-h-screen'>
      <form className='flex flex-col justify-center items-center gap-[40px] min-w-[315px]' onSubmit={handleSubmit(onSubmit)}>
        <h3 className='font-bold text-[28px] text-clario-blue-400'>Sign up</h3>
        <div className='flex flex-col gap-[20px] w-full'>
          <Input type='email' {...register("email")} variant={getInputVariant(emailValid, !!dirtyFields.email, !!touchedFields.email)} placeholder='Email' />
          <PasswordInput {...register("password")} variant={getInputVariant(!passwordHasError, !!dirtyFields.password, !!touchedFields.password)} placeholder='Create your password' />
          <div className='flex flex-col px-[20px]'>
            <span className={cn('text-[13px] leading-[18px] transition-colors', getHintColor(passwordLengthValid, !!dirtyFields.password, !!touchedFields.password))}>Minimum of 8 and maximum of 64 characters</span>
            <span className={cn('text-[13px] leading-[18px] transition-colors', getHintColor(atLeastOneUppercase, !!dirtyFields.password, !!touchedFields.password))}>At least one uppercase letter</span>
            <span className={cn('text-[13px] leading-[18px] transition-colors', getHintColor(atLeastOneDigit, !!dirtyFields.password, !!touchedFields.password))}>At least one digit</span>
            <span className={cn('text-[13px] leading-[18px] transition-colors', getHintColor(noSpaces, !!dirtyFields.password, !!touchedFields.password))}>No spaces allowed</span>
          </div>
        </div>
        <Button type='submit'>Sign up</Button>
      </form>
    </div>
  )
}
