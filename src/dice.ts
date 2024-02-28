const rollDice = () => Math.floor(Math.random() * (6)) + 1;

type IDicesRollResult = [number, number];

export const diceService = () => {
  return {
    roll: (): IDicesRollResult => {
      return [rollDice(), rollDice()];
    }
  };
};
