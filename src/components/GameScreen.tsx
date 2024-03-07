import {canTradeChicken, canTradeEggs, canTradeHens, getCurrentPlayer} from "../store/utils";
import {HenHouseList} from "./HenHouseList";
import {GameActions, GameStates} from "../store/enum";
import {useStore} from "../store/useStore";
import {diceService} from "../dice";
import {Button} from "./Button";

const dice = diceService()

export const GameScreen = () => {
    const [store, dispatch] = useStore()
    const currentPlayer = getCurrentPlayer(store)

    const onRollDices = () => {
        const roll = dice.roll()
        const actionsAfterRoll = dice.evaluateRoll(roll)
        const currentPlayer = getCurrentPlayer(store)

        actionsAfterRoll.forEach(rollResult => {
            if (rollResult.action === GameActions.GiveEgg || rollResult.action === GameActions.GiveChicken) {
                dispatch({ action: rollResult.action, payload: { targetPlayerId: currentPlayer.id } }) // TODO implement more players
                return
            }

            dispatch({ action: rollResult.action as any })
        })

        dispatch({ action: GameStates.EvaluateEndOfTurn, payload: { roll } });
    };

    const onTradeEggs = () => {
        dispatch({ action: GameActions.TradeEggs })
        dispatch({action: GameStates.EvaluateEndOfTurn })
    }
    const onTradeChickens = () => {
        dispatch({action: GameActions.TradeChickens })
        dispatch({action: GameStates.EvaluateEndOfTurn })
    }

    const onTradeHens = () => {
        dispatch({action: GameActions.TradeHens })
        dispatch({action: GameStates.EvaluateEndOfTurn })
    }

    return (
        <div>
            <h2>{store.turn}. kolo</h2>
            <h1>Player name {currentPlayer?.name}</h1>
            {currentPlayer.rolls.length ? <p>Předchozí hod hráče <b>{currentPlayer.name}</b> je: {currentPlayer.rolls[currentPlayer.rolls.length - 1].join(', ') ?? 'Zatím bez hodu'}</p> : null}
            <div style={{display: 'flex', justifyContent: 'space-around'}}>
                <Button disabled={store.gameState !== 'tradeOrRoll'} onClick={onRollDices} buttonType="primary">Hodit 🎲🎲</Button>
                <Button onClick={onTradeEggs} disabled={!canTradeEggs(currentPlayer)} buttonType="secondary" >Vyměnit 3 🥚 za 1 kuře (<img src={"ChickenAttack.gif"} />)</Button>
                <Button onClick={onTradeChickens} disabled={!canTradeChicken(currentPlayer)} buttonType="secondary">Vyměnit 3 <img src={"ChickenAttack.gif"} /> za 1 slepici (🐔)</Button>
                <Button onClick={onTradeHens} disabled={!canTradeHens(currentPlayer)} buttonType="secondary">Vyměnit 3 🐔 za 1 kohouta (🐓)</Button>
            </div>
            <HenHouseList />
            <pre style={{background: "#ccc", padding: "10px", display: "block"}} >{JSON.stringify(store, null, 2)}</pre>
        </div>
    )
}
