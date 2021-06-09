import React from 'react';

export default function Error404(props) {

  return (
    <div className="error">
      <h2 className="error__title">404</h2>
      <p className="error__description">Страница не найдена</p>
      <button
        className="error__return-btn element-hover"
        type="button"
        onClick={props.goBack}
      >Назад</button>
    </div>
  );
}