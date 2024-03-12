import {ButtonHTMLAttributes, DetailedHTMLProps, forwardRef, ReactNode} from 'react'
import styled from "styled-components";

interface IContainerProps extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    children: ReactNode
}

const ContainerDiv = styled.div`
  display: flex;
  justify-content: center;

  @font-face {
    font-family: 'Mono';
    src: url('fonts/Mono.ttf') format('truetype');
  }

  h1, h2, h3, h4, h5, h6, p, a, span, div, button, input, label, select, textarea {
    font-family: Mono;
  }
`

export const Container = forwardRef(({children, ...props}: IContainerProps, ref) => {
    return (<ContainerDiv  ref={ref} {...props} style={{  }} >{children}</ContainerDiv>)
})
