export type User = {
  id: string,
  name: string,
  email: string,
  verified: boolean,
  picture: string,
  recipes: Recipe[],
  ratings: Rating[],
};

export type Recipe = {
  id?: string,
  userId: string | undefined,
  name: string,
  description: string,
  picture: string,
  steps: Step[],
  ingredients: Ingredient[],
  createdAt?: string,
};

export type Step = {
  index?: number,
  description: string,
  duration: number,
  complete?: boolean,
};

export type Ingredient = {
  id?: string,
  name: string,
  amount: number,
  unit: "ml" | "g" | "p",
};

export type Rating = {
  userId: string,
  recipeId: string,
  stars: number,
  comment: string,
};