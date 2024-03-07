import {ButtonHTMLAttributes, DetailedHTMLProps, forwardRef} from "react";

interface IButtonProps extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> { buttonType: 'primary' | 'secondary' }

export const Button = forwardRef(({ children, buttonType, onClick, ...props }: IButtonProps) => {
    return (<button
        style={{ padding: 10, backgroundColor: buttonType === "primary" ? 'orange' : 'darkseagreen', border: 'none', cursor: 'pointer' }}
        onClick={onClick}
        {...props}
    >
        {children}
    </button>)
})
