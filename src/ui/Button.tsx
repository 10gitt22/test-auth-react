import { ComponentPropsWithRef, ReactNode, forwardRef, memo } from "react"
import { cn } from "~/utils/classnames"

type ButtonProps = {
  children: ReactNode
} & ComponentPropsWithRef<'button'>

export const Button = memo(forwardRef<HTMLButtonElement, ButtonProps>(
  (props, ref) => {
    const { className, children } = props
    return (
      <button  {...props} ref={ref} className={cn('bg-gradient-to-r from-[#70C3FF] to-[#4B65FF] py-[17px] rounded-[30px] w-[240px] font-bold text-[16px] text-white leading-[14px] hover:filter hover:hue-rotate-30 transition-all', className)} >{children}</button>
    )
  }
))
Button.displayName = 'Button'