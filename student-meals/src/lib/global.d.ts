export type Recipe = {
  id?: string,
  ownerId: string | undefined,
  name: string,
  description: string,
  steps: Step[],
  ingredients: Ingredient[],
  createdAt?: string,
};

export type Step = {
  index?: number,
  description: string,
  duration: number,
};

export type Ingredient = {
  id?: string,
  name: string,
  amount: number,
  unit: "ml" | "g" | "p",
};