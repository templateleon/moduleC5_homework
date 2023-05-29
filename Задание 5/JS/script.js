const result = document.getElementById("query_result");
const validInput = document.querySelector(".valid_input");
const pageInput = document.getElementById("input_1");
const limitInput = document.getElementById("input_2");
const form = document.getElementById("form");

function checkNumRange(num) {
    if (num >= 1 && num <= 10 && !isNaN(num)) {
        return num;c
    }
}

// Сохранение
function saveDataToLocalStorage(data) {
    localStorage.setItem("data", JSON.stringify(data));
    return data;
}
// Проверка
function checkEnteredNumber() {
    const page = checkNumRange(pageInput.value);
    const limit = checkNumRange(limitInput.value);
    if (!page && !limit) {
        validInput.textContent = "Номер страницы и лимит вне диапазона от 1 до 10";
        return;
    }
    if (!page) {
        validInput.textContent = "Номер страницы вне диапазона от 1 до 10";
        return;
    }
    if (!limit) {
        validInput.textContent = "Лимит вне диапазона от 1 до 10";
        return;
    } else {
        validInput.textContent = "";
        loadNewImages();
    }
}

function getDataFromLocalStorage() {
    const dataStr = localStorage.getItem("data");
    if (dataStr) {
        data = JSON.parse(dataStr);
        return data;
    } else {
        return null;
    }
}

// получение картинок

function loadOldImages() {
    const oldData = getDataFromLocalStorage();
    if (oldData) {
        result.innerHTML = oldData;
        return;
    } else {
        validInput.textContent = "";
        loadNewImages();
    }
}


async function loadNewImages() {
    const page = checkNumRange(pageInput.value);
    const limit = checkNumRange(limitInput.value);
    const url = `https://picsum.photos/v2/list?page=${page}&limit=${limit}`;

    try {
        const response = await fetch(url);
        // console.log(response);
        if (!response.ok) {
            throw new Error("Ошибка загрузки");
        }
        const data = await response.json();
        // console.log(data);
        const img = data.map((item) => `<img class="img" src="${item.download_url}" 
              alt="Фото с ${page} страницы">`);
        result.innerHTML = img;
        saveDataToLocalStorage(img);
    } catch (error) {
        console.error(error);
        result.textContent = "Ошибка загрузки";
    }
}

form.addEventListener("submit", (event) => {
    event.preventDefault();
    localStorage.clear();
    checkEnteredNumber();
});

window.addEventListener("load", () => {
    loadOldImages();
});