/* ============================================================
   EchoHands — Mobile Prototype Logic
   ============================================================ */

// ---------- Data ----------
const children = [
  { id:1,  name:"Aarav Sharma",  age:4, parent:"Priya Sharma",  lang:"Hindi",    attendance:92, risk:"low",    state:"Maharashtra",   district:"Pune" },
  { id:2,  name:"Diya Patel",    age:3, parent:"Ramesh Patel",  lang:"Gujarati", attendance:45, risk:"high",   state:"Gujarat",       district:"Ahmedabad" },
  { id:3,  name:"Arjun Reddy",   age:5, parent:"Lakshmi Reddy", lang:"Telugu",   attendance:78, risk:"medium", state:"Karnataka",     district:"Bangalore" },
  { id:4,  name:"Meera Singh",   age:3, parent:"Rajveer Singh", lang:"Hindi",    attendance:88, risk:"low",    state:"Rajasthan",     district:"Jaipur" },
  { id:5,  name:"Kabir Das",     age:6, parent:"Anita Das",     lang:"Bengali",  attendance:12, risk:"high",   state:"West Bengal",   district:"Kolkata" },
  { id:6,  name:"Zara Khan",     age:4, parent:"Fatima Khan",   lang:"Hindi",    attendance:60, risk:"medium", state:"Uttar Pradesh", district:"Lucknow" },
  { id:7,  name:"Vihaan Joshi",  age:5, parent:"Sneha Joshi",   lang:"Marathi",  attendance:95, risk:"low",    state:"Maharashtra",   district:"Mumbai" },
  { id:8,  name:"Ananya Nair",   age:4, parent:"Deepa Nair",    lang:"Tamil",    attendance:30, risk:"high",   state:"Tamil Nadu",    district:"Chennai" },
  { id:9,  name:"Rohan Gupta",   age:3, parent:"Suman Gupta",   lang:"Hindi",    attendance:70, risk:"medium", state:"Bihar",         district:"Patna" },
  { id:10, name:"Ishita Verma",  age:5, parent:"Kavita Verma",  lang:"Hindi",    attendance:85, risk:"low",    state:"Uttar Pradesh", district:"Varanasi" },
];

const alerts = [
  { childId:2,  type:"high",   reason:"High Risk Child — Severely malnourished, missed vaccinations",    time:"2 hours ago" },
  { childId:5,  type:"high",   reason:"Missing 30 Days — No attendance recorded for over a month",       time:"5 hours ago" },
  { childId:8,  type:"high",   reason:"Migration Detected — Family may have relocated without transfer", time:"1 day ago" },
  { childId:6,  type:"medium", reason:"Attendance dropping — Below 65% this month",                      time:"1 day ago" },
  { childId:3,  type:"medium", reason:"Nutrition concern — Weight gain stalled 3 months",                time:"2 days ago" },
  { childId:9,  type:"medium", reason:"Irregular attendance — Missed 8 days in 2 weeks",                 time:"3 days ago" },
  { childId:1,  type:"low",    reason:"Routine check-up due — Last health check 4 months ago",           time:"3 days ago" },
  { childId:4,  type:"low",    reason:"Vaccination reminder — DPT booster due next week",                time:"4 days ago" },
  { childId:10, type:"low",    reason:"Growth monitoring — Schedule next measurement",                    time:"5 days ago" },
];

const districtMap = {
  "Maharashtra":   ["Mumbai","Pune","Nagpur","Thane","Nashik"],
  "Uttar Pradesh": ["Lucknow","Varanasi","Agra","Kanpur","Noida"],
  "Tamil Nadu":    ["Chennai","Coimbatore","Madurai","Salem","Trichy"],
  "Karnataka":     ["Bangalore","Mysore","Hubli","Mangalore","Belgaum"],
  "Gujarat":       ["Ahmedabad","Surat","Vadodara","Rajkot","Gandhinagar"],
  "Rajasthan":     ["Jaipur","Jodhpur","Udaipur","Ajmer","Kota"],
  "West Bengal":   ["Kolkata","Howrah","Siliguri","Durgapur","Asansol"],
  "Bihar":         ["Patna","Gaya","Muzaffarpur","Bhagalpur","Darbhanga"],
};

const avatarPalette = [
  ["#6C63FF","#8B5CF6"], ["#00D4AA","#059669"], ["#F59E0B","#D97706"],
  ["#3B82F6","#2563EB"], ["#EF4444","#DC2626"], ["#EC4899","#DB2777"],
];

// ---------- Navigation ----------
function navigateTo(id) {
  document.querySelectorAll(".screen").forEach(s => s.classList.remove("active"));
  const el = document.getElementById(id);
  if (el) {
    el.classList.add("active");
    // Reset scroll
    const scroll = el.querySelector(".screen-scroll");
    if (scroll) scroll.scrollTop = 0;
  }
  if (id === "screen-profile")    renderProfiles();
  if (id === "screen-alerts")     renderAlerts();
  if (id === "screen-supervisor") setTimeout(renderCharts, 80);
  if (id === "screen-migration")  populateMigration();
}

