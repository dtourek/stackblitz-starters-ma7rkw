import {getCurrentPlayer, hasPlayerEmptySore, useStore} from "../hooks/useStore";

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
    if (count <= 0) {
        return null
    }
    return <div>{Array.from(new Array(count)).map((_, index) => <span key={index}>{getEmoji(type)}</span>)} </div>
}

export const HenHouseList = () => {
    const [store, dispatch] = useStore()
    const currentPlayer = getCurrentPlayer(store)

    return (<>
        {store.players.map((player) => (
        <div key={player.id}>
            <div>{currentPlayer.id === player.id ? '💩' : ''} {player.name}</div>
            {hasPlayerEmptySore(player) ? <div>Prázdný kurník</div> :
                <>
                    <Slot type={"hens"} count={player.hens} />
                    <Slot type={"chickens"} count={player.chicken} />
                    <Slot type={"eggs"} count={player.egg} />
                    <Slot type={"rooster"} count={player.rooster ? 1 : 0} />
                </>}
        </div>
        ))}
    </>)

}

