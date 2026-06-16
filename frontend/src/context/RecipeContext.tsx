import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { Recipe } from "../data/recipes";

interface UserRecipe {
  recipe: Recipe;
  date: string;
  meal: string;
}

interface RecipeContextType {
  userRecipes: UserRecipe[];
  addUserRecipe: (recipe: Recipe, date: string, meal: string) => void;
  removeUserRecipe: (date: string, meal: string) => void;
  getRecipesForDate: (date: string) => UserRecipe[];
}

const RecipeContext = createContext<RecipeContextType | undefined>(undefined);

export const useRecipe = () => {
  const context = useContext(RecipeContext);
  if (!context) {
    throw new Error("useRecipe must be used within RecipeProvider");
  }
  return context;
};

export const RecipeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [userRecipes, setUserRecipes] = useState<UserRecipe[]>(() => {
    const saved = localStorage.getItem("userRecipes");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("userRecipes", JSON.stringify(userRecipes));
  }, [userRecipes]);

  const addUserRecipe = (recipe: Recipe, date: string, meal: string) => {
    setUserRecipes(prev => {
      const filtered = prev.filter(r => !(r.date === date && r.meal === meal));
      return [...filtered, { recipe, date, meal }];
    });
  };

  const removeUserRecipe = (date: string, meal: string) => {
    setUserRecipes(prev => prev.filter(r => !(r.date === date && r.meal === meal)));
  };

  const getRecipesForDate = (date: string): UserRecipe[] => {
    return userRecipes.filter(r => r.date === date);
  };

  return (
    <RecipeContext.Provider value={{ userRecipes, addUserRecipe, removeUserRecipe, getRecipesForDate }}>
      {children}
    </RecipeContext.Provider>
  );
};