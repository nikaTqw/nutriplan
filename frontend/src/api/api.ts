import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5247/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const getFoods = () => api.get('/food');
export const getDiaryDay = (userId: string, date: string) => 
  api.get(`/diary/day?userId=${userId}&date=${date}`);
export const addDiaryEntry = (data: any) => api.post('/diary', data);
export const registerUser = (data: any) => api.post('/auth/register', data);
export const loginUser = (data: any) => api.post('/auth/login', data);
export const getRecipes = () => api.get('/recipes');
export const getRecipeById = (id: string) => api.get(`/recipes/${id}`);
export const getRecipesByIds = (ids: number[]) => {
  // Временно возвращаем все рецепты, фильтрация по ids
  return getRecipes().then(res => {
    return res.data.filter((recipe: any) => ids.includes(parseInt(recipe.id)));
  });
};
export const createRecipe = (data: any) => api.post('/recipes', data);
export const updateRecipe = (id: string, data: any) => api.put(`/recipes/${id}`, data);
export const deleteRecipe = (id: string) => api.delete(`/recipes/${id}`);

export default api;