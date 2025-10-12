document.addEventListener('DOMContentLoaded', () => {
    const hexInput = document.getElementById('hex');
    const rgbOutput = document.getElementById('rgb');
    const error = document.getElementById('error');
    const container = document.querySelector('.container');

    hexInput.addEventListener('input', () => {
        error.classList.add('hidden');
        const hex = hexInput.value.trim();
        
        // Проверяем длину ввода
        if (hex.length !== 7) {
            return;  // Ждем полного ввода
        }

        // Проверяем валидность формата
        if (!/^#([A-Fa-f0-9]{6})$/.test(hex)) {
            error.classList.remove('hidden');
            rgbOutput.textContent = '';
            return;
        }

        // Преобразование HEX в RGB
        const r = parseInt(hex.slice(1, 3), 16);
        const g = parseInt(hex.slice(3, 5), 16);
        const b = parseInt(hex.slice(5, 7), 16);
        
        // Меняем цвет фона контейнера
        container.style.backgroundColor = hex;
        
        rgbOutput.textContent = `rgb(${r}, ${g}, ${b})`;
    });
});
