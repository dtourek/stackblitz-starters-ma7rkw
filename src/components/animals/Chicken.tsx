import {useEffect, useState} from "react";
import {ImageSprite} from "../ImageSprite";

type IChickenOrientation = 'down' | 'up' | 'left' | 'right';

const randomInt = (min: number, max: number) => Math.floor(Math.random() * (max - min) + min)
const randomArrayValue = (array: unknown[]) => array[randomInt(0, array.length)]

export const Chicken = () => {
    const [orientation, setOrientation] = useState<IChickenOrientation>('down')

    useEffect(() => {
        const interval = setInterval(() => {
            const orientation = randomArrayValue(['down','up','left', 'right'])
            setOrientation(orientation as IChickenOrientation)
        }, randomInt(500, 3000))
        return () => clearInterval(interval)
    }, [])

    return (
        <ImageSprite src={`/chicken/chicken-${orientation}.png`} imageWidth="550%" animationSteps={4} animationTranslateX="-67%" animationDuration={.7}  />
    )
}
