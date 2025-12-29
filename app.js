// تحديث البيانات مع تأثير العداد المتغير
async function fetchUserData() {
    try {
        const response = await fetch(`https://Bubjad.pythonanywhere.com/api/user_data/${userId}`);
        const data = await response.json();

        // تأثير عداد الأرقام (تحديث الرصيد بسلاسة)
        animateValue("balance", parseFloat(document.getElementById('balance').innerText), data.balance, 1000);
        
        // تحديث عدادات الروبوتات والإحالات الجديدة
        document.getElementById('robot-count').innerText = data.robot_count || 0;
        document.getElementById('ref-count').innerText = data.referrals || 0;

        // نظام شحن الطاقة بنسبة %
        const energyPercent = Math.min(Math.floor(data.energy), 100);
        const energyBar = document.getElementById('energy-fill');
        energyBar.style.width = energyPercent + "%";
        document.getElementById('energy-text').innerText = energyPercent + "%";

    } catch (error) { console.error("Connection Error"); }
}

function animateValue(id, start, end, duration) {
    let obj = document.getElementById(id);
    let range = end - start;
    let minTimer = 50;
    let step = range / (duration / minTimer);
    let startTime = new Date().getTime();
    let endTime = startTime + duration;
    let timer;

    function run() {
        let now = new Date().getTime();
        let remaining = Math.max((endTime - now) / duration, 0);
        let value = end - (remaining * range);
        obj.innerText = value.toFixed(2);
        if (value == end) clearInterval(timer);
    }
    timer = setInterval(run, minTimer);
}
