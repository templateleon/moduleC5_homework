const submitButton = document.getElementById("submit_button");
const result = document.getElementById("query_result");
const validInput = document.querySelector(".valid_input");

function checkNumRange(num) {
    if (num >= 100 && num <= 300 && !isNaN(num))
        return num;
}

submitButton.addEventListener("click", function(event) {
    event.preventDefault();

    let inputWidth = document.getElementById("input_1").value;
    let inputHeight = document.getElementById("input_2").value;
    // console.log(inputWidth, inputHeight);
    if (!checkNumRange(inputWidth) || !checkNumRange(inputHeight)) {
        validInput.textContent = "Ширина или высота вне диапазона";
        console.log("Ширина или высота вне диапазона");
        return;
    } else {
        validInput.textContent = "";
    }

    const url = `https://picsum.photos/${inputWidth}/${inputHeight}`;
    fetch(url)
        .then((response) => {
            let oldImage = result.querySelector('img');
            if (oldImage) {
                result.removeChild(oldImage);
            }
            let image = document.createElement('img');
            image.src = `${response.url}`;
            result.appendChild(image);
        })
        .catch((error) => {
            result.textContent = "Ошибка загрузки";
        });
});


