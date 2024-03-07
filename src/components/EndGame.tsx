import {useStore} from "../store/useStore";
import {GameActions} from "../store/enum";
import {getCurrentPlayer} from "../store/utils";
import {Button} from "./Button";

export const EndGame = () => {
    const [store, dispatch] = useStore()
    const onNewGame = () => {
        dispatch({ action: GameActions.Reset })
    }

    return <div>
        <h1>Blahopřejeme! Hráč {getCurrentPlayer(store).name} vyhrál</h1>
        <Button onClick={onNewGame} buttonType="primary">Hrát znovu</Button>
    </div>
}
