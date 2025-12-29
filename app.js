// ENERGYVERSE APP ENGINE - JavaScript (Official Final Version)
const tg = window.Telegram.WebApp;

// 1. إعداد واجهة تيليجرام
tg.expand(); 
tg.ready();

// استخراج معرف المستخدم من الرابط
const urlParams = new URLSearchParams(window.location.search);
const userId = urlParams.get('user_id');

// 2. تحديث البيانات (رابط السيرفر الصحيح: Bubjad)
async function fetchUserData() {
    try {
        const response = await fetch(`https://Bubjad.pythonanywhere.com/api/user_data/${userId}`);
        const data = await response.json();

        // تحديث الأرقام في الواجهة
        if(document.getElementById('balance')) document.getElementById('balance').innerText = data.balance.toFixed(2);
        if(document.getElementById('total-energy')) document.getElementById('total-energy').innerText = Math.floor(data.energy);
        
    } catch (error) {
        console.error("خطأ في الاتصال بالسيرفر:", error);
    }
}

// 3. وظيفة شراء الروبوتات
function buyRobot(robotId) {
    tg.HapticFeedback.impactOccurred('medium');

    tg.showConfirm(`هل تريد تأكيد شراء هذا الروبوت؟`, (ok) => {
        if (ok) {
            // إرسال الطلب إلى السيرفر الصحيح
            fetch(`https://Bubjad.pythonanywhere.com/api/buy`, {
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
                    fetchUserData(); 
                } else {
                    tg.showAlert("❌ " + result.message);
                }
            })
            .catch(err => tg.showAlert("❌ فشل الاتصال بالسيرفر"));
        }
    });
}

// 4. وظيفة جمع الطاقة
