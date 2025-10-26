import React, { useState } from 'react';
import './App.css';

function App() {
  const [hexValue, setHexValue] = useState('');
  const [rgbValue, setRgbValue] = useState(null);
  const [error, setError] = useState(false);
  const [backgroundColor, setBackgroundColor] = useState('#ffffff');

  const validateAndConvert = (value) => {
    // Проверяем длину (7 символов: # + 6 hex)
    if (value.length !== 7) {
      setError(false);
      setRgbValue(null);
      return;
    }

    // Проверяем формат: # + 6 символов 0-9, A-F, a-f
    const hexRegex = /^#[0-9A-Fa-f]{6}$/;
    if (!hexRegex.test(value)) {
      setError(true);
      setRgbValue(null);
      setBackgroundColor('#ffffff');
      return;
    }

    // Конвертируем HEX в RGB
    const r = parseInt(value.slice(1, 3), 16);
    const g = parseInt(value.slice(3, 5), 16);
    const b = parseInt(value.slice(5, 7), 16);

    setRgbValue({ r, g, b });
    setError(false);
    setBackgroundColor(value);
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setHexValue(value);
    validateAndConvert(value);
  };

  return (
    <div className="app" style={{ backgroundColor }}>
      <div className="converter-container">
        <h1>Конвертер цветов HEX → RGB</h1>
        <div className="input-group">
          <label htmlFor="hexInput">Введите HEX-код (например, #FF5733):</label>
          <input
            type="text"
            id="hexInput"
            value={hexValue}
            onChange={handleInputChange}
            placeholder="#RRGGBB"
            maxLength={7}
          />
        </div>
        {error && <p className="error">Ошибка: неверный формат HEX-кода</p>}
        {rgbValue && (
          <div className="result">
            <p>
              <strong>RGB:</strong> {rgbValue.r}, {rgbValue.g}, {rgbValue.b}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
