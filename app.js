// ENERGYVERSE APP ENGINE - JavaScript
const tg = window.Telegram.WebApp;

// 1. إعداد واجهة تيليجرام
tg.expand(); // توسيع الواجهة لتملأ الشاشة
tg.ready();

// استخراج معرف المستخدم من الرابط المرسل من البوت
const urlParams = new URLSearchParams(window.location.search);
const userId = urlParams.get('user_id');

// 2. تحديث البيانات عند فتح التطبيق
async function fetchUserData() {
    try {
        // استبدل الرابط أدناه برابط سيرفر Flask الخاص بك على PythonAnywhere
        const response = await fetch(`https://your-python-app.pythonanywhere.com/api/user_data/${userId}`);
        const data = await response.json();

        // تحديث الرصيد والطاقة في الواجهة
        document.getElementById('balance').innerText = data.balance.toFixed(2);
        document.getElementById('total-energy').innerText = Math.floor(data.energy);
        
        // تحديث أشرطة التقدم (اختياري)
        updateProgressBars(data.energy);
        
    } catch (error) {
        console.error("خطأ في جلب البيانات:", error);
    }
}

// 3. وظيفة شراء الروبوتات
function buyRobot(robotId) {
    // إهتزاز الهاتف عند الضغط (Haptic Feedback)
    tg.HapticFeedback.impactOccurred('medium');

    tg.showConfirm(`هل تريد تأكيد شراء هذا الروبوت؟`, (ok) => {
        if (ok) {
            // إرسال طلب الشراء للسيرفر
            fetch(`https://your-python-app.pythonanywhere.com/api/buy`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    user_id: userId,
                    robot_id: robotId
                })
            })
            .then(res => res.json())
            .then(result => {
                if (result.success) {
                    tg.showAlert("✅ تمت عملية الشراء بنجاح!");
                    fetchUserData(); // تحديث الرصيد فوراً
                } else {
                    tg.showAlert("❌ " + result.message);
                }
            });
        }
    });
}

// 4. وظيفة جمع الطاقة (Mining)
function collectEnergy() {
    tg.HapticFeedback.notificationOccurred('success');
    // إرسال طلب الجمع للسيرفر
}

// تحديث البيانات تلقائياً كل 10 ثوانٍ
setInterval(fetchUserData, 10000);
fetchUserData(); // تشغيل عند البداية