// ---------- Greeting ----------
(function setGreeting() {
  const h = new Date().getHours();
  const g = h < 12 ? "Good Morning" : h < 17 ? "Good Afternoon" : "Good Evening";
  document.getElementById("greetingText").textContent = g;
})();

// ---------- Toast ----------
function showToast(msg) {
  const t = document.getElementById("toast");
  t.textContent = msg;
  t.classList.add("show");
  setTimeout(() => t.classList.remove("show"), 2400);
}

// ============================================================
// SCREEN 2 — Voice Registration
// ============================================================
let isRecording = false;

function toggleRecording() {
  const btn = document.getElementById("micBtn");
  const vis = document.getElementById("voiceVisual");
  const lbl = document.getElementById("voiceLabel");

  if (!isRecording) {
    isRecording = true;
    btn.classList.add("recording-active");
    vis.classList.add("recording");
    lbl.textContent = "Listening…";
    setTimeout(() => {
      stopRecording();
      simulateTranscript();
    }, 2500);
  } else {
    stopRecording();
  }
}

function stopRecording() {
  isRecording = false;
  document.getElementById("micBtn").classList.remove("recording-active");
  document.getElementById("voiceVisual").classList.remove("recording");
  document.getElementById("voiceLabel").textContent = "Tap and Speak";
}

function simulateTranscript() {
  const names  = ["Priya","Rahul","Sneha","Vikram","Kavya","Aditya","Mansi","Aryan"];
  const parents = ["Sunita Devi","Mohan Kumar","Rekha Singh","Suresh Patel","Anita Kumari"];
  const n = names[Math.floor(Math.random()*names.length)];
  const p = parents[Math.floor(Math.random()*parents.length)];
  const a = Math.floor(Math.random()*4)+2;

  document.getElementById("voiceTranscript").innerHTML = `
    <p style="color:var(--text);font-size:.82rem;line-height:1.5">
      <span style="color:var(--primary);font-weight:600">🎙 Detected:</span><br>
      "My child's name is <strong>${n}</strong>, age <strong>${a}</strong>. 
      My name is <strong>${p}</strong>."
    </p>`;

  document.getElementById("vfName").value = n;
  document.getElementById("vfAge").value = a;
  document.getElementById("vfParent").value = p;
  const fields = document.getElementById("voiceFields");
  fields.style.display = "block";
  setTimeout(() => fields.scrollIntoView({ behavior:"smooth", block:"start" }), 100);
}

function saveRegistration() {
  const name = document.getElementById("vfName").value;
  const age  = document.getElementById("vfAge").value;
  const par  = document.getElementById("vfParent").value;
  const lang = document.getElementById("vfLang").value;
  if (!name || !age || !par) { showToast("⚠️ Please fill all fields"); return; }

  children.push({ id:children.length+1, name, age:+age, parent:par, lang, attendance:0, risk:"low", state:"—", district:"—" });
  document.getElementById("statTotal").textContent = children.length;
  showToast(`✅ ${name} registered!`);

  document.getElementById("vfName").value = "";
  document.getElementById("vfAge").value = "";
  document.getElementById("vfParent").value = "";
  document.getElementById("voiceFields").style.display = "none";
  document.getElementById("voiceTranscript").innerHTML = `
    <div class="transcript-empty">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
      <span>Transcript appears here…</span>
    </div>`;
}

// ============================================================
// SCREEN 3 — Child Profiles
// ============================================================
function renderProfiles(q = "") {
  const list = document.getElementById("profileList");
  const f = children.filter(c => c.name.toLowerCase().includes(q.toLowerCase()) || c.id.toString().includes(q));

  list.innerHTML = f.map((c,i) => {
    const cl = avatarPalette[i % avatarPalette.length];
    return `
      <div class="child-card" onclick="showDetail(${c.id})">
        <div class="child-avatar" style="background:linear-gradient(135deg,${cl[0]},${cl[1]})">${c.name[0]}</div>
        <div class="child-info">
          <div class="child-name">${c.name}</div>
          <div class="child-meta">Age ${c.age} · ${c.lang} · ${c.attendance}%</div>
        </div>
        <span class="child-badge badge--${c.risk}">${c.risk}</span>
      </div>`;
  }).join("");
}

function filterProfiles() { renderProfiles(document.getElementById("profileSearch").value); }

