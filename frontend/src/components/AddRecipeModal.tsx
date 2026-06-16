import { useState, useEffect } from "react";
import { recipes, types, Recipe } from "../data/recipes";

interface AddRecipeModalProps {
  isOpen: boolean;
  onClose: () => void;
  mealType: string;
  onAddRecipe: (recipe: Recipe, meal: string) => void;
}

const AddRecipeModal: React.FC<AddRecipeModalProps> = ({ isOpen, onClose, mealType, onAddRecipe }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>(mealType);
  const [selectedType, setSelectedType] = useState<string>("Все");
  const [searchQuery, setSearchQuery] = useState("");
  const meals = ["Завтрак", "Обед", "Перекус", "Ужин"];

  useEffect(() => {
    if (isOpen) {
      setSelectedCategory(mealType);
      setSelectedType("Все");
      setSearchQuery("");
    }
  }, [isOpen, mealType]);

  if (!isOpen) return null;

  const filteredRecipes = Object.values(recipes).filter(recipe => {
    if (selectedCategory !== "Все" && recipe.category !== selectedCategory) return false;
    if (selectedType !== "Все" && recipe.type !== selectedType) return false;
    if (searchQuery && !recipe.name.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        <div style={styles.header}>
          <h3>Добавить рецепт</h3>
          <button style={styles.closeButton} onClick={onClose}>✕</button>
        </div>

        <div style={styles.searchSection}>
          <input
            type="text"
            placeholder="Поиск рецепта..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={styles.searchInput}
          />
        </div>

        <div style={styles.filters}>
          <div>
            <div style={styles.filterLabel}>Приём пищи:</div>
            <div style={styles.filterButtons}>
              {meals.map(meal => (
                <button
                  key={meal}
                  className={`category-chip ${selectedCategory === meal ? "active" : ""}`}
                  onClick={() => setSelectedCategory(meal)}
                >
                  {meal}
                </button>
              ))}
            </div>
          </div>

          <div style={{ marginTop: "12px" }}>
            <div style={styles.filterLabel}>Тип блюда:</div>
            <div style={styles.filterButtons}>
              {["Все", ...types].map(type => (
                <button
                  key={type}
                  className={`category-chip ${selectedType === type ? "active" : ""}`}
                  onClick={() => setSelectedType(type)}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div style={styles.recipesList}>
          {filteredRecipes.map(recipe => (
            <div key={recipe.id} style={styles.recipeItem} onClick={() => onAddRecipe(recipe, selectedCategory)}>
              <img src={recipe.image} alt={recipe.name} style={styles.recipeImage} />
              <div style={styles.recipeInfo}>
                <div style={styles.recipeName}>{recipe.name}</div>
                <div style={styles.recipeMeta}>
                  <span>{recipe.calories} ккал</span>
                  <span>{recipe.time} мин</span>
                  <span>{recipe.type}</span>
                </div>
              </div>
            </div>
          ))}
          {filteredRecipes.length === 0 && (
            <div style={styles.emptyState}>Нет рецептов по выбранным критериям</div>
          )}
        </div>
      </div>
    </div>
  );
};

const styles = {
  overlay: {
    position: "fixed" as const,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: "rgba(0, 0, 0, 0.8)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 2000,
  },
  modal: {
    background: "#1a1a1a",
    borderRadius: "20px",
    width: "90%",
    maxWidth: "500px",
    maxHeight: "80vh",
    display: "flex",
    flexDirection: "column" as const,
    overflow: "hidden",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "16px 20px",
    borderBottom: "1px solid #333",
  },
  closeButton: {
    background: "none",
    border: "none",
    fontSize: "24px",
    cursor: "pointer",
    color: "#888",
  },
  searchSection: {
    padding: "16px",
    borderBottom: "1px solid #333",
  },
  searchInput: {
    width: "100%",
    padding: "12px",
    background: "#0c0c0c",
    border: "1px solid #333",
    borderRadius: "12px",
    fontSize: "16px",
    color: "#fff",
  },
  filters: {
    padding: "16px",
    borderBottom: "1px solid #333",
  },
  filterLabel: {
    fontSize: "12px",
    color: "#82A25C",
    marginBottom: "8px",
  },
  filterButtons: {
    display: "flex",
    flexWrap: "wrap" as const,
    gap: "8px",
  },
  recipesList: {
    flex: 1,
    overflowY: "auto" as const,
    padding: "16px",
  },
  recipeItem: {
    display: "flex",
    gap: "12px",
    padding: "12px",
    background: "#0c0c0c",
    borderRadius: "12px",
    marginBottom: "12px",
    cursor: "pointer",
  },
  recipeImage: {
    width: "60px",
    height: "60px",
    borderRadius: "8px",
    objectFit: "cover" as const,
    background: "#333",
  },
  recipeInfo: {
    flex: 1,
  },
  recipeName: {
    fontSize: "16px",
    fontWeight: 600,
    marginBottom: "4px",
  },
  recipeMeta: {
    display: "flex",
    gap: "12px",
    fontSize: "12px",
    color: "#82A25C",
  },
  emptyState: {
    textAlign: "center" as const,
    padding: "40px",
    color: "#888",
  },
};

export default AddRecipeModal;