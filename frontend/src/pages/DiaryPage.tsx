import { useState, useEffect } from 'react';
import { getDiaryDay, addDiaryEntry, getFoods } from '../api/api';
import { Food, DiaryEntry } from '../types';

const DiaryPage: React.FC = () => {
  const [entries, setEntries] = useState<DiaryEntry[]>([]);
  const [foods, setFoods] = useState<Food[]>([]);
  const [selectedFoodId, setSelectedFoodId] = useState<string>('');
  const [weight, setWeight] = useState<number>(100);
  const [selectedDate, setSelectedDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const userId: string = localStorage.getItem('userId') || 'temp-user-id';

  useEffect(() => {
    loadDiary();
    getFoods()
      .then(res => setFoods(res.data))
      .catch(() => {
        setFoods([
          { id: '1', name: 'Куриная грудка', calories: 165, protein: 31, fat: 3.6, carbs: 0 },
          { id: '2', name: 'Рис', calories: 130, protein: 2.7, fat: 0.3, carbs: 28 },
          { id: '3', name: 'Яйцо', calories: 155, protein: 13, fat: 11, carbs: 1.1 },
        ]);
      });
  }, [selectedDate]);

  const loadDiary = (): void => {
    getDiaryDay(userId, selectedDate)
      .then(res => {
        setEntries(res.data.entries || []);
      })
      .catch(() => {
        setEntries([]);
      });
  };

  const addEntry = async (): Promise<void> => {
    if (!selectedFoodId) {
      alert('Выберите продукт');
      return;
    }
    
    try {
      await addDiaryEntry({
        userId,
        foodId: selectedFoodId,
        weightInGrams: weight,
        date: selectedDate,
      });
      loadDiary();
      setSelectedFoodId('');
      setWeight(100);
    } catch (error) {
      console.error('Error adding entry:', error);
      alert('Ошибка при добавлении');
    }
  };

  return (
    <div style={styles.container}>
      <h2>Дневник питания</h2>
      
      <input
        type="date"
        value={selectedDate}
        onChange={(e) => setSelectedDate(e.target.value)}
        style={styles.input}
      />

      <div style={styles.addSection}>
        <select 
          value={selectedFoodId} 
          onChange={(e) => setSelectedFoodId(e.target.value)}
          style={styles.select}
        >
          <option value="">Выберите продукт</option>
          {foods.map((f) => (
            <option key={f.id} value={f.id}>{f.name}</option>
          ))}
        </select>
        
        <input
          type="number"
          value={weight}
          onChange={(e) => setWeight(Number(e.target.value))}
          style={styles.input}
          placeholder="Вес в граммах"
        />
        
        <button onClick={addEntry} style={styles.addButton}>
          + Добавить
        </button>
      </div>

      <div style={styles.entriesList}>
        <h3>Записи за {selectedDate}</h3>
        {entries.length === 0 ? (
          <p>Нет записей</p>
        ) : (
          entries.map((entry, idx) => (
            <div key={idx} style={styles.entryItem}>
              <span>{entry.foodName}</span>
              <span>{entry.weightInGrams} г</span>
              <span>{entry.calories} ккал</span>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    padding: '20px',
    background: '#000',
    minHeight: '100vh',
    color: '#fff',
    paddingBottom: '80px',
  },
  input: {
    width: '100%',
    padding: '10px',
    marginBottom: '10px',
    borderRadius: '8px',
    border: '1px solid #333',
    background: '#1a1a1a',
    color: '#fff',
    fontSize: '16px',
  },
  select: {
    width: '100%',
    padding: '10px',
    marginBottom: '10px',
    borderRadius: '8px',
    border: '1px solid #333',
    background: '#1a1a1a',
    color: '#fff',
    fontSize: '16px',
  },
  addSection: {
    marginTop: '20px',
    marginBottom: '30px',
  },
  addButton: {
    width: '100%',
    padding: '12px',
    background: '#94b36a',
    color: '#000',
    border: 'none',
    borderRadius: '8px',
    fontWeight: 'bold',
    cursor: 'pointer',
    fontSize: '16px',
  },
  entriesList: {
    marginTop: '20px',
  },
  entryItem: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '12px',
    marginBottom: '8px',
    background: '#1a1a1a',
    borderRadius: '8px',
  },
};

export default DiaryPage;