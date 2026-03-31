import { useState } from "react";

// Функция для преобразования HEX в RGB
const hexToRgb = (hex) => {
    const bigint = parseInt(hex.slice(1), 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;
    return `rgb(${r}, ${g}, ${b})`;
};

function setColorBody(value) {
    document.body.style.backgroundColor = value;
}

export default function ColorConverter({ initialHexColor = "#ffffff" }) {
    const [hexColor, setHexColor] = useState(initialHexColor);
    const [isValid, setIsValid] = useState(true);
    const hexRegex = /^#[0-9A-Fa-f]{6}$/;
    const errColor = "#8B3A3A";

    const handleChange = ({ target }) => {
        const value = target.value.trim();

        // Проверяем длину только после ввода всех 7 символов
        setHexColor(value);
        if (value.length === 7) {
            if (hexRegex.test(value)) {
                setIsValid(true);
                setColorBody(value);
            } else {
                setIsValid(false);
                setColorBody(errColor);
            }
        } else {
            setIsValid(true);
        }
    };

    return (
        
            <form>
                <label htmlFor="colorInput" className="container">
                    <input
                        type="text"
                        className="input-field"
                        value={hexColor}
                        onChange={handleChange}
                        placeholder="Введите код цвета..."
                        id="colorInput"
                    /><br></br>
                    <span id="result" className={`${isValid ? "result" : "error"}`}>
                        {hexColor.length === 7 && !isValid
                            ? "Неверный HEX формат!"
                            : hexColor.length === 7 && isValid
                                ? hexToRgb(hexColor)
                                : "---"}
                    </span>
                </label>
            </form>
        
    );
}