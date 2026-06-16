import { useParams, useNavigate } from "react-router-dom";
import { recipes } from "../data/recipes";

const RecipePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const recipe = recipes[Number(id)];

  if (!recipe) {
    return (
      <div className="page">
        <div className="card" style={{ textAlign: "center" }}>
          <p>Рецепт не найден, поищите ещё. Я верю в тебя!</p>
          <button className="main-btn" onClick={() => navigate(-1)}>Назад</button>
        </div>
      </div>
    );
  }

  return (
    <div className="page">
      <div className="date-row">
        <button onClick={() => navigate(-1)}>←</button>
        <h1 className="title">{recipe.name}</h1>
        <div style={{ width: 40 }}></div>
      </div>

      <div className="card" style={{ padding: "0", overflow: "hidden" }}>
        <img 
          src={recipe.image} 
          alt={recipe.name} 
          style={{ 
            width: "100%", 
            height: "200px", 
            objectFit: "cover",
            display: "block"
          }} 
        />
      </div>

      <div className="card">
        <div style={{ display: "flex", gap: "24px", justifyContent: "center" }}>
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: "14px", color: "#82A25C" }}>{recipe.calories} ккал</div>
          </div>
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: "14px", color: "#82A25C" }}>{recipe.time} мин</div>
          </div>
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: "14px", color: "#82A25C" }}>{recipe.type}</div>
          </div>
        </div>
      </div>

      <div className="card">
        <h3 style={{ fontSize: "18px", fontWeight: 600, marginBottom: "16px", color: "#82A25C", textAlign: "center" }}>
          Ингредиенты
        </h3>
        <div className="tags">
          {recipe.ingredients.map((ingredient) => (
            <span key={ingredient}>{ingredient}</span>
          ))}
        </div>
      </div>

      <div className="card">
        <h3 style={{ fontSize: "18px", fontWeight: 600, marginBottom: "16px", color: "#82A25C", textAlign: "center" }}>
          Приготовление
        </h3>
        <ol style={{ marginLeft: "20px", display: "flex", flexDirection: "column", gap: "12px" }}>
          {recipe.steps.length > 0 ? (
            recipe.steps.map((step, idx) => (
              <li key={idx} style={{ lineHeight: 1.5 }}>{step}</li>
            ))
          ) : (
            <>
              <li>Сформируйте котлеты из фарша</li>
              <li>Обжарьте котлеты до золотистой корочки</li>
              <li>Отварите картофель до готовности</li>
              <li>Подавайте котлеты с картофелем</li>
            </>
          )}
        </ol>
      </div>

      <button className="main-btn" onClick={() => navigate(-1)}>
        Назад к рецептам
      </button>
    </div>
  );
};

export default RecipePage;