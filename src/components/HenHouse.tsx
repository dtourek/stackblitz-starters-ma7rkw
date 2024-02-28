import {getCurrentPlayer, useStore} from "../useStore";

type IAnimal = 'hens' | 'chickens' | 'eggs' | 'rooster' | 'fox'
const getEmoji = (type: IAnimal) => {
    switch (type) {
        case 'hens':
            return '🐔';
        case 'rooster':
            return '🐓';
        case 'chickens':
            return <img src={"ChickenAttack.gif"} />;
        case 'fox':
            return '🦊';
        case 'eggs':
            return '🥚';
    }
}

const Slot = ({type, count}: {type: IAnimal, count: number}) => {
    return <div>{Array.from(new Array(count)).map((_, index) => <span key={index}>{getEmoji(type)}</span>)} </div>
}

export const HenHouse = () => {
    const [store, dispatch] = useStore()
    const currentPlayer = getCurrentPlayer(store)

    return (<div>
        <Slot type={"hens"} count={currentPlayer.hens} />
        <Slot type={"chickens"} count={currentPlayer.chicken} />
        <Slot type={"eggs"} count={currentPlayer.egg} />
        <Slot type={"rooster"} count={currentPlayer.rooster ? 1 : 0} />
    </div>)

}

