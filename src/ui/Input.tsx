import { ComponentPropsWithRef, forwardRef, memo, useCallback, useState } from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "~/utils/classnames"
import EyeOn from '~/assets/eye-on.svg'
import EyeOff from '~/assets/eye-off.svg'

type CvaVariants = { variant: { success: string, error: string, } }

// ========================================= INPUT ================================================

const inputVariants = cva<CvaVariants>(
  "border-[1px] focus:border-clario-blue-300 px-[20px] py-[14.5px] border-transparent rounded-[10px] text-[16px] text-clario-blue-400 text-normal placeholder:text-[16px] placeholder:text-clario-blue-300 leading-[20px] placeholder:leading-[20px] transform-cpu transition-colors outline-none", {
  variants: {
    variant: {
      success: 'border-success text-success focus:text-success focus:border-success',
      error: 'border-error text-error focus:text-error focus:border-error'
    }
  }
})

type InputProps = {
  label?: string
} & ComponentPropsWithRef<'input'> & VariantProps<typeof inputVariants>

export const Input = memo(forwardRef<HTMLInputElement, InputProps>(
  (props, ref) => {
    const { className, variant } = props
    return (
      <input  {...props} ref={ref} className={cn(inputVariants({ variant }), className)} />
    )
  }
))

Input.displayName = 'Input'

// ========================================= PASSWORD INPUT ================================================

const eyeIconVariants = cva<CvaVariants>(
  "fill-clario-blue-400", {
  variants: {
    variant: {
      success: 'fill-success',
      error: 'fill-error'
    }
  }
})

type PasswordInputProps = Omit<InputProps, 'type'>

export const PasswordInput = memo(forwardRef<HTMLInputElement, PasswordInputProps>(
  (props, ref) => {
    const [showPassword, setShowPassword] = useState(false)

    const togglePassword = useCallback(() => {
      setShowPassword(prev => !prev)
    }, [])

    return (
      <div className="relative flex items-center">
        <Input {...props} ref={ref} type={showPassword ? 'text' : 'password'} className="pr-[48px] w-full" />
        <button type="button" className="right-[20px] absolute w-[24px] h-[24px]" onClick={togglePassword}>
          {showPassword ? <EyeOn className={eyeIconVariants({ variant: props.variant })} /> : <EyeOff className={eyeIconVariants({ variant: props.variant })} />}
        </button>
      </div>
    )
  }
))


PasswordInput.displayName = 'PasswordInput'