function showDetail(id) {
  const c = children.find(x => x.id === id);
  if (!c) return;
  document.getElementById("detailAvatar").textContent = c.name[0];
  document.getElementById("detailName").textContent = c.name;
  document.getElementById("detailAge").textContent = c.age + " yrs";
  document.getElementById("detailParent").textContent = c.parent;
  document.getElementById("detailLang").textContent = c.lang;
  document.getElementById("detailAttendance").textContent = c.attendance + "%";
  document.getElementById("detailAttBar").style.width = c.attendance + "%";

  const b = document.getElementById("detailRisk");
  b.textContent = c.risk[0].toUpperCase() + c.risk.slice(1) + " Risk";
  b.className = "risk-badge " + c.risk;

  document.getElementById("profileDetail").style.display = "grid";
}

function closeDetail() { document.getElementById("profileDetail").style.display = "none"; }

// ============================================================
// SCREEN 4 — Migration
// ============================================================
let migPopulated = false;
function populateMigration() {
  if (migPopulated) return;
  migPopulated = true;
  const sel = document.getElementById("migChild");
  children.forEach(c => {
    const o = document.createElement("option");
    o.value = c.id;
    o.textContent = `${c.name} (ID: ${c.id})`;
    sel.appendChild(o);
  });
  sel.addEventListener("change", function() {
    const c = children.find(x => x.id === +this.value);
    document.getElementById("migCurrentLoc").textContent = c ? `${c.district}, ${c.state}` : "—";
  });
}

function updateDistricts() {
  const s = document.getElementById("migState").value;
  const d = document.getElementById("migDistrict");
  d.innerHTML = '<option value="">Select district…</option>';
  if (districtMap[s]) districtMap[s].forEach(n => {
    const o = document.createElement("option");
    o.value = n; o.textContent = n;
    d.appendChild(o);
  });
  updateNewLoc();
}

function updateNewLoc() {
  const s = document.getElementById("migState").value;
  const d = document.getElementById("migDistrict").value;
  document.getElementById("migNewLoc").textContent = (s && d) ? `${d}, ${s}` : "—";
}

// Listen for district change
document.addEventListener("DOMContentLoaded", () => {
  const dd = document.getElementById("migDistrict");
  if (dd) dd.addEventListener("change", updateNewLoc);
});

function transferProfile() {
  const cid = +document.getElementById("migChild").value;
  const ns  = document.getElementById("migState").value;
  const nd  = document.getElementById("migDistrict").value;
  if (!cid || !ns || !nd) { showToast("⚠️ Fill all fields"); return; }
  const c = children.find(x => x.id === cid);
  if (c) { c.state = ns; c.district = nd; }
  showToast(`✅ ${c.name} → ${nd}, ${ns}`);
  document.getElementById("migChild").value = "";
  document.getElementById("migState").value = "";
  document.getElementById("migDistrict").innerHTML = '<option value="">Select district…</option>';
  document.getElementById("migCurrentLoc").textContent = "—";
  document.getElementById("migNewLoc").textContent = "—";
}

// ============================================================
// SCREEN 5 — Alerts
// ============================================================
function renderAlerts() {
  const list = document.getElementById("alertList");
  list.innerHTML = alerts.map(a => {
    const c = children.find(x => x.id === a.childId);
    const emoji = a.type === "high" ? "⚠️" : a.type === "medium" ? "🔶" : "🔵";
    return `
      <div class="alert-item">
        <div class="alert-emoji alert-emoji--${a.type}">${emoji}</div>
        <div class="alert-body">
          <div class="alert-top">
            <span class="alert-child-name">${c ? c.name : "—"}</span>
            <span class="alert-sev alert-sev--${a.type}">${a.type}</span>
          </div>
          <div class="alert-desc">${a.reason}</div>
          <div class="alert-when">${a.time}</div>
        </div>
      </div>`;
  }).join("");
}

// ============================================================
// SCREEN 6 — Charts (pure Canvas)
// ============================================================
function renderCharts() {
  drawBar("chartEnrollment", [85,120,95,140,110,165], ["Jan","Feb","Mar","Apr","May","Jun"], "#6C63FF","#8B5CF6");
  drawBar("chartMissing",    [18,14,22,10,8,6],       ["Jan","Feb","Mar","Apr","May","Jun"], "#3B82F6","#60A5FA");
  drawArea("chartRisk",      [12,18,15,23,20,23],     ["Jan","Feb","Mar","Apr","May","Jun"], "#EF4444");
}

