import {IPlayer} from "../interface";
import {IDicesRollResult} from "../dice";
import {GameActions, GameStates} from "./enum";

type IStartGame = { action: GameStates.StartGame, payload: { playerNames: string[] } }
type IEndGame = { action: GameStates.EndGame }
type ISwitchTurns = { action: GameStates.SwitchPlayer }
type ITradeOrRoll = { action: GameStates.TradeOrRoll }
type IEvaluate = { action: GameStates.EvaluateEndOfTurn, payload?: { roll: IDicesRollResult } }

type ISkipTurn = { action: GameActions.SkipTurn }
type IFoxAttack = { action: GameActions.FoxAttack }
type IAddEgg = { action: GameActions.AddEgg }
type IAddChicken = { action: GameActions.AddChicken }
type IAddHen = { action: GameActions.AddHen }
export type IGiveEgg = { action: GameActions.GiveEgg, payload: { targetPlayerId: number } }
export type IGiveChicken = { action: GameActions.GiveChicken, payload: { targetPlayerId: number } }
type IRemoveEggs = { action: GameActions.RemoveEggs }
type IRemoveChickens = { action: GameActions.RemoveChickens }
type ITradeEggs = { action: GameActions.TradeEggs }
type ITradeChicken = { action: GameActions.TradeChickens }
type ITradeHens = { action: GameActions.TradeHens }
type IEndTurn = { action: GameActions.EndTurn }
type IReset = { action: GameActions.Reset }

export type IReducerActions = IStartGame | IEndGame | ISkipTurn | IAddEgg | IAddChicken | IAddHen | IGiveEgg | IGiveChicken | IRemoveEggs | IRemoveChickens | ISwitchTurns | ITradeOrRoll | IEvaluate | ITradeChicken | ITradeEggs | ITradeHens | IFoxAttack | IEndTurn | IReset;

export interface IStore {
    activePlayerId: number;
    turn: number;
    gameState: GameStates;
    players: IPlayer[];
}
