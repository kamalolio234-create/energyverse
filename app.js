const tg = window.Telegram.WebApp;
const userId = new URLSearchParams(window.location.search).get('user_id');

async function fetchUserData() {
    try {
        // الاتصال بسيرفر Bubjad لجلب البيانات
        const res = await fetch(`https://Bubjad.pythonanywhere.com/api/user_data/${userId}`);
        const data = await res.json();
        
        // تحديث العدادات الأربعة في الواجهة
        document.getElementById('balance').innerText = data.balance.toFixed(2);
        document.getElementById('robot-count').innerText = data.robot_count;
        document.getElementById('ref-count').innerText = data.referrals;
        
        // تحديث نسبة البطارية
        document.getElementById('energy-fill').style.width = data.energy + "%";
        document.getElementById('energy-text').innerText = Math.floor(data.energy) + "%";
    } catch (e) { console.error("Error fetching data"); }
}

setInterval(fetchUserData, 10000); // تحديث كل 10 ثوانٍ
fetchUserData();
