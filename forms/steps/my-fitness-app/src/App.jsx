import React, { useState } from 'react';
import './App.css'; // Добавьте стили для выравнивания и оформления

function App() {
  const [date, setDate] = useState('');
  const [distance, setDistance] = useState('');
  const [data, setData] = useState([]);
  const [editIndex, setEditIndex] = useState(null); // Индекс редактируемой записи
  const [editMode, setEditMode] = useState(false); // Режим редактирования

  const handleSubmit = (e) => {
    e.preventDefault();
    const newEntry = { date, distance: parseFloat(distance) };
    let updatedData = [...data];

    // Check if date already exists
    const existingIndex = updatedData.findIndex(entry => entry.date === date);
    if (existingIndex !== -1) {
      updatedData[existingIndex].distance += parseFloat(distance);
    } else {
      updatedData.push(newEntry);
    }

    // Sort by date
    updatedData.sort((a, b) => new Date(b.date) - new Date(a.date));

    setData(updatedData);
    setDate('');
    setDistance('');
    setEditMode(false);
  };

  const handleDelete = (index) => {
    const updatedData = [...data];
    updatedData.splice(index, 1);
    setData(updatedData);
  };

  const handleEdit = (index) => {
    setEditIndex(index);
    setDate(data[index].date);
    setDistance(data[index].distance.toString());
    setEditMode(true);
  };

  const saveEdit = () => {
    if (editIndex !== null) {
      const updatedData = [...data];
      updatedData[editIndex] = { date, distance: parseFloat(distance) };
      setData(updatedData);
      setEditIndex(null);
      setEditMode(false);
    }
  };

  return (
    <div className="container">
      <div className="form-container">
        <h2>Дата (ДД.ММ.ГГ)</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            placeholder="Дата"
          />
          <input
            type="number"
            step="0.1"
            value={distance}
            onChange={(e) => setDistance(e.target.value)}
            placeholder="Пройдено км"
          />
          <button type="submit">OK</button>
        </form>
      </div>

      <div className="results-container">
        <h2>Результаты</h2>
        <table>
          <thead>
            <tr>
              <th>Дата</th>
              <th>Пройдено км</th>
              <th>Действия</th>
            </tr>
          </thead>
          <tbody>
            {data.map((entry, index) => (
              <tr key={index}>
                <td>{entry.date}</td>
                <td>{entry.distance.toFixed(1)}</td>
                <td>
                  <button onClick={() => handleEdit(index)}>✎</button>
                  <button onClick={() => handleDelete(index)}>✘</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Модальное окно для редактирования */}
      {editMode && (
        <div className="modal">
          <div className="modal-content">
            <h2>Редактировать запись</h2>
            <form onSubmit={saveEdit}>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                placeholder="Дата"
              />
              <input
                type="number"
                step="0.1"
                value={distance}
                onChange={(e) => setDistance(e.target.value)}
                placeholder="Пройдено км"
              />
              <button type="submit">Сохранить</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
