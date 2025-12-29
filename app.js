// قراءة بيانات المستخدم من رابط البوت
const params = new URLSearchParams(window.location.search);
let balance = params.get("balance") || 0;

document.getElementById("balanceDisplay").innerText = "رصيدك: " + balance + " IM";

document.getElementById("collectBtn").addEventListener("click", () => {
    alert("تم جمع الطاقة: " + balance + " IM");
});
