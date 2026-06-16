import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { searchRecipes, categories, types, Recipe } from "../data/recipes";

const AiRecipePage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Все");
  const [selectedType, setSelectedType] = useState("Все");
  const [searchResults, setSearchResults] = useState<Recipe[]>([]);
  const [hasSearched, setHasSearched] = useState(false);
  const navigate = useNavigate();

  const handleSearch = () => {
    let results = searchRecipes(searchQuery);
    if (selectedCategory !== "Все") results = results.filter(r => r.category === selectedCategory);
    if (selectedType !== "Все") results = results.filter(r => r.type === selectedType);
    setSearchResults(results);
    setHasSearched(true);
  };

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedCategory("Все");
    setSelectedType("Все");
    setSearchResults([]);
    setHasSearched(false);
  };

  return (
    <div className="page">
      <div className="date-row" style={{ justifyContent: "center" }}>
        <h1 className="title">Поиск рецептов</h1>
      </div>

      <div className="search-box">
        <input
          type="text"
          placeholder="Поиск"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && handleSearch()}
          className="search-input"
        />
      </div>

      <div>
        <div className="section-title">Приём пищи:</div>
        <div className="categories-list">
          {["Все", ...categories].map(cat => (
            <button
              key={cat}
              className={`category-chip ${selectedCategory === cat ? "active" : ""}`}
              onClick={() => setSelectedCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div>
        <div className="section-title">Тип блюда:</div>
        <div className="categories-list">
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

      <button className="gradient-button-2 main-btn " onClick={handleSearch}>Найти рецепты</button>
      <button className="main-btn" style={{ background: "#5c5c5c" }} onClick={clearFilters}>Сбросить</button>

      {hasSearched && (
        <div style={{ marginTop: "20px" }}>
          <h3 style={{ marginBottom: "16px" }}>Результаты поиска: {searchResults.length}</h3>
          
          {searchResults.length === 0 ? (
            <div className="card" style={{ textAlign: "center" }}>
              <p>Ты нашёл суп с котом...</p>
              <p style={{ fontSize: "12px", color: "#888" }}>Попробуйте изменить запрос или фильтры</p>
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              {searchResults.map(recipe => (
                <div 
                  key={recipe.id} 
                  style={styles.recipeCard} 
                  onClick={() => navigate(`/recipe/${recipe.id}`)}
                >
                  <img src={recipe.image} alt={recipe.name} style={styles.image} />
                  <div style={styles.info}>
                    <h3 style={styles.name}>{recipe.name}</h3>
                    <div style={styles.meta}>
                      <span>{recipe.calories} ккал</span>
                      <span>{recipe.time} мин</span>
                      <span>{recipe.type}</span>
                    </div>
                    <div style={styles.tags}>
                      {recipe.ingredients.slice(0, 3).map(ing => (
                        <span key={ing} style={styles.tag}>{ing}</span>
                      ))}
                      {recipe.ingredients.length > 3 && <span style={styles.tag}>+{recipe.ingredients.length - 3}</span>}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

const styles = {
  recipeCard: {
    background: "#1a1a1a",
    borderRadius: "16px",
    padding: "16px",
    display: "flex",
    gap: "16px",
    cursor: "pointer",
    transition: "all 0.2s",
  },
  image: {
    width: "80px",
    height: "80px",
    borderRadius: "12px",
    objectFit: "cover" as const,
    background: "#2a2a2a",
  },
  info: {
    flex: 1,
    display: "flex",
    flexDirection: "column" as const,
    justifyContent: "center",
  },
  name: {
    fontSize: "18px",
    fontWeight: 600,
    marginBottom: "8px",
    color: "#f4f4f4",
  },
  meta: {
    display: "flex",
    gap: "16px",
    fontSize: "13px",
    color: "#82A25C",
    marginBottom: "8px",
  },
  tags: {
    display: "flex",
    flexWrap: "wrap" as const,
    gap: "8px",
  },
  tag: {
    fontSize: "11px",
    background: "#2a2a2a",
    padding: "4px 10px",
    borderRadius: "20px",
    color: "#f4f4f4",
  }
};

export default AiRecipePage;