import { IStore } from './App';
import { diceService } from './dice';

type IGameState =
  | 'switchTurns'
  | 'tradeOrRoll'
  | 'roll'
  | 'trade'
  | 'evaluateEndOfTurn';

export const processGameState = (state: IGameState, store: IStore) => {
  const resultStore = {...store};
  let resultState: IGameState;

  switch(state) {
    case 'switchTurns': 
        resultStore.activePlayer = (resultStore.activePlayer + 1) % resultStore.players.length;
        resultState = 'tradeOrRoll';
        break;
    case 'tradeOrRoll': 
        // Zobrazit dialogovy okno, co chce hrac udelat
        // if(trade) trade();
        // else roll();
        break;
    case 'roll': 
        resultStore.players[resultStore.activePlayerId].rolls.push(diceService().roll());
        resultState = 'tradeOrRoll';
        // Roll dice
        break;
    case 'trade': 
        // trade function
        break;
    case 'evaluateEndOfTurn': 
        // If player won, end of the game.
        resultState = 'switchTurns';
        break;
    }

    return {state: resultState, store: resultStore}
};
