import React, { useState } from 'react';
import './App.css';

function App() {
  const [data, setData] = useState([]);
  const [formData, setFormData] = useState({ date: '', distance: '' });
  const [editMode, setEditMode] = useState(false);
  const [editDate, setEditDate] = useState(null);

  // Обработка изменения полей формы
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Добавление или обновление записи
  const handleSubmit = (e) => {
    e.preventDefault();
    const { date, distance } = formData;

    if (!date || !distance) return;

    const newDistance = parseFloat(distance);

    // Обновляем существующую запись или добавляем новую
    const existingEntry = data.find((entry) => entry.date === date);

    if (existingEntry) {
      existingEntry.distance += newDistance;
    } else {
      setData([...data, { date, distance: newDistance }]);
    }

    // Сортируем по дате (по убыванию)
    setData((prevData) =>
      [...prevData].sort((a, b) => new Date(b.date) - new Date(a.date))
    );

    setFormData({ date: '', distance: '' });
    setEditMode(false);
  };

  // Удаление записи
  const handleDelete = (dateToDelete) => {
    setData(data.filter((entry) => entry.date !== dateToDelete));
  };

  // Редактирование записи
  const handleEdit = (entry) => {
    setFormData({ date: entry.date, distance: entry.distance });
    setEditMode(true);
    setEditDate(entry.date);
    handleDelete(entry.date);
  };

  return (
    <div className="App">
      <h1>Трекер тренировок</h1>

      {/* Форма добавления/редактирования данных */}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Дата:</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Километры:</label>
          <input
            type="number"
            name="distance"
            value={formData.distance}
            onChange={handleChange}
            step="0.1"
            required
          />
        </div>
        <button type="submit">{editMode ? 'Обновить' : 'Добавить'}</button>
      </form>

      {/* Таблица с данными */}
      <table>
        <thead>
          <tr>
            <th>Дата</th>
            <th>Километры</th>
            <th>Действия</th>
          </tr>
        </thead>
        <tbody>
          {data.map((entry) => (
            <tr key={entry.date}>
              <td>{entry.date}</td>
              <td>{entry.distance.toFixed(1)} км</td>
              <td>
                <button onClick={() => handleEdit(entry)}>✎</button>
                <button onClick={() => handleDelete(entry.date)}>✘</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
