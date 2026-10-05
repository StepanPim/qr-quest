let foundQRs = JSON.parse(localStorage.getItem("foundQRs")) || [];

function findQR(number) {
    const button = document.getElementById("qr" + number);

    // Если QR уже найден — ничего не делаем
    if (foundQRs.includes(number)) {
        return;
    }

    // Добавляем QR в список найденных
    foundQRs.push(number);

    // Сохраняем список в браузере
    localStorage.setItem("foundQRs", JSON.stringify(foundQRs));

    // Показываем галочку
    button.textContent = "✅ QR-код " + number;

    updateProgress();
}

function updateProgress() {
    document.getElementById("progress").textContent =
        "Прогресс: " + foundQRs.length + "/5";

    if (foundQRs.length === 5) {
        document.getElementById("complete").style.display = "block";
    }
}


// Показываем уже найденные QR после открытия страницы
function showFoundQRs() {
    foundQRs.forEach(function(number) {
        const button = document.getElementById("qr" + number);

        if (button) {
            button.textContent = "✅ QR-код " + number;
        }
    });

    updateProgress();
}


// Проверяем QR в адресе страницы
const urlParams = new URLSearchParams(window.location.search);
const qrNumber = Number(urlParams.get("qr"));

if (qrNumber >= 1 && qrNumber <= 5) {
    findQR(qrNumber);
}


// Кнопки для тестирования
document.getElementById("qr1").onclick = function() {
    findQR(1);
};

document.getElementById("qr2").onclick = function() {
    findQR(2);
};

document.getElementById("qr3").onclick = function() {
    findQR(3);
};

document.getElementById("qr4").onclick = function() {
    findQR(4);
};

document.getElementById("qr5").onclick = function() {
    findQR(5);
};


// Восстанавливаем прогресс
showFoundQRs();