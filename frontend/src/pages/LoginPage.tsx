import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser, registerUser } from '../api/api';

const LoginPage: React.FC = () => {
  const [isLogin, setIsLogin] = useState<boolean>(true);
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [weight, setWeight] = useState<string>('');
  const [height, setHeight] = useState<string>('');
  const [age, setAge] = useState<string>('');
  const [goal, setGoal] = useState<string>('support');
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (isLogin) {
        const response = await loginUser({ email, password });
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('userId', response.data.id);
        localStorage.setItem('userName', response.data.name);
        navigate('/');
      } else {
        const response = await registerUser({
          email,
          password,
          name,
          weight: parseFloat(weight),
          height: parseFloat(height),
          age: parseInt(age),
          goal
        });

        localStorage.setItem('token', response.data.token);
        localStorage.setItem('userId', response.data.id);
        localStorage.setItem('userName', response.data.name);
        localStorage.setItem('userEmail', email);
        localStorage.setItem('user', JSON.stringify({
          name: name,
          email: email,
          weight: parseFloat(weight),
          height: parseFloat(height),
          age: parseInt(age),
          goal: goal
        }));
        navigate('/');
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'Ошибка при входе');
    } finally {
      setLoading(false);
    }
  };

  const styles: { [key: string]: React.CSSProperties } = {
    container: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      minHeight: '100vh',
    },
    form: {
      display: 'flex',
      flexDirection: 'column',
      gap: '16px',
      maxWidth: '400px',
      margin: '0 auto',
      width: '100%',
    },
    input: {
      padding: '14px',
      background: '#1a1a1a',
      border: '1px solid #333',
      borderRadius: '12px',
      fontSize: '16px',
      color: '#fff',
    },
    error: {
      color: '#E389BF',
      textAlign: 'center',
      padding: '10px',
      background: 'rgba(227, 137, 191, 0.1)',
      borderRadius: '8px',
    },
    switchButton: {
      background: 'transparent',
      border: 'none',
      color: '#82A25C',
      cursor: 'pointer',
      fontSize: '14px',
      marginTop: '8px',
    },
  };

  return (
    <div className="page" style={styles.container}>
      <div className="date-row" style={{ justifyContent: 'center' }}>
        <h1 className="title">{isLogin ? 'Вход' : 'Регистрация'}</h1>
      </div>

      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={styles.input}
        />
        
        <input
          type="password"
          placeholder="Пароль"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={styles.input}
        />

        {!isLogin && (
          <>
            <input
              type="text"
              placeholder="Имя"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              style={styles.input}
            />
            <input
              type="number"
              placeholder="Вес (кг)"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              required
              style={styles.input}
            />
            <input
              type="number"
              placeholder="Рост (см)"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              required
              style={styles.input}
            />
            <input
              type="number"
              placeholder="Возраст"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              required
              style={styles.input}
            />
            <select
              value={goal}
              onChange={(e) => setGoal(e.target.value)}
              style={styles.input}
            >
              <option value="lose">Похудение</option>
              <option value="support">Поддержание</option>
              <option value="gain">Набор массы</option>
            </select>
          </>
        )}

        {error && <div style={styles.error}>{error}</div>}

        <button type="submit" className="main-btn" disabled={loading}>
          {loading ? 'Загрузка...' : (isLogin ? 'Войти' : 'Зарегистрироваться')}
        </button>

        <button
          type="button"
          onClick={() => setIsLogin(!isLogin)}
          style={styles.switchButton}
        >
          {isLogin ? 'Нет аккаунта? Зарегистрироваться' : 'Уже есть аккаунт? Войти'}
        </button>
      </form>
    </div>
  );
};

export default LoginPage;