export enum GameStates {
    StartGame = 'startGame',
    SwitchPlayer = 'switchPlayer',
    TradeOrRoll = 'tradeOrRoll',
    EvaluateEndOfTurn = 'evaluateEndOfTurn',
    EndGame = 'endGame'
}

export enum GameActions {
    AddEgg = 'addEgg',
    AddChicken = 'addChicken',
    AddHen ='addHen',
    SkipTurn = 'skipTurn',
    FoxAttack = 'foxAttack',
    GiveEgg = 'giveEgg',
    GiveChicken = 'giveChicken',
    RemoveEggs = 'removeEggs',
    RemoveChickens = 'removeChickens',
    TradeEggs = 'tradeEggs',
    TradeChickens = 'tradeChickens',
    TradeHens = 'tradeHens',
    EndTurn = 'endTurn',
    Reset = 'reset'
}
