import {GameActions, getCurrentPlayer, useStore} from "../hooks/useStore";

export const EndGame = () => {
    const [store, dispatch] = useStore()
    const onNewGame = () => {
        dispatch({ action: GameActions.Reset })
    }

    return <div>
        <h1>Blahopřejeme! Hráč {getCurrentPlayer(store).name} vyhrál</h1>
        <button onClick={onNewGame}>Hrát znovu</button>
    </div>
}
