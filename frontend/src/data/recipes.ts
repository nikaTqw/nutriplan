export interface Recipe {
  id: number;
  name: string;
  calories: number;
  time: number;
  image: string;
  ingredients: string[];
  steps: string[];
  category: string; // Завтрак, Обед, Перекус, Ужин
  type: string;     // Суп, Второе, Салат, Сладкое, Напиток, Закуска
}

export const recipes: Record<number, Recipe> = {
  // ========== ЗАВТРАКИ ==========
  1: {
    id: 1,
    name: "Овсяноблин с ягодами",
    calories: 320,
    time: 15,
    image: "/assets/breakfast1.jpg",
    ingredients: ["Овсянка", "Яйцо", "Ягоды", "Мед", "Банан"],
    steps: ["Смешайте овсянку и яйца", "Жарьте 2-3 минуты", "Добавьте ягоды и мёд"],
    category: "Завтрак",
    type: "Сладкое"
  },
  2: {
    id: 2,
    name: "Сырники из творога",
    calories: 350,
    time: 20,
    image: "/assets/breakfast2.jpg",
    ingredients: ["Творог", "Яйцо", "Мука", "Сахар", "Ванилин"],
    steps: ["Смешайте творог с яйцом", "Добавьте муку", "Сформируйте сырники", "Обжарьте до золотистой корочки"],
    category: "Завтрак",
    type: "Сладкое"
  },
  3: {
    id: 3,
    name: "Яичница с авокадо и помидорами",
    calories: 380,
    time: 10,
    image: "/assets/breakfast3.jpg",
    ingredients: ["Яйца", "Авокадо", "Соль", "Перец", "Зелень", "Помидоры"],
    steps: ["Обжарьте яйца", "Нарежьте авокадо и помидоры", "Подавайте вместе"],
    category: "Завтрак",
    type: "Закуска"
  },
  4: {
    id: 4,
    name: "Гречка с молоком",
    calories: 290,
    time: 15,
    image: "/assets/breakfast4.jpg",
    ingredients: ["Гречка", "Молоко", "Сахар", "Масло"],
    steps: ["Сварите гречку", "Добавьте молоко", "Посыпьте сахаром"],
    category: "Завтрак",
    type: "Каша"
  },
  5: {
    id: 5,
    name: "Смузи клубничный",
    calories: 180,
    time: 5,
    image: "/assets/breakfast5.jpg",
    ingredients: ["Клубника", "Банан", "Йогурт", "Мёд"],
    steps: ["Смешайте все ингредиенты в блендере", "Взбейте до однородности"],
    category: "Завтрак",
    type: "Напиток"
  },

  // ========== ОБЕДЫ ==========
  6: {
    id: 6,
    name: "Куриный суп с лапшой",
    calories: 280,
    time: 45,
    image: "/assets/lunch1.jpg",
    ingredients: ["Курица", "Лапша", "Морковь", "Лук", "Картофель"],
    steps: ["Сварите бульон", "Добавьте овощи", "Засыпьте лапшу", "Варите до готовности"],
    category: "Обед",
    type: "Суп"
  },
  7: {
    id: 7,
    name: "Борщ с говядиной",
    calories: 350,
    time: 60,
    image: "/assets/lunch2.jpg",
    ingredients: ["Говядина", "Свекла", "Капуста", "Картофель", "Морковь", "Лук", "Томатная паста"],
    steps: ["Сварите бульон", "Обжарьте овощи", "Добавьте свеклу и капусту", "Варите 30 минут"],
    category: "Обед",
    type: "Суп"
  },
  8: {
    id: 8,
    name: "Картошка с котлеткой",
    calories: 500,
    time: 40,
    image: "/assets/lunch3.jpeg",
    ingredients: ["Фарш", "Картофель", "Лук", "Яйцо", "Чеснок", "Сметана", "Морковь", "Сыр", "Томаты", "Специи"],
    steps: ["Сформируйте котлеты", "Обжарьте их", "Отварите картофель", "Подавайте вместе"],
    category: "Обед",
    type: "Второе"
  },
  9: {
    id: 9,
    name: "Паста с курицей",
    calories: 480,
    time: 30,
    image: "/assets/lunch4.jpg",
    ingredients: ["Паста", "Куриная грудка", "Сливки", "Сыр", "Чеснок", "Зелень"],
    steps: ["Отварите пасту", "Обжарьте курицу", "Смешайте со сливками и сыром", "Подавайте с зеленью"],
    category: "Обед",
    type: "Второе"
  },
  10: {
    id: 10,
    name: "Греческий салат",
    calories: 250,
    time: 15,
    image: "/assets/lunch5.jpg",
    ingredients: ["Огурцы", "Помидоры", "Сыр Фета", "Маслины", "Лук", "Оливковое масло"],
    steps: ["Нарежьте овощи", "Добавьте сыр и маслины", "Заправьте маслом"],
    category: "Обед",
    type: "Салат"
  },

  // ========== ПЕРЕКУСЫ ==========
  11: {
    id: 11,
    name: "Яблоко с орехами",
    calories: 180,
    time: 5,
    image: "/assets/snack1.jpg",
    ingredients: ["Яблоко", "Грецкие орехи", "Мед", "Корица"],
    steps: ["Нарежьте яблоко", "Посыпьте орехами и корицей", "Полейте медом"],
    category: "Перекус",
    type: "Закуска"
  },
  12: {
    id: 12,
    name: "Творожная запеканка",
    calories: 220,
    time: 25,
    image: "/assets/snack2.png",
    ingredients: ["Творог", "Яйцо", "Манка", "Сахар", "Изюм"],
    steps: ["Смешайте ингредиенты", "Выпекайте 20 минут при 180°C"],
    category: "Перекус",
    type: "Сладкое"
  },
  13: {
    id: 13,
    name: "Протеиновый батончик",
    calories: 200,
    time: 10,
    image: "/assets/snack3.jpg",
    ingredients: ["Овсянка", "Протеин", "Мед", "Орехи", "Сухофрукты"],
    steps: ["Смешайте все ингредиенты", "Сформируйте батончики", "Охладите"],
    category: "Перекус",
    type: "Сладкое"
  },
  14: {
    id: 14,
    name: "Овощные палочки с хумусом",
    calories: 150,
    time: 10,
    image: "/assets/snack4.jpg",
    ingredients: ["Морковь", "Огурец", "Перец", "Хумус"],
    steps: ["Нарежьте овощи палочками", "Подавайте с хумусом"],
    category: "Перекус",
    type: "Закуска"
  },
  15: {
    id: 15,
    name: "Йогурт с гранолой",
    calories: 210,
    time: 5,
    image: "/assets/snack5.png",
    ingredients: ["Йогурт", "Гранола", "Ягоды", "Мед"],
    steps: ["Выложите йогурт в тарелку", "Посыпьте гранолой и ягодами", "Полейте медом"],
    category: "Перекус",
    type: "Сладкое"
  },

  // ========== УЖИНЫ ==========
  16: {
    id: 16,
    name: "Куриная грудка с рисом",
    calories: 450,
    time: 35,
    image: "/assets/dinner1.jpg",
    ingredients: ["Куриная грудка", "Рис", "Брокколи", "Соевый соус", "Чеснок", "Имбирь", "Кунжут"],
    steps: ["Отварите рис", "Обжарьте курицу с овощами", "Добавьте соевый соус", "Подавайте с кунжутом"],
    category: "Ужин",
    type: "Второе"
  },
  17: {
    id: 17,
    name: "Рыба на пару с овощами",
    calories: 320,
    time: 25,
    image: "/assets/dinner2.jpg",
    ingredients: ["Филе рыбы", "Брокколи", "Цветная капуста", "Морковь", "Лимон"],
    steps: ["Нарежьте овощи", "Выложите рыбу и овощи в пароварку", "Готовьте 20 минут", "Полейте лимоном"],
    category: "Ужин",
    type: "Второе"
  },
  18: {
    id: 18,
    name: "Овощное рагу",
    calories: 200,
    time: 30,
    image: "/assets/dinner3.jpg",
    ingredients: ["Кабачок", "Баклажан", "Перец", "Помидоры", "Лук", "Морковь"],
    steps: ["Нарежьте овощи", "Обжарьте лук и морковь", "Добавьте остальные овощи", "Тушите 20 минут"],
    category: "Ужин",
    type: "Второе"
  },
  19: {
    id: 19,
    name: "Салат с тунцом",
    calories: 250,
    time: 10,
    image: "/assets/dinner4.jpg",
    ingredients: ["Тунец", "Листья салата", "Помидоры", "Огурец", "Яйцо", "Оливковое масло"],
    steps: ["Нарежьте овощи", "Добавьте тунец и яйцо", "Заправьте маслом"],
    category: "Ужин",
    type: "Салат"
  },
  20: {
    id: 20,
    name: "Грибной крем-суп",
    calories: 180,
    time: 30,
    image: "/assets/dinner5.jpg",
    ingredients: ["Шампиньоны", "Сливки", "Лук", "Картофель", "Специи"],
    steps: ["Обжарьте грибы с луком", "Добавьте картофель и воду", "Варите до готовности", "Измельчите блендером", "Добавьте сливки"],
    category: "Ужин",
    type: "Суп"
  }
};

export const getRecipesByCategory = (category: string): Recipe[] => {
  return Object.values(recipes).filter(r => r.category === category);
};

export const getRecipesByType = (type: string): Recipe[] => {
  return Object.values(recipes).filter(r => r.type === type);
};

export const getRecipesByIds = (ids: number[]): Recipe[] => {
  return ids.map(id => recipes[id]).filter(Boolean);
};

export const getRandomRecipes = (count: number): Recipe[] => {
  const values = Object.values(recipes);
  const shuffled = [...values];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled.slice(0, count);
};

export const searchRecipes = (query: string): Recipe[] => {
  const lowerQuery = query.toLowerCase();
  return Object.values(recipes).filter(r => 
    r.name.toLowerCase().includes(lowerQuery) ||
    r.ingredients.some(i => i.toLowerCase().includes(lowerQuery)) ||
    r.type.toLowerCase().includes(lowerQuery)
  );
};

export const categories = ["Завтрак", "Обед", "Перекус", "Ужин"];
export const types = ["Суп", "Второе", "Салат", "Сладкое", "Напиток", "Каша", "Закуска"];