import { useReducer } from "react";
import { diceService } from "./dice";

export interface IStore {
    activePlayerId: number;
    gameState: IGameState;
    players: IPlayer[];
}

interface IPlayer {
    id: number;
    name: string;
    rolls: [number, number][];
    hens: number;
    chicken: number;
    egg: number;
    rooster: true;
}

type IGameState =
    | 'switchTurns'
    | 'tradeOrRoll'
    | 'roll'
    | 'trade'
    | 'evaluateEndOfTurn';

const canTradeEggs = (player: IPlayer) => player.egg >= 3;
const canTradeChicken = (player: IPlayer) => player.chicken >= 3;
const tradeEggs = (player: IPlayer) => {
    const result = { ...player };
    result.egg -= 3;
    result.chicken += 1;
}
const tradeChicken = (player: IPlayer) => {
    const result = { ...player };
    result.chicken -= 3;
    result.hens += 1;
}

type IRoll = { action: 'roll' }
type ISwitchTurns = { action: 'switchTurns' }
type ITradeOrRoll = { action: 'tradeOrRoll' }
type ITradeChicken = { action: 'tradeChicken' }
type ITradeEggs = { action: 'tradeEggs' }
type IEvaluate = { action: 'evaluateEndOfTurn' }
type IRoosterAttack = { action: 'roosterAttack' }

type IReducerActions = IRoll | ISwitchTurns | ITradeOrRoll | IEvaluate | ITradeChicken | ITradeEggs | IRoosterAttack;

const storeReducer = (state: IStore, payload: IReducerActions) => {
    const dice = diceService()

    switch (payload.action) {
        case 'switchTurns':
            return { ...state, activePlayerId: (state.activePlayerId + 1) % state.players.length, gameState: 'tradeOrRoll' };
        case 'tradeOrRoll':
            // Zobrazit dialogovy okno, co chce hrac udelat
            // if(trade) trade();
            // else roll();
            break;
        case 'roll':
            return {
                ...state, gameState: 'evaluateEndOfTurn', players: state.players.map((player) => state.activePlayerId === player.id ? {
                    ...player,
                    rolls: [...player.rolls, dice.roll()]
                } : player)
            };
        case 'tradeEggs':
            return {
                ...state, gameState: 'evaluateEndOfTurn', players: state.players.map((player) => state.activePlayerId === player.id ? {
                    ...player,
                    egg: player.egg -= 3,
                    chicken: player.chicken += 1,
                } : player)
            };
        case 'tradeChicken':
            return {
                ...state, gameState: 'evaluateEndOfTurn', players: state.players.map((player) => state.activePlayerId === player.id ? {
                    ...player,
                    chicken: player.chicken -= 3,
                    hens: player.hens += 1
                } : player)
            };
        case 'roosterAttack':
            return {
                ...state, gameState: 'evaluateEndOfTurn', players: state.players.map((player) => state.activePlayerId === player.id ?
                    player.rooster ? {
                        ...player,
                        rooster: false,
                    } :
                        {
                            ...player,
                            hens: 0,
                        }
                    : player)
            };
        case 'evaluateEndOfTurn':
            return { ...state, gameState: 'switchTurns' };

    }
}

export const useStore = () => useReducer(storeReducer, {
    activePlayerId: 0,
    gameState: 'switchTurns',
    players: [{ id: 0, name: 'Pepa', egg: 0, chicken: 0, hens: 0, rooster: true, rolls: [] }],
})
