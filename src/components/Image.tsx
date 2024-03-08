import {DetailedHTMLProps, forwardRef, ImgHTMLAttributes} from "react";
import styled from "styled-components";

interface IImageProps extends DetailedHTMLProps<ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement> {}

const StyledImage = styled.img`
  width: ${({width}) => width ?? '100%'};
  height: auto;
`

export const Image = forwardRef((props: IImageProps) => {
    return <StyledImage {...props} />
})
