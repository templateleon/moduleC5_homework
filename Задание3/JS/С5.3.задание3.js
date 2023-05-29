const frm = document.querySelector('form');
const numberInput = document.querySelector('input');
const submitButton = document.getElementById('submit_button');
const result = document.getElementById('query_result');
const validInput = document.querySelector('.valid_input');
// const errorInput = document.querySelector('.error_output');

frm.addEventListener("submit", function(event) {
    event.preventDefault();
    const number = numberInput.value;
    if (number < 1 || number > 10) {
        validInput.textContent = `Число ${number} вне диапазона от 1 до 10`;
        // console.log(`Число ${number} вне диапазона от 1 до 10`);
        return;
    } else {
        validInput.textContent = "";
    }

    const url = `https://picsum.photos/v2/list?limit=${number}`;
    const xhr = new XMLHttpRequest();
    const timeout = XMLHttpRequest.timeout;
    xhr.open("GET", url, true);

    xhr.addEventListener("load", function(event) {
        const data = JSON.parse(xhr.responseText);
        const images = data.map((image) =>
            `<div>
                <img class="img" src="${image.download_url}" alt="Фото с https://picsum.photos">
                <span class="author">Автор: ${image.author}</span>
            </div>`).join(" ");

        result.innerHTML = images;
    });

    xhr.timeout = 10000;

    xhr.ontimeout = () => {
        alert("Превышено время ожидания. Проверьте соединение с Интернетом");
        console.log("Превышено время ожидания.");
    };

    xhr.send();

    xhr.onload = () => {
        if (xhr.status != 200) {
            alert(`Ошибка: ${xhr.status} ${xhr.statusText}`);
            console.log(`Ошибка: ${xhr.status} ${xhr.statusText}`);
        } else {
            console.log('Загрузка прошла успешно');
        }
    };

    xhr.onerror = () => {
        alert(`Ошибка загрузки: ${xhr.status} ${xhr.statusText}`);
        console.log(`Ошибка загрузки: ${xhr.status} ${xhr.statusText}`);
    };

});

