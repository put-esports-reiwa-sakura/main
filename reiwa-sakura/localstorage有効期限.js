/*
©2024 REIWA SAKURA KOUTOU GAKUIN
©2024 令和さくら高等学院
Access to https://www.reiwa-sakura.net/
がくいんちょう: のだ (teacher)
Main Programmer: Aoyama
Check: Akita (teacher),hutamura (teacher),hashimoto
Project team: reiwasakura Filming team
Thank you to everyone who helped us. 
*/
window.onload = function() {
var currentDate = new Date();
var currentMonth = currentDate.getMonth() + 1;
var currentYear = currentDate.getFullYear();
var newYearStartMonth = 4;
var yearForCheck = currentMonth >= newYearStartMonth ? currentYear : currentYear - 1;
var keyToCheck = yearForCheck + "-reiwa-sakura-id";
var storedData = JSON.parse(localStorage.getItem(keyToCheck));
if (storedData) {
for (var year = currentYear - 1; year >= 2000; year--) {
    var keyToDelete = year + "-reiwa-sakura-id";
    localStorage.removeItem(keyToDelete);
}
var aoLocalStatus = 2;
} else {
var hasOldData = false;
for(var year = currentYear - 1; year >= 2000; year--) {
    var oldKey = year + "-reiwa-sakura-id";
    if(localStorage.getItem(oldKey)) {
        hasOldData = true;
        break;
    }
}
var aoLocalStatus = 0;
if (hasOldData) {
var aoLocalStatus = 1;
for (var year = currentYear - 1; year >= 2000; year--) {
    var keyToDelete = year + "-reiwa-sakura-id";
    localStorage.removeItem(keyToDelete);
}
kzn("ログインの有効期限が切れました",1);
} else {kzn("多分、例外が発生していますが、私自身よくわかっていないので、問題ありません。");}
}
localkeyNotMove(aoLocalStatus, keyToCheck, storedData);
};
function kzn(message, stat) {
var grandpaDi = document.getElementById("logExGrDi");
if (!grandpaDi) {
    grandpaDi = document.createElement("div");
    grandpaDi.id = "logExGrDi";
    grandpaDi.style.display = "flex";
    grandpaDi.style.justifyContent = "center";
    document.body.appendChild(grandpaDi);
}
var paDi = document.getElementById("logexDi");
if (!paDi) {
    paDi = document.createElement("div");
    paDi.id = "logexDi";
    paDi.style.display = "flex";
    paDi.style.flexDirection = "column";
    grandpaDi.appendChild(paDi);
}
var logMe = document.createElement("div");
if (stat === 1 || stat == null) {
    logMe.innerText = message;
} else if (stat === 2) {
    console.warn(message);
    const er = message.message;
    if (er.includes('Failed to fetch')) {
      logMe.innerText = "ネットワークが不安定です。インターネットの接続を確認してください。";
    } else if (er.includes('Network message')) {
      logMe.innerText = "ネットワークエラーが発生しました。再度お試しください。";
    } else if (er.includes('Request timeout')) {
      logMe.innerText = "アクセス数増加が原因だと思われますが、サーバーからの応答が遅くなっています。もう一度試してみてください。";
    } else if (er.includes('Connection refused')) {
      logMe.innerText = "申し訳ございません。サーバーへの接続が拒否されてしまいました。お手数ですがしばらくした後再度お試しください。";
    } else if (er.includes('No internet connection')) {
      logMe.innerText = "インターネットに接続されていません。インターネット接続を確認してください。";
    } else if (er.includes('DNS resolution failed')) {
      logMe.innerText = "ホスト名を解決できません。ネットワーク設定を確認してください。";
    } else if (er.includes('CORS policy') || er.includes('Cross-Origin Request Blocked')) {
      logMe.innerText = "まさか...このエラーを表示させたアンタ...ハッカー...";
    } else {
      logMe.innerText = "想定外のエラーが発生しました: " + message + " お手数ですが、再度お試しください。";
    }
}
logMe.classList.add("ao-message");
logMe.setAttribute("kaz", "0");
var closeButton = document.createElement("button");
closeButton.innerText = "×";
closeButton.classList.add("close-button");
closeButton.addEventListener("click", function() {
    logMe.remove();
});
logMe.appendChild(closeButton);
paDi.appendChild(logMe);
if (stat === undefined || stat === null) {
    var intervalId = setInterval(function() {
        var kazValue = parseInt(logMe.getAttribute("kaz"), 10);
        kazValue++;
        logMe.setAttribute("kaz", kazValue);
        if (kazValue >= 10) {
            logMe.remove();
            clearInterval(intervalId);
        }
    }, 1000);
}

if (!document.getElementById("loginExpiredStyle")) {
    var style = document.createElement('style');
    style.id = "loginExpiredStyle";
    style.innerHTML = `
#logexDi {
    display: flex;
    position: fixed;
    top: 4px;
    flex-direction: column;
    background-color: #acacac;
    border-radius: 1em;
}
.ao-message {
    background-color: #acacac;
    color: white;
    opacity: 0.8;
    padding: 13px;
    margin: 0 1em 0 0;
    border-radius: 1em;
    font-weight: 600;
}
.ao-message .close-button {
    background: #f29c97;
    padding: 10px 20px;
    margin: 0 0 0 1em;
}
`;
    document.head.appendChild(style);
}
}
