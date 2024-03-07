import {ButtonHTMLAttributes, DetailedHTMLProps, forwardRef, ReactNode} from 'react'

interface IContainerProps extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    children: ReactNode
}
export const Container = forwardRef(({children, ...props}: IContainerProps) => {
    return (<div {...props} style={{ display: 'flex', justifyContent: 'center' }} >{children}</div>)
})
