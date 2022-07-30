export type User = {
  displayName: string | null,
  email: string | null,
  emailVerified: boolean,
  phoneNumber: string | null,
	photoURL: string | null,
  uid: string | null,
  loggedIn: boolean,
};

export type Recipe = {
  created: number,
  description: string,
  id: string,
  ingredients: Ingredient[],
  name: string,
  steps: Step[],
  uid: string,
};

export type Ingredient = {
  amount: number,
  name: string,
  unit: string,
};

export type Step = {
  min: number,
  name: string,
};

export type RecipeUrl = {
  user?: string,
  ingredients?: string[],
  from?: number,
  to?: number,
};