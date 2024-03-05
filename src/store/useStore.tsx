import {Dispatch, useContext} from "react";
import {IReducerActions, IStore} from "./interface";
import {GameActions, GameStates} from "./enum";
import {StoreContext} from "./StoreProvider";
import {canTradeChicken, canTradeEggs, canTradeHens, getCurrentPlayer} from "./utils";


export const initStore: IStore = {
    activePlayerId: 0,
    gameState:  GameStates.TradeOrRoll,
    players: [],
}

export const storeReducer = (state: IStore, payload: IReducerActions): IStore => {
    const currentPlayer = state.players.find((player) => player.id === state.activePlayerId);

    switch (payload.action) {
        // Game states
        case GameStates.StartGame:
            return { ...state, gameState: GameStates.TradeOrRoll, players: payload.payload.playerNames.map((playerName, index) => ({ id: index, name: playerName, egg: 0, chicken: 0, hens: 0, rooster: false, rolls: [] })) };
       case GameStates.EndGame:
           return initStore;
        case GameStates.TradeOrRoll:
            // Zobrazit dialogovy okno, co chce hrac udelat
            // if(trade) trade();
            // else roll();
            break;
        case GameStates.EvaluateEndOfTurn:
            if(getCurrentPlayer(state).hens === 9) {
                return { ...state, gameState: GameStates.EndGame };
            }
            return {
                ...state,
                activePlayerId: (state.activePlayerId + 1) % state.players.length,
                gameState: GameStates.TradeOrRoll,
                players: payload.payload?.roll ? state.players.map((player) => currentPlayer.id === player.id ? {...player, rolls: [ ...player.rolls, payload.payload.roll ] } : player) : state.players
            };
        // Game Actions
        case GameActions.SkipTurn:
            // TODO implement
            console.error('Player skipped turn not implemented, yet!');
            return state;
        case GameActions.Reset:
            return initStore
        case GameActions.AddEgg:
            return { ...state, players: state.players.map((player) => state.activePlayerId === player.id ? { ...player, egg: player.egg + 1 } : player) };
        case GameActions.AddChicken:
            return { ...state, players: state.players.map((player) => state.activePlayerId === player.id ? { ...player, chicken: player.chicken + 1 } : player) };
        case GameActions.AddHen:
            return { ...state, players: state.players.map((player) => state.activePlayerId === player.id ? { ...player, hens: player.hens + 1 } : player) };
        case GameActions.GiveEgg:
            console.log('GiveEgg', payload);
            return {...state, players: state.players.map((player) => {
                if (player.id === payload.payload.targetPlayerId) {
                    return {...player, egg: player.egg + 1}
                }
                if (player.id === state.activePlayerId) {
                    return {...player, egg: player.egg < 0 ? player.egg - 1 : 0}
                }
                return player;
            })};
        case GameActions.GiveChicken:
            return {...state, players: state.players.map((player) => {
                if (player.id === payload.payload.targetPlayerId) {
                    return {...player, chicken: player.chicken + 1}
                }
                if (player.id === state.activePlayerId) {
                    return {...player, chicken: player.chicken < 0 ? player.chicken - 1 : 0}
                }
                return player;
            })};
        case GameActions.RemoveEggs:
            return {...state, players: state.players.map((player) => state.activePlayerId === player.id ? { ...player, egg: 0 } : player)};
        case GameActions.RemoveChickens:
            return {...state, players: state.players.map((player) => state.activePlayerId === player.id ? { ...player, chicken: 0 } : player)};
        case GameActions.FoxAttack:
            const hasRooster = currentPlayer?.rooster;
            if (hasRooster) {
                console.log('Fox attack was prevented by rooster');
                return {
                    ...state, players: state.players.map((player) => state.activePlayerId === player.id ? { ...player, rooster: false } : player)
                };
            }
            console.log('Fox attack was successful. All hens are gone!');
            return {
                ...state,
                players: state.players.map((player) => currentPlayer.id === state.activePlayerId  ? { ...player, hens: 0 } : player)
            };
        case GameActions.TradeEggs:
            if (!canTradeEggs(currentPlayer)) {
                return state;
            }
            return {
                ...state, players: state.players.map((player) => state.activePlayerId === player.id ? {
                    ...player,
                    egg: player.egg -= 3,
                    chicken: player.chicken += 1,
                } : player)
            };
        case GameActions.TradeChickens:
            if (!canTradeChicken(currentPlayer)) {
                return state;
            }
            return {
                ...state, players: state.players.map((player) => state.activePlayerId === player.id ? {
                    ...player,
                    chicken: player.chicken -= 3,
                    hens: player.hens += 1
                } : player)
            };
        case GameActions.TradeHens:
            if (!canTradeHens(currentPlayer)) {
                return state;
            }
            return {
                ...state,
                players: state.players.map((player) => state.activePlayerId === player.id ? {
                    ...player,
                    hens: player.hens - 3,
                    rooster: true,
                } : player)
            };
        default:
            console.error('Unknown action', payload)
            return state;
    }
}

export const useStore = () => useContext(StoreContext) as [IStore, Dispatch<IReducerActions>]
