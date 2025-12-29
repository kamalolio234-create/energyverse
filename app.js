const tg = window.Telegram.WebApp;
tg.expand();

const params = new URLSearchParams(window.location.search);
const lang = params.get('lang') || 'ar';

// دعم اللغة العبرية
if(lang === 'he') document.body.classList.add('lang-he');

const robotsData = [
    {
        name: {ar: "المنقب الحديدي (Iron Miner)", he: "כורה ברזל"},
        story: {
            ar: "هذا الروبوت هو العمود الفقري لمستعمرة الطاقة. صُنع من الحديد المقوى ليعمل في أعمق المناجم الرقمية التي لا تصلها الشمس. إنه لا يمل ولا يكل، وكل ضربة فأس له تعني تدفقاً مستمراً للـ IM في محفظتك.",
            he: "הרובוט הזה הוא עמוד השדרה של מושבת האנרגיה. עשוי מברזל מחוזק כדי לעבוד במכרות הדיגיטליים העמוקים ביותר שהשמש לא מגיעה אליהם. הוא לא מתעייף לעולם."
        },
        price: 10, prod: 1, img: "https://i.postimg.cc/x8d9Pn3h/1766946530066.jpg"
    },
    {
        name: {ar: "كسارة الفولاذ (Steel Crusher)", he: "מגרסת פלדה"},
        story: {
            ar: "عندما تصبح الصخور الطاقية صلبة جداً، يأتي دور الكسارة. صُمم هذا الوحش الميكانيكي بمحركات هيدروليكية عملاقة لتحطيم أصعب العوائق وتوليد طاقة مضاعفة بفضل تقنيات الضغط العالي.",
            he: "כאשר סלעי האנרגיה הופכים קשים מדי, מגיע תורה של המגרסה. מפלצת מכנית זו תוכננה עם מנועים הידראוליים ענקיים לרסק את המכשולים הקשים ביותר."
        },
        price: 50, prod: 5, img: "https://i.postimg.cc/rspq9MNb/1766946570861.jpg"
    },
    {
        name: {ar: "مثقاب التيتانيوم (Titanium Drill)", he: "מקדח טיטניום"},
        story: {
            ar: "الدقة والقوة في آلة واحدة. مثقاب التيتانيوم يستخدم تقنية الليزر الموجه لاختراق طبقات البيانات المشفرة بعمق، مما يجعله أسرع في استخراج العملات من سابقيه بفضل خفة وزنه وصلابته الخارقة.",
            he: "דיוק ועוצמה במכונה אחת. מקדח הטיטניום משתמש בטכנולוגיית לייזר מונחה כדי לחדור לשכבות נתונים מוצפנות לעומק."
        },
        price: 200, prod: 25, img: "https://i.postimg.cc/W4Jj95rn/1766944839730.png"
    },
    {
        name: {ar: "نواة القوة (Power Nexus)", he: "נאקוס כוח"},
        story: {
            ar: "هذا ليس مجرد روبوت، بل هو مفاعل متنقل. يقوم Power Nexus بامتصاص الطاقة المحيطة وتحويلها إلى نبضات كهربائية نقية. اقتناؤه يعني أنك دخلت مرحلة كبار المستثمرين في عالم EnergyVerse.",
            he: "זה לא סתם רובוט, זה כור נייד. Power Nexus סופג את האנרגיה שמסביב וממיר אותה לפעימות חשמליות טהורות."
        },
        price: 1000, prod: 150, img: "https://i.postimg.cc/0QRvh7dw/1766944146423.png"
    },
    {
        name: {ar: "المحرك الكمي (Quantum Engine)", he: "מנוע קוונטי"},
        story: {
            ar: "قوة المجرة بين يديك. المحرك الكمي يتلاعب بالزمكان ليولد طاقة من العدم. إنه الروبوت الأسطوري الذي يحلم به الجميع، فهو لا يعدن العملات فحسب، بل يسيطر على تدفق الطاقة في الكون بالكامل.",
            he: "כוח הגלקסיה בידיים שלך. המנוע הקוונטי מבצע מניפולציות במרחב-זמן כדי לייצר אנרגיה משום מקום. זהו הרובוט האגדי שכולם חולמים עליו."
        },
        price: 5000, prod: 800, img: "https://i.postimg.cc/SR4g0xPN/1766946983619.png"
    }
];

// هذه الدالة تضمن أن الروبوتات تظهر فور تحميل الصفحة
window.onload = function() {
    const list = document.getElementById('robots-list');
    if (list) {
        list.innerHTML = ""; // تنظيف القائمة قبل العرض
        robotsData.forEach(r => {
            list.innerHTML += `
                <div class="robot-card">
                    <img src="${r.img}" class="robot-img" onerror="this.src='https://via.placeholder.com/300x200?text=Robot+Image'">
                    <div class="robot-title">${lang === 'ar' ? r.name.ar : r.name.he}</div>
                    <div class="robot-story">${lang === 'ar' ? r.story.ar : r.story.he}</div>
                    <div class="robot-stats">
                        <span>Prod: ${r.prod}/h</span>
                        <span style="color:var(--gold)">Price: ${r.price} IM</span>
                    </div>
                    <button onclick="window.Telegram.WebApp.HapticFeedback.impactOccurred('heavy')" style="width:100%; background:var(--gold); border:none; padding:15px; border-radius:10px; font-weight:bold; margin-top:15px; cursor:pointer;">BUY / קנה</button>
                </div>
            `;
        });
    }
};

function showPage(id, el) {
    document.querySelectorAll('.page').forEach(p => p.style.display = 'none');
    document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
    document.getElementById(id).style.display = 'block';
    el.classList.add('active');
    tg.HapticFeedback.impactOccurred('medium');
}
