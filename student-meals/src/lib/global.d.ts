export type Recipe = {
  ownerId: string | undefined,
  name: string,
  description: string,
  steps: Step[],
  ingredients: Ingredient[],
};

export type Step = {
  description: string,
  duration: number,
};

export type Ingredient = {
  name: string,
  amount: number,
  unit: "ml" | "g" | "p",
};