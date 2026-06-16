import { useNavigate } from "react-router-dom";
import { categories, types } from "../data/recipes";

const CatalogPage: React.FC = () => {
  const navigate = useNavigate();

  const mealIcons: Record<string, string> = {
    "Завтрак": "🍳",
    "Обед": "🍲",
    "Перекус": "🍎",
    "Ужин": "🍽"
  };

  const typeIcons: Record<string, string> = {
    "Суп": "🥣",
    "Второе": "🍛",
    "Салат": "🥗",
    "Сладкое": "🍰",
    "Напиток": "🥤",
    "Каша": "🥣",
    "Закуска": "🍢"
  };

  return (
    <div className="page">
      <div className="date-row" style={{ justifyContent: "center" }}>
        <h1 className="title">Каталог</h1>
      </div>

      <div className="search-box" style={{ marginBottom: "24px" }}>
        <input
          type="text"
          placeholder="Поиск рецептов..."
          className="search-input"
          onFocus={() => navigate("/ai")}
        />
      </div>

      <div>
        <div className="section-title">По приёму пищи</div>
        <div style={styles.grid}>
          {categories.map(meal => (
            <div key={meal} style={styles.card} onClick={() => navigate(`/category/meal/${meal}`)}>
              <div style={styles.cardIcon}>{mealIcons[meal]}</div>
              <div style={styles.cardTitle}>{meal}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ marginTop: "24px" }}>
        <div className="section-title">По типу блюда</div>
        <div style={styles.grid}>
          {types.map(type => (
            <div key={type} style={styles.card} onClick={() => navigate(`/category/type/${type}`)}>
              <div style={styles.cardIcon}>{typeIcons[type]}</div>
              <div style={styles.cardTitle}>{type}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const styles = {
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    gap: "12px",
  },
  card: {
    background: "#1a1a1a",
    borderRadius: "16px",
    padding: "20px",
    textAlign: "center" as const,
    cursor: "pointer",
    transition: "all 0.2s",
  },
  cardIcon: {
    fontSize: "32px",
    marginBottom: "12px",
  },
  cardTitle: {
    fontSize: "14px",
    fontWeight: 500,
  },
};

export default CatalogPage;