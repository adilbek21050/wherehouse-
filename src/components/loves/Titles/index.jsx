import React, { useState } from 'react';
import bgImage from '../img/bab.png'; // Путь к вашей картинке из src/

function Titles() {
    // Состояние для позиции убегающей кнопки "Нет"
    const [noPosition, setNoPosition] = useState({ top: '60%', left: '55%' });

    // Состояние клика по кнопке "Даaaa"
    const [isAgreed, setIsAgreed] = useState(false);

    // Функция смещения кнопки "Нет"
    const moveNoButton = () => {
        const randomTop = Math.floor(Math.random() * 60 + 20) + '%';
        const randomLeft = Math.floor(Math.random() * 60 + 20) + '%';
        setNoPosition({ top: randomTop, left: randomLeft });
    };

    // Генерация строки из 100 слов "ура!"
    const celebrationText = Array(100).fill('ура!').join(' ');

    return (
        <div
            style={{
                // 1. Установка фона с затемнением для читаемости текста
                backgroundImage: `linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)), url(${bgImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',

                // Размеры и выравнивание
                width: '100vw',
                height: '100vh',
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
                padding: '20px',
                boxSizing: 'border-box',
                color: '#fff',
                overflow: 'hidden',
            }}
        >
            {!isAgreed ? (
                <>
                    <h1 style={{ fontSize: '36px', textShadow: '2px 2px 4px rgba(0,0,0,0.6)' }}>
                        ты меня любишь ?
                    </h1>

                    <div style={{ marginTop: '20px' }}>
                        {/* Кнопка "Даaaa" */}
                        <button
                            onClick={() => setIsAgreed(true)}
                            style={{
                                padding: '12px 28px',
                                fontSize: '20px',
                                fontWeight: 'bold',
                                cursor: 'pointer',
                                borderRadius: '8px',
                                border: 'none',
                                backgroundColor: '#ff4d4f',
                                color: '#fff',
                                boxShadow: '0 4px 10px rgba(0,0,0,0.2)',
                            }}
                        >
                            Даaaa
                        </button>

                        {/* Убегающая кнопка "Нет" */}
                        <button
                            onMouseEnter={moveNoButton}
                            onClick={moveNoButton}
                            style={{
                                position: 'absolute',
                                top: noPosition.top,
                                left: noPosition.left,
                                transition: 'all 0.2s ease',
                                padding: '12px 28px',
                                fontSize: '20px',
                                fontWeight: 'bold',
                                cursor: 'pointer',
                                borderRadius: '8px',
                                border: 'none',
                                backgroundColor: '#ffffff',
                                color: '#333',
                                boxShadow: '0 4px 10px rgba(0,0,0,0.2)',
                            }}
                        >
                            Нет
                        </button>
                    </div>
                </>
            ) : (
                /* 2. Контент после клика на "Даaaa" */
                <div
                    style={{
                        maxWidth: '800px',
                        maxHeight: '80vh',
                        overflowY: 'auto',
                        backgroundColor: 'rgba(255, 255, 255, 0.9)',
                        padding: '30px',
                        borderRadius: '16px',
                        color: '#ff4d4f',
                        boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
                    }}
                >
                    <h1 style={{ fontSize: '40px', marginBottom: '20px' }}>УРААА! ❤️</h1>
                    <p style={{ fontSize: '22px', lineHeight: '1.6', fontWeight: 'bold' }}>
                        {celebrationText}
                    </p>
                </div>
            )}
        </div>
    );
}

export default Titles;