const hexInput = document.getElementById('hex');
const rgbOutput = document.getElementById('rgb');
const errorMessage = document.getElementById('error');

hexInput.addEventListener('input', function() {
    // Проверяем, введен ли полный HEX-код
    if (hexInput.value.length !== 7 || !/^#([A-Fa-f0-9]{6})$/.test(hexInput.value)) {
        errorMessage.classList.remove('hidden');
        return;
    }

    errorMessage.classList.add('hidden');
    const hex = hexInput.value.slice(1); // Убираем символ #
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);

    rgbOutput.textContent = `RGB: ${r}, ${g}, ${b}`;
    document.body.style.backgroundColor = hexInput.value;
});
