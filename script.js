let foundQRs = JSON.parse(localStorage.getItem("foundQRs")) || [];

const params = new URLSearchParams(window.location.search);

// 🔄 Сброс прогресса
if (params.get("reset") === "1") {
    localStorage.removeItem("foundQRs");
    window.location.href = window.location.origin + window.location.pathname;
}

// 🔎 Находим QR
function findQR(number) {
    const qr = document.getElementById("qr" + number);

    if (foundQRs.includes(number)) {
        return;
    }

    foundQRs.push(number);

    localStorage.setItem("foundQRs", JSON.stringify(foundQRs));

    if (qr) {
        qr.textContent = "✅ QR-код " + number;
    }

    updateProgress();
}

// 📊 Обновляем прогресс
function updateProgress() {
    document.getElementById("progress").textContent =
        "Прогресс: " + foundQRs.length + "/5";

    if (foundQRs.length === 5) {
        document.getElementById("complete").style.display = "block";
    } else {
        document.getElementById("complete").style.display = "none";
    }
}

// 🔓 Показываем уже найденные QR
function showFoundQRs() {
    foundQRs.forEach(function(number) {
        const qr = document.getElementById("qr" + number);

        if (qr) {
            qr.textContent = "✅ QR-код " + number;
        }
    });

    updateProgress();
}

// 📱 Проверяем QR в ссылке
const qrNumber = Number(params.get("qr"));

if (qrNumber >= 1 && qrNumber <= 5) {
    findQR(qrNumber);
}

// 🔓 Восстанавливаем прогресс
showFoundQRs();