import React, { useState } from 'react';

const ColorConverter = () => {
  const [hexColor, setHexColor] = useState('');
  const [rgbColor, setRgbColor] = useState('');
  const [error, setError] = useState(false);

  const convertHexToRgb = (hex) => {
    const r = parseInt(hex.substring(1, 3), 16);
    const g = parseInt(hex.substring(3, 5), 16);
    const b = parseInt(hex.substring(5, 7), 16);
    return `rgb(${r}, ${g}, ${b})`;
  };

  const handleChange = (e) => {
    const input = e.target.value;
    setHexColor(input);

    if (input.length === 7 && /^#([A-Fa-f0-9]{6})$/.test(input)) {
      setRgbColor(convertHexToRgb(input));
      setError(false);
    } else {
      setRgbColor('');
      setError(true);
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: rgbColor }}>
      <div style={{ textAlign: 'center' }}>
        <input
          type="text"
          placeholder="#34495e"
          value={hexColor}
          onChange={handleChange}
          style={{ padding: '10px', marginBottom: '10px' }}
        />
        {error && <p style={{ color: 'red' }}>Неверный формат HEX</p>}
        <div style={{ backgroundColor: hexColor, width: '100px', height: '100px', borderRadius: '5px', margin: '10px 0' }} />
        <p>{rgbColor}</p>
      </div>
    </div>
  );
};

export default ColorConverter;
