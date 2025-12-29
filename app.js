const tg = window.Telegram.WebApp;
tg.expand();

// قراءة البيانات من الرابط
const params = new URLSearchParams(window.location.search);
let balance = parseFloat(params.get("balance")) || 0;
let lang = params.get("lang") || "ar";

// تحديث الرصيد
document.getElementById('main-bal').innerText = balance.toFixed(2) + " IM";

// بيانات الروبوتات (القصص والصور)
const robotsData = [
    {
        name: "المنقب الحديدي (Iron Miner)",
        story: "أول ابتكار في عالم الطاقة، صلب ولا يكل، يستطيع العمل في أقسى الظروف.",
        price: 10, prod: 1, img: "https://img.freepik.com/free-photo/view-robot-working-industrial-factory_23-2150165500.jpg"
    },
    {
        name: "كسارة الفولاذ (Steel Crusher)",
        story: "وحش ميكانيكي صمم خصيصاً لتحطيم الصخور الطاقية الصلبة وزيادة الإنتاج.",
        price: 50, prod: 5, img: "https://img.freepik.com/premium-photo/futuristic-robot-working-factory_23-2150893325.jpg"
    }
];

// بناء قائمة الروبوتات
const robotsList = document.getElementById('robots-list-hd');
robotsData.forEach(r => {
    robotsList.innerHTML += `
        <div class="robot-box">
            <img src="${r.img}" class="robot-img">
            <div class="robot-info">
                <h4>${r.name}</h4>
                <p>${r.story}</p>
                <div style="color:var(--neon-green)">إنتاج: ${r.prod}/س | سعر: ${r.price}</div>
            </div>
            <button style="background:var(--gold); border:none; padding:8px; border-radius:8px; font-weight:bold;">شراء</button>
        </div>
    `;
});

// نظام التنقل بين الصفحات
function showPage(pageId, el) {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.querySelectorAll('.nav-item').forEach(i => i.classList.remove('active'));
    
    document.getElementById(pageId).classList.add('active');
    el.classList.add('active');
    
    tg.HapticFeedback.impactOccurred('light');
}

// تفاعل الضغط على الدائرة
document.getElementById('tap-target').onclick = function() {
    tg.HapticFeedback.impactOccurred('medium');
    // إضافة أنيميشن بسيط عند الضغط
    this.style.transform = "scale(0.95)";
    setTimeout(() => this.style.transform = "scale(1)", 100);
};

// زر الجمع
document.getElementById('collect-btn').onclick = function() {
    tg.HapticFeedback.notificationOccurred('success');
    tg.showAlert(lang === 'ar' ? "تم إرسال طلب الجمع للروبوتات! ⚡" : "בקשת האיסוף נשלחה!");
};

// دعم العبرية
if(lang === 'he') {
    document.body.style.direction = "ltr";
}
