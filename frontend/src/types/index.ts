export interface Food {
  id: string;
  name: string;
  calories: number;
  protein: number;
  fat: number;
  carbs: number;
}

export interface DiaryEntry {
  id: string;
  userId: string;
  foodId: string;
  foodName: string;
  weightInGrams: number;
  calories: number;
  date: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  weight: number;
  height: number;
  age: number;
  goal: string;
}

export interface DailyStats {
  calories: number;
  protein: number;
  fat: number;
  carbs: number;
}