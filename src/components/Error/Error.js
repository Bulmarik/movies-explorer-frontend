import React from 'react';

export default function Error() {

  return (
    <div className="error">
      <h2 className="error__title">404</h2>
      <p className="error__description">Страница не найдена</p>
      <button className="error__return-btn element-hover" type="button">Назад</button>
    </div>
  );
}