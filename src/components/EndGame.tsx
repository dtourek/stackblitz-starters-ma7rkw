import {useStore} from "../store/useStore";
import {GameActions} from "../store/enum";
import {getCurrentPlayer} from "../store/utils";

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
