let data = [];

function renderTable() {
    const tableBody = document.querySelector('#dataTable tbody');
    tableBody.innerHTML = '';

    data.forEach((item, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${item.date}</td>
            <td>${item.km.toFixed(1)} км</td>
            <td>
                <button class="edit" data-index="${index}">✎</button>
                <button class="delete" data-index="${index}">✘</button>
            </td>
        `;
        row.querySelector('.edit').addEventListener('click', () => {
            editData(index);
        });

        row.querySelector('.delete').addEventListener('click', () => {
            deleteData(index);
        });

        tableBody.appendChild(row);
    });
}

function addData(date, km) {
    const existing = data.find(item => item.date === date);

    if (existing) {
        existing.km += km;
    } else {
        data.push({ date, km });
    }

    data.sort((a, b) => new Date(a.date) - new Date(b.date));
    renderTable();
}

function deleteData(index) {
    data.splice(index, 1);
    renderTable();
}

function editData(index) {
    const item = data[index];

    document.getElementById('dateInput').value = item.date;
    document.getElementById('kmInput').value = item.km;

    document.querySelector('#addForm').addEventListener('submit', (e) => {
        e.preventDefault();

        const newDate = document.getElementById('dateInput').value;
        const newKm = parseFloat(document.getElementById('kmInput').value);

        if (!validateInput(newDate, newKm)) {
            return;
        }

        data[index].date = newDate;
        data[index].km = newKm;
        data.sort((a, b) => new Date(a.date) - new Date(b.date));
        renderTable();
        document.getElementById('dateInput').value = '';
        document.getElementById('kmInput').value = '';
    });
}

function validateInput(date, km) {
    if (!date) {
        alert('Пожалуйста, выберите дату');
        return false;
    }

    if (isNaN(km) || km <= 0) {
        alert('Введите корректное количество километров');
        return false;
    }

    return true;
}

document.querySelector('#addForm').addEventListener('submit', (e) => {
    e.preventDefault();

    const date = document.getElementById('dateInput').value;
    const km = parseFloat(document.getElementById('kmInput').value);

    if (!validateInput(date, km)) {
        return;
    }

    addData(date, km);
    document.getElementById('dateInput').value = '';
    document.getElementById('kmInput').value = '';
});

function saveData() {
    try {
        localStorage.setItem('activityData', JSON.stringify(data));
    } catch (error) {
        console.error('Ошибка сохранения данных:', error);
    }
}

window.addEventListener('load' ), () => {
    try {
        const savedData = localStorage.getItem('activityData');
        if (savedData) {
            // Парсим сохраненные данные
            data = JSON.parse(savedData);
        }
        renderTable();
        document.querySelector('#dataTable').addEventListener('DOMNodeInserted', saveData);
        
    } catch (error) {
        console.error('Ошибка при загрузке данных:', error);
        localStorage.removeItem('activityData');
        alert('Произошла ошибка при загрузке данных. Данные были очищены.');
    }
}