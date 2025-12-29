// قراءة بيانات المستخدم من رابط البوت
const params = new URLSearchParams(window.location.search);
let balance = parseFloat(params.get("balance")) || 0;
let lang = params.get("lang") || "ar";

// تحديث عرض الرصيد
const balanceDisplay = document.getElementById("balanceDisplay");
balanceDisplay.innerText = `رصيدك: ${balance} IM`;

// بطارية الطاقة
const batteryFill = document.getElementById("batteryFill");
let batteryPercent = Math.min((balance / 100) * 100, 100);
batteryFill.style.width = batteryPercent + "%";

// زر جمع الطاقة
const collectBtn = document.getElementById("collectBtn");
collectBtn.addEventListener("click", () => {
  if (balance > 0) {
    alert(`✅ تم جمع الطاقة: ${balance} IM`);
    balance = 0;
    balanceDisplay.innerText = `رصيدك: ${balance} IM`;
    batteryFill.style.width = "0%";
  } else {
    alert("⚠️ لا يوجد طاقة لجمعها حالياً!");
  }
});

// شراء الروبوتات
const buyButtons = document.querySelectorAll(".buyBtn");
buyButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    const price = parseFloat(btn.getAttribute("data-price"));
    if (balance >= price) {
      balance -= price;
      balanceDisplay.innerText = `رصيدك: ${balance} IM`;
      alert(`🎉 تم شراء الروبوت! رصيدك الآن: ${balance} IM`);
      batteryPercent = Math.min((balance / 100) * 100, 100);
      batteryFill.style.width = batteryPercent + "%";
    } else {
      alert("❌ رصيدك غير كافٍ!");
    }
  });
});
