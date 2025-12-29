// استلام بيانات المستخدم من رابط البوت
const urlParams = new URLSearchParams(window.location.search);
const userId = urlParams.get('user_id');

// رابط السيرفر الخاص بك على PythonAnywhere
const API_BASE = "https://Bubjad.pythonanywhere.com/api";

// دالة جلب وتحديث البيانات (الرصيد، الطاقة، الروبوتات، الإحالات)
async function updateDashboard() {
    if (!userId) return;

    try {
        const response = await fetch(`${API_BASE}/user_data/${userId}`);
        const data = await response.json();

        if (data.error) {
            console.error("User not found");
            return;
        }

        // تحديث الأرقام في العدادات الأربعة
        document.getElementById('balance').innerText = parseFloat(data.balance).toFixed(2);
        document.getElementById('robot-count').innerText = data.robot_count;
        document.getElementById('ref-count').innerText = data.referrals;

        // تحديث شريط البطارية ونسبة الطاقة
        const energyPercent = Math.min(100, Math.max(0, data.energy));
        document.getElementById('energy-text').innerText = Math.floor(energyPercent) + "%";
        document.getElementById('energy-fill').style.width = energyPercent + "%";

    } catch (error) {
        console.error("خطأ في الاتصال بالسيرفر:", error);
    }
}

// دالة شراء روبوت (تطوير الآن)
async function buyRobot(robotId) {
    try {
        const response = await fetch(`${API_BASE}/buy`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ user_id: userId, robot_id: robotId })
        });
        
        const result = await response.json();
        
        if (result.success) {
            alert("✅ تم التطوير بنجاح!");
            updateDashboard(); // تحديث الأرقام فوراً بعد الشراء
        } else {
            alert("❌ " + result.message); // رصيد غير كافٍ مثلاً
        }
    } catch (error) {
        alert("حدث خطأ أثناء عملية الشراء");
    }
}

// تشغيل التحديث التلقائي كل 5 ثوانٍ لضمان بقاء الأرقام حية
setInterval(updateDashboard, 5000);
updateDashboard(); // تشغيل أولي عند الفتح
