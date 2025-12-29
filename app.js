const tg = window.Telegram.WebApp;
tg.expand();
const userId = new URLSearchParams(window.location.search).get('user_id') || '8196877111';

async function fetchUserData() {
    try {
        const res = await fetch(`https://Bubjad.pythonanywhere.com/api/user_data/${userId}`);
        const data = await res.json();
        document.getElementById('balance').innerText = data.balance.toFixed(2);
        document.getElementById('robot-count').innerText = data.robot_count || 0;
        document.getElementById('ref-count').innerText = data.referrals || 0;
        let p = Math.min(Math.floor(data.energy), 100);
        document.getElementById('energy-fill').style.width = p + "%";
        document.getElementById('energy-text').innerText = p + "%";
    } catch (e) { console.error("Error"); }
}

const robots = [
    {id: 1, name: "Iron Miner", price: 10, rate: 1, img: "https://i.postimg.cc/x8d9Pn3h/1766946530066.jpg"},
    {id: 2, name: "Steel Crusher", price: 50, rate: 5, img: "https://i.postimg.cc/rspq9MNb/1766946570861.jpg"},
    {id: 3, name: "Titanium Drill", price: 200, rate: 20, img: "https://i.postimg.cc/W4Jj95rn/1766944839730.png"},
    {id: 4, name: "Power Nexus", price: 1000, rate: 110, img: "https://i.postimg.cc/0QRvh7dw/1766944146423.png"}
];

robots.forEach(r => {
    document.getElementById('robot-list').innerHTML += `<div class="canva-card"><img src="${r.img}" class="robot-img"><h4>${r.name}</h4><button class="cta-button" onclick="buy(${r.id})">تطوير</button></div>`;
});

function buy(id) {
    tg.showConfirm("تأكيد الشراء؟", (ok) => {
        if(ok) fetch(`https://Bubjad.pythonanywhere.com/api/buy`, {
            method: 'POST', headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({user_id: userId, robot_id: id})
        }).then(() => fetchUserData());
    });
}

setInterval(fetchUserData, 5000);
fetchUserData();
