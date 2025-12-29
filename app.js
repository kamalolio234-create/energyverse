// استلام بيانات المستخدم من رابط البوت
const urlParams = new URLSearchParams(window.location.search);
const userId = urlParams.get('user_id');

// رابط السيرفر الخاص بك على PythonAnywhere (تأكد من كتابة الاسم Bubjad بدقة)
const API_BASE = "https://Bubjad.pythonanywhere.com/api";

// دالة جلب وتحديث البيانات (الرصيد، الطاقة، الروبوتات، الإحالات)
async function updateDashboard() {
    // إذا لم يتوفر userId، لن يحاول الاتصال لتجنب أخطاء 404 غير الضرورية
    if (!userId || userId === "null") {
        console.warn("User ID is missing. Please open the app from Telegram.");
        return;
    }

    try {
        // الاتصال بالمسار الصحيح الذي قمنا بتهيئته في main.py
        const response = await fetch(`${API_BASE}/user_data/${userId}`);
        
        if (!response.ok) {
            throw new Error(`Server responded with ${response.status}`);
        }

        const data = await response.json();

        if (data.error) {
            console.error("User not found in database");
            return;
        }

        // تحديث الأرقام في العدادات الأربعة المحددة في index.html
        // نستخدم || 0 لضمان عدم ظهور NaN إذا كانت القيمة مفقودة
        document.getElementById('balance').innerText = parseFloat(data.balance || 0).toFixed(2);
        document.getElementById('robot-count').innerText = data.robot_count || 0;
        document.getElementById('ref-count').innerText = data.referrals || 0;

        [span_1](start_span)// تحديث شريط البطارية ونسبة الطاقة[span_1](end_span)
        const energyPercent = Math.min(100, Math.max(0, data.energy || 0));
        const energyElement = document.getElementById('energy-text');
        const fillElement = document.getElementById('energy-fill');
        
        if (energyElement) energyElement.innerText = Math.floor(energyPercent) + "%";
        if (fillElement) fillElement.style.width = energyPercent + "%";

    } catch (error) {
        console.error("خطأ في الاتصال بالسيرفر:", error.message);
    }
}

[span_2](start_span)// دالة شراء روبوت (تطوير الآن) لجدول robots[span_2](end_span)
async function buyRobot(robotId) {
    if (!userId) {
        alert("خطأ: معرف المستخدم مفقود!");
        return;
    }

    try {
        const response = await fetch(`${API_BASE}/buy`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ user_id: parseInt(userId), robot_id: robotId })
        });
        
        const result = await response.json();
        
        if (result.success) {
            alert("✅ تم التطوير بنجاح!");
            updateDashboard(); // تحديث الأرقام فوراً لرؤية الخصم والإنتاج الجديد
        } else {
            alert("❌ " + (result.message || "فشلت العملية"));
        }
    } catch (error) {
        alert("حدث خطأ أثناء عملية الشراء، تأكد من اتصال السيرفر.");
    }
}

// تشغيل التحديث التلقائي كل 5 ثوانٍ
setInterval(updateDashboard, 5000);
updateDashboard(); // تشغيل أولي