function drawBar(id, data, labels, c1, c2) {
  const cv = document.getElementById(id);
  if (!cv) return;
  const ctx = cv.getContext("2d");
  const dpr = window.devicePixelRatio || 1;
  const W = cv.parentElement.clientWidth - 32;
  const H = 140;
  cv.width = W * dpr; cv.height = H * dpr;
  cv.style.width = W + "px"; cv.style.height = H + "px";
  ctx.scale(dpr, dpr);
  ctx.clearRect(0,0,W,H);

  const mx = Math.max(...data)*1.2;
  const gap = W / data.length;
  const bw = gap * 0.45;

  // grid
  ctx.strokeStyle = "rgba(255,255,255,0.04)";
  for (let i=0;i<=3;i++) { const y=14+(H-40)*(i/3); ctx.beginPath(); ctx.moveTo(0,y); ctx.lineTo(W,y); ctx.stroke(); }

  data.forEach((v,i) => {
    const bh = (v/mx)*(H-40);
    const x = i*gap+(gap-bw)/2;
    const y = H-22-bh;
    const g = ctx.createLinearGradient(x,y,x,y+bh);
    g.addColorStop(0,c1); g.addColorStop(1,c2);
    ctx.fillStyle = g;
    rr(ctx,x,y,bw,bh,5); ctx.fill();
    ctx.fillStyle="rgba(232,236,244,.7)"; ctx.font="600 10px Inter"; ctx.textAlign="center";
    ctx.fillText(v, x+bw/2, y-4);
    ctx.fillStyle="rgba(123,132,153,.6)"; ctx.font="500 9px Inter";
    ctx.fillText(labels[i], x+bw/2, H-6);
  });
}

function drawArea(id, data, labels, color) {
  const cv = document.getElementById(id);
  if (!cv) return;
  const ctx = cv.getContext("2d");
  const dpr = window.devicePixelRatio || 1;
  const W = cv.parentElement.clientWidth - 32;
  const H = 140;
  cv.width = W*dpr; cv.height = H*dpr;
  cv.style.width = W+"px"; cv.style.height = H+"px";
  ctx.scale(dpr,dpr);
  ctx.clearRect(0,0,W,H);

  const mx = Math.max(...data)*1.3;
  const step = W/(data.length-1);

  ctx.strokeStyle="rgba(255,255,255,0.04)";
  for(let i=0;i<=3;i++){const y=14+(H-40)*(i/3);ctx.beginPath();ctx.moveTo(0,y);ctx.lineTo(W,y);ctx.stroke();}

  const pts = data.map((v,i)=>({ x:i*step, y:14+(1-v/mx)*(H-40) }));

  // area
  ctx.beginPath(); ctx.moveTo(pts[0].x,pts[0].y);
  for(let i=1;i<pts.length;i++){const xc=(pts[i-1].x+pts[i].x)/2;const yc=(pts[i-1].y+pts[i].y)/2;ctx.quadraticCurveTo(pts[i-1].x,pts[i-1].y,xc,yc);}
  ctx.quadraticCurveTo(pts[pts.length-1].x,pts[pts.length-1].y,pts[pts.length-1].x,pts[pts.length-1].y);
  ctx.lineTo(W,H-22);ctx.lineTo(0,H-22);ctx.closePath();
  const ag=ctx.createLinearGradient(0,0,0,H);ag.addColorStop(0,color+"30");ag.addColorStop(1,color+"05");
  ctx.fillStyle=ag;ctx.fill();

  // line
  ctx.beginPath();ctx.moveTo(pts[0].x,pts[0].y);
  for(let i=1;i<pts.length;i++){const xc=(pts[i-1].x+pts[i].x)/2;const yc=(pts[i-1].y+pts[i].y)/2;ctx.quadraticCurveTo(pts[i-1].x,pts[i-1].y,xc,yc);}
  ctx.quadraticCurveTo(pts[pts.length-1].x,pts[pts.length-1].y,pts[pts.length-1].x,pts[pts.length-1].y);
  ctx.strokeStyle=color;ctx.lineWidth=2;ctx.stroke();

  // dots + labels
  pts.forEach((p,i)=>{
    ctx.beginPath();ctx.arc(p.x,p.y,3.5,0,Math.PI*2);ctx.fillStyle=color;ctx.fill();
    ctx.beginPath();ctx.arc(p.x,p.y,1.5,0,Math.PI*2);ctx.fillStyle="#0F1322";ctx.fill();
    ctx.fillStyle="rgba(232,236,244,.7)";ctx.font="600 10px Inter";ctx.textAlign="center";ctx.fillText(data[i],p.x,p.y-8);
    ctx.fillStyle="rgba(123,132,153,.6)";ctx.font="500 9px Inter";ctx.fillText(labels[i],p.x,H-6);
  });
}

function rr(ctx,x,y,w,h,r){ctx.beginPath();ctx.moveTo(x+r,y);ctx.lineTo(x+w-r,y);ctx.quadraticCurveTo(x+w,y,x+w,y+r);ctx.lineTo(x+w,y+h);ctx.lineTo(x,y+h);ctx.lineTo(x,y+r);ctx.quadraticCurveTo(x,y,x+r,y);ctx.closePath();}

// ---------- Init ----------
document.getElementById("statTotal").textContent = children.length;
