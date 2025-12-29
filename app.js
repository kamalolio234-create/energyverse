const params = new URLSearchParams(window.location.search);
let balance = parseFloat(params.get("balance")) || 0;
let lang = params.get("lang") || "ar";

// تحديث الواجهة
document.getElementById("v-bal").innerText = balance.toFixed(2);
if (lang === "he") document.body.style.direction = "ltr";

// الروبوتات
const robots = [
    { name: {ar: "المنقب الحديدي", he: "כורה ברזל"}, price: 10, prod: 1, icon: "fa-robot" },
    { name: {ar: "كسارة الفولاذ", he: "מגרסת פלדה"}, price: 50, prod: 5, icon: "fa-microchip" }
];

const rList = document.getElementById("robots-list");
robots.forEach(r => {
    rList.innerHTML += `
        <div class="robot-card">
            <div class="robot-icon"><i class="fas ${r.icon}"></i></div>
            <div class="robot-info">
                <h4>${lang === 'ar' ? r.name.ar : r.name.he}</h4>
                <p>Prod: ${r.prod}/h</p>
            </div>
            <div class="robot-price">${r.price} IM</div>
        </div>`;
});

// تأثير الضغط
document.getElementById("collectBtn").onclick = () => {
    window.Telegram.WebApp.HapticFeedback.impactOccurred('medium');
    alert(lang === 'ar' ? "تم جمع الطاقة!" : "האנרגיה נאספה!");
};
