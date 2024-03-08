import {useStore} from "../store/useStore";
import {getCurrentPlayer, hasPlayerEmptySore} from "../store/utils";
import {Chicken} from "./animals/Chicken";
import {Egg} from "./animals/Egg";

type IAnimal = 'hens' | 'chickens' | 'eggs' | 'rooster' | 'fox'

const Animal = ({ type }: { type: IAnimal }) => {
    switch (type) {
        case 'hens':
            return <span>🐔</span>;
        case 'rooster':
            return <span>🐓</span>;
        case 'chickens':
            return <Chicken />;
        case 'fox':
            return <span>🦊</span>;
        case 'eggs':
            return <Egg />;
    }
}

const Slot = ({ type, count }: { type: IAnimal, count: number }) => {
    if (count <= 0) {
        return null
    }
    return <div>{Array.from(new Array(count)).map((_, index) => <Animal key={index} type={type} />)}</div>
}

export const HenHouse = () => {
    const [store, dispatch] = useStore()
    const currentPlayer = getCurrentPlayer(store)

    return (<>
        {store.players.map((player) => (
        <div key={player.id}>
            <div>{currentPlayer.id === player.id ? '💩' : ''} {player.name}</div>
            {hasPlayerEmptySore(player) ? <div>Prázdný kurník</div> :
                <>
                    <Slot type={"hens"} count={player.hens} />
                    <Slot type={"chickens"} count={player.chickens} />
                    <Slot type={"eggs"} count={player.eggs} />
                    <Slot type={"rooster"} count={player.rooster ? 1 : 0} />
                </>}
        </div>
        ))}
    </>)

}

