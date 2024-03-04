import { FC } from 'react';
import {GameActions, GameStates, getCurrentPlayer, IGiveChicken, IGiveEgg, useStore} from "./useStore";
import {HenHouse} from "./components/HenHouse";
import {diceService} from "./dice";

/**
 * your task is to create a henhouse game. To win a game you have to fill henhouse with hens. There are 9 slots for hens. Every henhouse has also a rooster, so you can place inside a rooster as well on 10th slot.
 *
 * You will:
 * 1. create roll a dice from 1-6
 * 2. create eggs token
 * 3. create chicken token
 * 4. create hen token
 * 4. create rooster token
 * 5. create a multiplayer game system (1-n players)
 * 6. render UI nicely
 *
 * Rules:
 * You roll 2 dices each turn. From each dice based on number you will receive a token based on this rules:
 * 1 - 3 you rereive an egg
 * 4 - 5 you receive a chicken
 * 6 you receive a hen
 *
 * Example: You roll 1 and 5 - You receive 1 chcicken and 1 egg
 *
 * If you roll same number on both dices usually bad things happen:
 *
 * 1 - 1 Player skip a turn
 * 2 - 2 Player gives an egg to another player
 * 3 - 3 Player gives a chicken to another player
 * 4 - 4 All your eggs are gone
 * 5 - 5 All your chickens are gone!
 * 6 - 6 If the henhouse does not have a rooster to alert from fox, then fox ate all your hens!
 *
 * Trade system:
 * You can trade eggs, chickens based on these rules:
 * - 3 eggs can be traded for a chicken and skip rolling dices
 * - 3 chickens can be traded for a hen and skip rolling dices
 *
 */

const dice = diceService()

const Game = () => {
  const [store, dispatch] = useStore()
  const currentPlayer = getCurrentPlayer(store)

  if (store.gameState === 'evaluateEndOfTurn') {
      dispatch({ action: GameStates.SwitchPlayer });
  }

  const onRollDices = () => {
    const roll = dice.roll()
    const actionsAfterRoll = dice.evaluateRoll(roll)

      console.log('actionsAfterRoll', actionsAfterRoll)

    actionsAfterRoll.forEach(rollResult => {
        if (rollResult.action === GameActions.GiveEgg || rollResult.action === GameActions.GiveChicken) {
            dispatch({ action: rollResult.action, payload: { targetPlayerId: 0 } }) // TODO implement more players
            return
        }

        dispatch({ action: rollResult.action as any })
    })

    dispatch({ action: GameStates.EvaluateEndOfTurn });
  };

  return (
    <div>
      <pre style={{background: "#ccc", padding: "10px", display: "block"}} >{JSON.stringify(store, null, 2)}</pre>
      Player name {currentPlayer?.name}
        {currentPlayer.rolls.length ? <p>Hod hráče {currentPlayer.name} je: {currentPlayer.rolls[currentPlayer.rolls.length - 1].map((roll) => roll.roll) ?? 'Zatím bez hodu'}</p> : null}
      <button disabled={store.gameState !== 'tradeOrRoll'} onClick={onRollDices}>Roll a dices</button>
      <HenHouse store={store} />
    </div>
    );
};

export const App: FC<{ name: string }> = ({ name }) => {
  return (
    <div>
      <Game  />
    </div>
  );
};
