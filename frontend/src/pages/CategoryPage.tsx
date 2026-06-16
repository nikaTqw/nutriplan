import { useParams, useNavigate } from "react-router-dom";
import { getRecipesByCategory, getRecipesByType, Recipe } from "../data/recipes";

const CategoryPage: React.FC = () => {
  const { type, value } = useParams<{ type: string; value: string }>();
  const navigate = useNavigate();

  let recipes: Recipe[] = [];
  let title = "";

  if (type === "meal" && value) {
    recipes = getRecipesByCategory(value);
    title = value;
  } else if (type === "type" && value) {
    recipes = getRecipesByType(value);
    title = value;
  }

  return (
    <div className="page" style={{ paddingBottom: "80px" }}>
      <div className="date-row">
        <button onClick={() => navigate(-1)}>←</button>
        <h1 className="title">{title}</h1>
        <div style={{ width: 40 }}></div>
      </div>

      {recipes.length === 0 ? (
        <div className="card" style={{ textAlign: "center" }}>
          <p>Нет рецептов в этой категории... эххх</p>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          {recipes.map(recipe => (
            <div 
              key={recipe.id} 
              style={{
                background: "#1a1a1a",
                borderRadius: "16px",
                padding: "16px",
                cursor: "pointer",
                display: "flex",
                flexDirection: "row",
                gap: "16px",
                alignItems: "center"
              }}
              onClick={() => navigate(`/recipe/${recipe.id}`)}
            >
              <img 
                src={recipe.image} 
                alt={recipe.name} 
                style={{ 
                  width: "80px", 
                  height: "80px", 
                  borderRadius: "12px", 
                  objectFit: "cover",
                  background: "#2a2a2a"
                }} 
              />
              <div style={{ flex: 1 }}>
                <h3 style={{ fontSize: "18px", fontWeight: 600, marginBottom: "8px", color: "#f4f4f4" }}>{recipe.name}</h3>
                <div style={{ display: "flex", gap: "16px", fontSize: "13px", color: "#82A25C", marginBottom: "8px", flexWrap: "wrap" }}>
                  <span>🔥 {recipe.calories} ккал</span>
                  <span>⏱ {recipe.time} мин</span>
                  <span>🍽 {recipe.type}</span>
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginTop: "8px" }}>
                  {recipe.ingredients.slice(0, 3).map(ing => (
                    <span key={ing} style={{ fontSize: "11px", background: "#2a2a2a", padding: "4px 10px", borderRadius: "20px", color: "#f4f4f4" }}>{ing}</span>
                  ))}
                  {recipe.ingredients.length > 3 && (
                    <span style={{ fontSize: "11px", background: "#2a2a2a", padding: "4px 10px", borderRadius: "20px", color: "#f4f4f4" }}>
                      +{recipe.ingredients.length - 3}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CategoryPage;