import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecipe } from '../context/RecipeContext';
import AddRecipeModal from '../components/AddRecipeModal';
import { Recipe } from '../data/recipes';

const CalendarPage: React.FC = () => {
  const [view, setView] = useState<'day' | 'week' | 'month' | 'year'>('week');
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [pendingRecipe, setPendingRecipe] = useState<Recipe | null>(null);
  const [pendingMeal, setPendingMeal] = useState<string>("");
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const navigate = useNavigate();
  const { getRecipesForDate, addUserRecipe } = useRecipe();

  const today = new Date();
  const isToday = (date: Date) => date.toDateString() === today.toDateString();
  const isSelected = (date: Date) => date.toDateString() === selectedDate.toDateString();

  const normalizeDate = (date: Date): string => {
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
  };

  const getRecipesForDateKey = (date: Date) => {
    const dateKey = normalizeDate(date);
    return getRecipesForDate(dateKey);
  };

  const getRecipesCount = (date: Date) => getRecipesForDateKey(date).length;

  const getMonthDays = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    return Array.from({ length: daysInMonth }, (_, i) => new Date(year, month, i + 1));
  };

  const getWeekDays = (date: Date) => {
    const start = new Date(date);
    const day = start.getDay();
    const diff = start.getDate() - day + (day === 0 ? -6 : 1);
    start.setDate(diff);
    return Array.from({ length: 7 }, (_, i) => {
      const d = new Date(start);
      d.setDate(start.getDate() + i);
      return d;
    });
  };

  const months = ["Янв", "Фев", "Мар", "Апр", "Май", "Июн", "Июл", "Авг", "Сен", "Окт", "Ноя", "Дек"];
  const views = [
    { label: 'День', value: 'day' },
    { label: 'Неделя', value: 'week' },
    { label: 'Месяц', value: 'month' },
    { label: 'Год', value: 'year' },
  ];

  const changeWeek = (offset: number) => {
    const d = new Date(currentDate);
    d.setDate(d.getDate() + offset * 7);
    setCurrentDate(d);
  };

  const changeMonth = (offset: number) => {
    const d = new Date(currentDate);
    d.setMonth(d.getMonth() + offset);
    setCurrentDate(d);
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleAddRecipe = (recipe: Recipe, meal: string) => {
    const dateKey = normalizeDate(selectedDate);
    const existingRecipes = getRecipesForDate(dateKey);
    const mealExists = existingRecipes.some(r => r.meal === meal);
    
    if (mealExists) {
      setPendingRecipe(recipe);
      setPendingMeal(meal);
      setShowConfirmModal(true);
      setIsModalOpen(false);
    } else {
      addUserRecipe(recipe, dateKey, meal);
      setIsModalOpen(false);
    }
  };

  const handleReplaceRecipe = () => {
    if (pendingRecipe) {
      const dateKey = normalizeDate(selectedDate);
      addUserRecipe(pendingRecipe, dateKey, pendingMeal);
      setPendingRecipe(null);
      setPendingMeal("");
      setShowConfirmModal(false);
    }
  };

  const handleCancelReplace = () => {
    setPendingRecipe(null);
    setPendingMeal("");
    setShowConfirmModal(false);
    setIsModalOpen(true);
  };

  const handleDayClick = (date: Date) => {
    setSelectedDate(date);
    setCurrentDate(date);
    setView('week');
  };

  const handleWeekDayClick = (date: Date) => setSelectedDate(date);

  const handleRecipeClick = (recipeId: number) => navigate(`/recipe/${recipeId}`);

  const weekDays = getWeekDays(currentDate);
  const monthDays = getMonthDays(currentDate);
  const formatDay = (date: Date) => date.toLocaleDateString('ru-RU', { day: 'numeric', month: 'long' });

  const selectedRecipes = getRecipesForDateKey(selectedDate);

  return (
    <div className="page">
      <div className="date-row" style={{ justifyContent: 'center' }}>
        <h1 className="title">Календарь</h1>
      </div>

      <div className="tabs">
        {views.map(v => (
          <button
            key={v.value}
            className={`tab ${view === v.value ? 'active' : ''}`}
            onClick={() => {
              if (v.value === 'week' || v.value === 'month') {
                setCurrentDate(new Date());
                setSelectedDate(new Date());
              }
              setView(v.value as any);
            }}
          >
            {v.label}
          </button>
        ))}
      </div>

      {view === 'week' && (
        <>
          <div className="calendar-week-nav">
            <button className="calendar-nav-button" onClick={() => changeWeek(-1)}>←</button>
            <h2 className="calendar-week-title">{formatDay(selectedDate)}</h2>
            <button className="calendar-nav-button" onClick={() => changeWeek(1)}>→</button>
          </div>

          <div className="calendar-days-grid">
            {weekDays.map(day => {
              const recipesCount = getRecipesCount(day);
              const selected = isSelected(day);
              
              return (
                <div 
                  key={day.toISOString()} 
                  className="calendar-day-card" 
                  style={{ 
                    background: selected ? '#82A25C' : '#1a1a1a',
                    cursor: 'pointer'
                  }}
                  onClick={() => handleWeekDayClick(day)}
                >
                  <div className="calendar-day-number" style={{ color: selected ? '#000' : '#fff' }}>
                    {day.getDate()}
                  </div>
                  {recipesCount > 0 && (
                    <div style={{ fontSize: '10px', color: selected ? '#000' : '#82A25C', marginTop: '8px' }}>
                      {recipesCount} рец.
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {selectedRecipes.length > 0 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {selectedRecipes.map((item, idx) => (
                <div 
                  key={idx}
                  className="calendar-recipe-card" 
                  onClick={() => handleRecipeClick(item.recipe.id)}
                  style={{ cursor: 'pointer' }}
                >
                  <h3>{item.meal}: {item.recipe.name}</h3>
                  <p>{item.recipe.time} мин • {item.recipe.calories} ккал</p>
                  <div className="tags" style={{ marginTop: '10px' }}>
                    {item.recipe.ingredients.slice(0, 4).map(ing => <span key={ing}>{ing}</span>)}
                    {item.recipe.ingredients.length > 4 && <span>+{item.recipe.ingredients.length - 4}</span>}
                  </div>
                  <button className="calendar-recipe-button">Приготовить</button>
                </div>
              ))}
            </div>
          )}

          <button className="calendar-add-button" onClick={handleOpenModal}>
            + Добавить рецепт
          </button>
        </>
      )}

      {view === 'month' && (
        <>
          <div className="calendar-week-nav">
            <button className="calendar-nav-button" onClick={() => changeMonth(-1)}>←</button>
            <h2 className="calendar-week-title">
              {currentDate.toLocaleDateString('ru-RU', { month: 'long', year: 'numeric' })}
            </h2>
            <button className="calendar-nav-button" onClick={() => changeMonth(1)}>→</button>
          </div>

          <div className="calendar-days-grid">
            {monthDays.map(day => {
              const recipesCount = getRecipesCount(day);
              
              return (
                <div 
                  key={day.toISOString()} 
                  className="calendar-day-card" 
                  style={{ 
                    background: isToday(day) ? '#82A25C' : '#1a1a1a',
                    minHeight: '80px',
                    cursor: 'pointer'
                  }}
                  onClick={() => handleDayClick(day)}
                >
                  <div className="calendar-day-number" style={{ color: isToday(day) ? '#000' : '#fff' }}>
                    {day.getDate()}
                  </div>
                  {recipesCount > 0 && (
                    <div style={{ fontSize: '10px', color: isToday(day) ? '#000' : '#82A25C', marginTop: '8px' }}>
                      {recipesCount}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </>
      )}

      {view === 'day' && (
        <div className="calendar-day-view">
          <div className="calendar-week-nav">
            <button onClick={() => {
              const d = new Date(currentDate);
              d.setDate(d.getDate() - 1);
              setCurrentDate(d);
              setSelectedDate(d);
            }}>←</button>
            <h2>{formatDay(currentDate)}</h2>
            <button onClick={() => {
              const d = new Date(currentDate);
              d.setDate(d.getDate() + 1);
              setCurrentDate(d);
              setSelectedDate(d);
            }}>→</button>
          </div>

          {selectedRecipes.map((item, idx) => (
            <div key={idx} className="calendar-recipe-card" onClick={() => handleRecipeClick(item.recipe.id)} style={{ cursor: 'pointer' }}>
              <h3>{item.meal}: {item.recipe.name}</h3>
              <p>{item.recipe.time} мин • {item.recipe.calories} ккал</p>
              <div className="tags" style={{ marginTop: '10px' }}>
                {item.recipe.ingredients.slice(0, 6).map(ing => <span key={ing}>{ing}</span>)}
              </div>
              <button className="calendar-recipe-button">Приготовить</button>
            </div>
          ))}

          <button className="calendar-add-button" onClick={handleOpenModal}>
            + Добавить рецепт
          </button>
        </div>
      )}

      {view === 'year' && (
        <div className="calendar-year-grid">
          {months.map((m, i) => (
            <div
              key={m}
              className="calendar-year-month"
              style={{ background: currentDate.getMonth() === i ? '#82A25C' : '#1a1a1a' }}
              onClick={() => {
                setCurrentDate(new Date(currentDate.getFullYear(), i, 1));
                setView('month');
              }}
            >
              {m}
            </div>
          ))}
        </div>
      )}

      <AddRecipeModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        mealType="Обед"
        onAddRecipe={handleAddRecipe}
      />

      {showConfirmModal && (
        <div style={styles.overlay}>
          <div style={styles.confirmModal}>
            <h3>Подтверждение замены</h3>
            <p>На {pendingMeal.toLowerCase()} уже есть рецепт. Вы хотите его заменить?</p>
            <div style={styles.confirmButtons}>
              <button className="main-btn" onClick={handleReplaceRecipe}>Да, заменить</button>
              <button className="main-btn" style={{ background: "#393939" }} onClick={handleCancelReplace}>Отмена</button>
            </div>
          </div>
        </div>
      )}
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
  confirmModal: {
    background: "#1a1a1a",
    borderRadius: "20px",
    padding: "24px",
    width: "90%",
    maxWidth: "320px",
    textAlign: "center" as const,
    display: "flex",
    flexDirection: "column" as const,
    gap: "20px",
  },
  confirmButtons: {
    display: "flex",
    gap: "12px",
    justifyContent: "center",
  },
};

export default CalendarPage;