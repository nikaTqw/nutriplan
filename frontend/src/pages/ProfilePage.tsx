import { useState, useEffect } from 'react';

interface UserProfile {
  name: string;
  email: string;
  weight: number;
  height: number;
  age: number;
  goal: 'lose' | 'support' | 'gain';
}

const ProfilePage: React.FC = () => {
  const [user, setUser] = useState<UserProfile>({
    name: '',
    email: '',
    weight: 70,
    height: 170,
    age: 30,
    goal: 'support',
  });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    // Загружаем данные из localStorage
    const savedUser = localStorage.getItem('user');
    const userName = localStorage.getItem('userName');
    const userEmail = localStorage.getItem('userEmail');
    
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    } else if (userName) {
      setUser(prev => ({ ...prev, name: userName, email: userEmail || '' }));
    }
  }, []);

  const saveUser = () => {
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('userName', user.name);
    localStorage.setItem('userEmail', user.email);
    setIsEditing(false);
    alert('Профиль сохранен!');
  };

  const calculateBMI = (): string => {
    const heightInMeters = user.height / 100;
    const bmi = user.weight / (heightInMeters * heightInMeters);
    return bmi.toFixed(1);
  };

  const calculateCalories = (): number => {
    return Math.round(10 * user.weight + 6.25 * user.height - 5 * user.age + 5);
  };

  return (
    <div className="page">
      <div className="date-row" style={{ justifyContent: 'center' }}>
        <h1 className="title">Профиль</h1>
      </div>

      <div style={styles.avatar}>
        <div style={styles.avatarIcon}>
          {user.name ? user.name[0].toUpperCase() : '👤'}
        </div>
        <h3>{user.name || 'Гость'}</h3>
        <p>{user.email || 'email@example.com'}</p>
      </div>

      <div style={styles.statsGrid}>
        <div style={styles.statCard}>
          <div>Вес</div>
          <div style={styles.statValue}>{user.weight} кг</div>
        </div>
        <div style={styles.statCard}>
          <div>Рост</div>
          <div style={styles.statValue}>{user.height} см</div>
        </div>
        <div style={styles.statCard}>
          <div>Возраст</div>
          <div style={styles.statValue}>{user.age} лет</div>
        </div>
        <div style={styles.statCard}>
          <div>ИМТ</div>
          <div style={styles.statValue}>{calculateBMI()}</div>
        </div>
      </div>

      {isEditing ? (
        <div style={styles.editForm}>
          <input
            type="text"
            placeholder="Имя"
            value={user.name}
            onChange={(e) => setUser({ ...user, name: e.target.value })}
            style={styles.input}
          />
          <input
            type="email"
            placeholder="Email"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            style={styles.input}
          />
          <input
            type="number"
            placeholder="Вес (кг)"
            value={user.weight}
            onChange={(e) => setUser({ ...user, weight: Number(e.target.value) })}
            style={styles.input}
          />
          <input
            type="number"
            placeholder="Рост (см)"
            value={user.height}
            onChange={(e) => setUser({ ...user, height: Number(e.target.value) })}
            style={styles.input}
          />
          <input
            type="number"
            placeholder="Возраст"
            value={user.age}
            onChange={(e) => setUser({ ...user, age: Number(e.target.value) })}
            style={styles.input}
          />
          <select
            value={user.goal}
            onChange={(e) => setUser({ ...user, goal: e.target.value as any })}
            style={styles.select}
          >
            <option value="lose">Похудение</option>
            <option value="support">Поддержание</option>
            <option value="gain">Набор массы</option>
          </select>
          
          <button onClick={saveUser} style={styles.saveButton}>Сохранить</button>
          <button onClick={() => setIsEditing(false)} style={styles.cancelButton}>Отмена</button>
        </div>
      ) : (
        <button onClick={() => setIsEditing(true)} style={styles.editButton}>
          ✏️ Редактировать профиль
        </button>
      )}

      <div style={styles.infoCard}>
        <h4>Ваша цель: </h4>
        <p>
          {user.goal === 'lose' && 'Снижение веса'}
          {user.goal === 'support' && 'Поддержание формы'}
          {user.goal === 'gain' && 'Набор мышечной массы'}
        </p>
        <h4 style={{ marginTop: '20px' }}>📊 Дневная норма калорий</h4>
        <p style={styles.caloriesValue}>{calculateCalories()} ккал/день</p>
      </div>
    </div>
  );
};

const styles = {
  avatar: {
    textAlign: 'center' as const,
    marginBottom: '30px',
  },
  avatarIcon: {
    width: '80px',
    height: '80px',
    background: '#82A25C',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '40px',
    margin: '0 auto 15px',
    color: '#000',
  },
  statsGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '12px',
    marginBottom: '30px',
  },
  statCard: {
    background: '#1a1a1a',
    padding: '15px',
    borderRadius: '12px',
    textAlign: 'center' as const,
  },
  statValue: {
    fontSize: '24px',
    fontWeight: 'bold',
    marginTop: '8px',
    color: '#82A25C',
  },
  editForm: {
    marginTop: '20px',
  },
  input: {
    width: '100%',
    padding: '12px',
    marginBottom: '10px',
    borderRadius: '8px',
    border: '1px solid #333',
    background: '#1a1a1a',
    color: '#fff',
    fontSize: '16px',
  },
  select: {
    width: '100%',
    padding: '12px',
    marginBottom: '10px',
    borderRadius: '8px',
    border: '1px solid #333',
    background: '#1a1a1a',
    color: '#fff',
    fontSize: '16px',
  },
  editButton: {
    width: '100%',
    padding: '14px',
    background: '#82A25C',
    color: '#000',
    border: 'none',
    borderRadius: '12px',
    fontWeight: 'bold',
    cursor: 'pointer',
    fontSize: '16px',
  },
  saveButton: {
    width: '100%',
    padding: '14px',
    background: '#82A25C',
    color: '#000',
    border: 'none',
    borderRadius: '12px',
    fontWeight: 'bold',
    cursor: 'pointer',
    fontSize: '16px',
    marginBottom: '10px',
  },
  cancelButton: {
    width: '100%',
    padding: '14px',
    background: '#333',
    color: '#fff',
    border: 'none',
    borderRadius: '12px',
    fontWeight: 'bold',
    cursor: 'pointer',
    fontSize: '16px',
  },
  infoCard: {
    marginTop: '30px',
    padding: '20px',
    background: '#1a1a1a',
    borderRadius: '16px',
  },
  caloriesValue: {
    fontSize: '32px',
    fontWeight: 'bold',
    color: '#DECA08',
    marginTop: '10px',
  },
};

export default ProfilePage;