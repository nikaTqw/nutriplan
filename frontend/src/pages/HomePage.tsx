import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecipe } from "../context/RecipeContext";
import AddRecipeModal from "../components/AddRecipeModal";

function HomePage() {
  const [activeMeal, setActiveMeal] = useState("Обед");
  const [currentDate, setCurrentDate] = useState(new Date());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { addUserRecipe, getRecipesForDate } = useRecipe();
  const navigate = useNavigate();

  const meals = ["Завтрак", "Обед", "Перекус", "Ужин"];
  
  const normalizeDate = (date: Date) => {
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
  };
  
  const dateKey = normalizeDate(currentDate);
  const recipesForDate = getRecipesForDate(dateKey);
  const currentRecipe = recipesForDate.find(r => r.meal === activeMeal);

  const formatDate = (date: Date) => 
    date.toLocaleDateString("ru-RU", { day: "numeric", month: "long" });

  const changeDay = (offset: number) => {
    const newDate = new Date(currentDate);
    newDate.setDate(currentDate.getDate() + offset);
    setCurrentDate(newDate);
  };

  const handleAddRecipe = (recipe: any) => {
    addUserRecipe(recipe, dateKey, activeMeal);
    setIsModalOpen(false);
  };

  return (
    <div className="page">
      <div className="date-row">
        <button onClick={() => changeDay(-1)}>←</button>
        <h1 className="title">{formatDate(currentDate)}</h1>
        <button onClick={() => changeDay(1)}>→</button>
      </div>

      <div className="tabs">
        {meals.map((meal) => (
          <div
            key={meal}
            className={`tab ${activeMeal === meal ? "active" : ""}`}
            onClick={() => setActiveMeal(meal)}
          >
            {meal}
          </div>
        ))}
      </div>

      {currentRecipe ? (
        <>
          <div className="card" style={{alignItems: "center"}}>
            <img src={currentRecipe.recipe.image} alt={currentRecipe.recipe.name} />
            <h2>{currentRecipe.recipe.name}</h2>
            <div className="card-info">
              <p>{currentRecipe.recipe.calories} ккал</p>
              <p>{currentRecipe.recipe.time} мин</p>
              <p>{currentRecipe.recipe.type}</p>
            </div>          

          <div className="tags">
            {currentRecipe.recipe.ingredients.map((ingredient: string) => (
              <span key={ingredient}>{ingredient}</span>
            ))}
          </div>
          </div>

          <button 
            className="main-btn" 
            onClick={() => navigate(`/recipe/${currentRecipe.recipe.id}`)}
          >
            Приготовить
          </button>
        </>
      ) : (
        <div className="card" style={{ textAlign: "center" }}>
          <p>Нет рецепта на {activeMeal.toLowerCase()}</p>
          <button 
            className="main-btn" 
            style={{ marginTop: "16px" }} 
            onClick={() => setIsModalOpen(true)}
          >
            + Добавить рецепт
          </button>
        </div>
      )}

      <AddRecipeModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        mealType={activeMeal}
        onAddRecipe={handleAddRecipe}
      />
    </div>
  );
}

export default HomePage;