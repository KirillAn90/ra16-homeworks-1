// ShopItemFunc.js
import React from 'react';
import './././css/main.css';

// Тип для пропса item
type ItemType = {
  brand: string;
  title: string;
  description: string;
  descriptionFull: string;
  price: number;
  currency: string;
};

const ShopItemFunc: React.FC<{ item: ItemType }> = ({ item }) => {
  // Форматируем цену
  const formattedPrice = `${item.currency}${item.price.toFixed(2)}`;

  return (
    <div className="main-content">
      <h2>{item.brand}</h2>
      <h1>{item.title}</h1>
      <h3>{item.description}</h3>
      <div className="description">{item.descriptionFull}</div>
      <div className="highlight-window mobile">
        <div className="highlight-overlay"></div>
      </div>
      <div className="divider"></div>
      <div className="purchase-info">
        <div className="price">{formattedPrice}</div>
        <button>Добавить в корзину</button>
      </div>
    </div>
  );
};

export default ShopItemFunc;
