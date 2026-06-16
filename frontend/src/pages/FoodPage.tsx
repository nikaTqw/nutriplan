import { useState } from 'react';

const FoodPage: React.FC = () => {
  const categories = ['Завтрак', 'Обед', 'Ужин', 'Салат', 'Второе', 'Суп'];
  const [activeCategory, setActiveCategory] = useState('Второе');

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Каталог</h1>

      <input
        type="text"
        placeholder="Поиск"
        style={styles.searchInput}
      />

      <div style={styles.recipeOfDay}>
        <div style={styles.rodLabel}>Рецепт дня</div>
        <div style={styles.rodName}>Картошка с котлеткой</div>
        <div style={styles.rodTime}>40 минут</div>
      </div>

      <div style={styles.categories}>
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            style={{
              ...styles.categoryButton,
              color: activeCategory === cat ? '#94b36a' : '#888',
              borderBottom: activeCategory === cat ? '2px solid #94b36a' : '2px solid transparent',
            }}
          >
            {cat}
          </button>
        ))}
      </div>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    padding: '20px',
    background: '#000',
    minHeight: '100vh',
    paddingBottom: '80px',
  },
  title: {
    fontSize: '28px',
    fontWeight: 600,
    marginBottom: '20px',
  },
  searchInput: {
    width: '100%',
    padding: '14px',
    background: '#1a1a1a',
    border: 'none',
    borderRadius: '30px',
    fontSize: '16px',
    color: '#fff',
    marginBottom: '24px',
  },
  recipeOfDay: {
    background: '#1a1a1a',
    borderRadius: '16px',
    padding: '20px',
    marginBottom: '24px',
  },
  rodLabel: {
    fontSize: '12px',
    color: '#94b36a',
    marginBottom: '8px',
  },
  rodName: {
    fontSize: '20px',
    fontWeight: 600,
    marginBottom: '6px',
  },
  rodTime: {
    fontSize: '14px',
    color: '#888',
  },
  categories: {
    display: 'flex',
    gap: '16px',
    overflowX: 'auto',
    paddingBottom: '8px',
  },
  categoryButton: {
    background: 'transparent',
    border: 'none',
    fontSize: '15px',
    fontWeight: 500,
    padding: '8px 0',
    cursor: 'pointer',
    whiteSpace: 'nowrap' as const,
  },
};

export default FoodPage;