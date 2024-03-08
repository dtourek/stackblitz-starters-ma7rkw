import styled from "styled-components";

interface IImageSprite {
    src: string
    imageWidth: string | number;
    imageHeight?: number;
    animationDuration: number;
    animationSteps: number;
    animationTranslateX: string;
}

export const AnimatedImage = styled.div<IImageSprite>`
  width: ${({imageWidth}) => imageWidth};
  height: ${({imageHeight}) => imageHeight ?? '100%'};
  background-image: url(${({src}) => src});
  background-size: 100%, 100%;
  background-repeat:no-repeat;

  animation-name: animation-fill;
  animation-duration: ${({animationDuration}) => `${animationDuration}s`} ;
  animation-timing-function: steps(${({animationSteps}) => animationSteps});
  animation-iteration-count: infinite;

  position: absolute;
  left: 0;
  top: 0;

  @keyframes animation-fill {
    from {
      transform: translateX(0);
    }
    to {
      transform: translateX(${({animationTranslateX}) => animationTranslateX});
    }
  }
`

const AnimationWrapper = styled.div`
    display: inline-block;
    // show only one frame at a time, hide unnecesary parts of the moving HTML element
    overflow: hidden;
    // allow inner HTML element to be absolutely positioned
    position: relative;
    width: 40px;
    height: 40px;
`

export const ImageSprite = (props: IImageSprite) => {
    return (
        <AnimationWrapper>
            <AnimatedImage {...props} />
        </AnimationWrapper>
    )
}
