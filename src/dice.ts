const rollDice = () => Math.floor(Math.random() * (6)) + 1;

type IDiceResult = [number, number];

export const diceService = () => {
  return {
    roll: (): IDiceResult => {
      return [rollDice(), rollDice()];
    },
  };
};
