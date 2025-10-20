// Language handling with round-trip ES <-> EN and localized countdown
let currentLang = 'es';

// Build ES strings from the DOM on first load so we can always restore them
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('[data-i18n]').forEach(el => {
    if (!el.dataset.i18nEs) {
      el.dataset.i18nEs = el.textContent.trim();
    }
  });
  // Initialize countdown after we have currentLang
  renderCountdown();
});

const I18N = {
  en: {
    "top.abstract_book": "Book of abstracts",
    "top.photos_dinner": "Dinner photos",
    "top.photos_congress": "Congress photos",
    "top.attendee_access": "Attendee access",
    "top.contact": "Contact",
    "nav.about": "About",
    "nav.speakers": "Speakers",
    "nav.pricing": "Tickets",
    "nav.abstracts": "Submissions",
    "nav.venue": "Venue",
    "nav.register": "Register",
    "cta.register": "Register",
    "hero.title": "II International Congress on Health and Addictions",
    "hero.tagline": "Evidence based advances in Health and Addictions",
    "hero.meta": "11–12 December 2025 · Miguel Hernández University · Elche",
    "hero.view_prices": "View prices",
    "hero.register_now": "Register now",
    "about.heading": "A congress for professionals and students",
    "about.copy": "An academic yet practical event focused on the best evidence in prevention, health promotion and addictions.",
    "about.benefit1.title": "Networking",
    "about.benefit1.copy": "Connect with researchers, clinicians and program leads.",
    "about.benefit2.title": "International speakers",
    "about.benefit2.copy": "Leading perspectives in health and addictions.",
    "about.benefit3.title": "Up-to-date science",
    "about.benefit3.copy": "Applied to prevention and health promotion.",
    "about.when_where.title": "When and where",
    "about.when_where.copy": "December 11th from 16:00 to 20:00 and December 12th from 9:00 to 14:00, Miguel Hernández University, Elche.",
    "about.when_where.item1": "In-person format",
    "about.when_where.item2": "Attendance certificate",
    "about.when_where.item3": "Limited seats",
    "speakers.title": "Speakers and panels",
    "speakers.panel": "Panel",
    "pricing.title": "Registration",
    "pricing.note": "Early registration discount active until November 30.",
    "pricing.student.title": "Students",
    "pricing.general.title": "General",
    "pricing.perks.1": "Access to all sessions",
    "pricing.perks.2": "Attendance certificate",
    "pricing.early": "until Nov 30",
    "pricing.standard": "from Dec 1",
    "abstracts.title": "Submissions",
    "abstracts.copy": "Deadline: November 20. Check the poster rules.",
    "abstracts.rules": "Rules (coming soon)",
    "abstracts.submit": "Submit",
    "abstracts.deadlines": "Key deadlines",
    "venue.title": "Venue",
    "venue.copy": "The congress takes place at Miguel Hern\u00e1ndez University of Elche, in the Valona Building. Elche offers a wide range of accommodation and dining near the historic palm grove.",
    "venue.item1": "Building and room will be confirmed in the final program",
    "venue.item2": "Parking available on campus",
    "venue.item3": "Public transport from Elche train station",
    "venue.contact": "Logistics questions",
    "register.title": "Registration",
    "register.copy": "Fill in the form to reserve your seat. Payment will be made via a secure gateway. We will send a payment link by email if the gateway is not integrated into the form.",
    "register.item1": "Limited seats",
    "register.item2": "Automatic confirmation by email",
    "contact.title": "Contact",
    "attendee.title": "Attendee access",
    "attendee.copy": "Materials and communications during the event will be uploaded here.",
    "attendee.materials": "Materials (available during the congress)",
    "attendee.photos": "Gallery",
    "org.title": "Organized by",
    "legal.legal": "Legal notice",
    "legal.privacy": "Privacy policy",
    "legal.cookies": "Cookies policy",
    "legal.placeholder": "Placeholder legal text. Replace with your approved version.",
    "cookies.title": "Your privacy",
    "cookies.copy": "We use first- and third-party cookies for functional and analytics purposes. Adjust your preferences.",
    "cookies.analytics": "Analytics",
    "cookies.reject": "Reject",
    "cookies.accept": "Accept",
    "countdown.days": "Days",
    "countdown.hours": "Hours",
    "countdown.minutes": "Min",
    "countdown.seconds": "Sec"
  }
};

function getI18n(key, fallback){
  const strings = I18N[currentLang] || {};
  return strings[key] || fallback;
}

function setLang(lang){
  currentLang = lang === 'en' ? 'en' : 'es';
  if(currentLang === 'es'){
    document.querySelectorAll('[data-i18n]').forEach(el => {
      if(el.dataset.i18nEs) el.textContent = el.dataset.i18nEs;
    });
  }else{
    const strings = I18N.en;
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if(strings[key]) el.textContent = strings[key];
    });
  }
  document.documentElement.lang = currentLang;
  renderCountdown();
}

// Language selector control
document.getElementById('langSelect').addEventListener('change', (e)=>{
  setLang(e.target.value);
});

// Countdown localized
const target = new Date('2025-12-11T15:00:00Z'); // 16:00 CET
const elCountdown = document.getElementById('countdown');

function two(n){return n<10?'0'+n:n;}
function renderCountdown(){
  function tick(){
    const now = new Date();
    let diff = Math.max(0, target - now);
    const d = Math.floor(diff/(1000*60*60*24)); diff-=d*24*60*60*1000;
    const h = Math.floor(diff/(1000*60*60)); diff-=h*60*60*1000;
    const m = Math.floor(diff/(1000*60)); diff-=m*60*1000;
    const s = Math.floor(diff/1000);
    const labels = [
      getI18n('countdown.days','Días'),
      getI18n('countdown.hours','Horas'),
      getI18n('countdown.minutes','Min'),
      getI18n('countdown.seconds','Seg')
    ];
    elCountdown.innerHTML = [d,h,m,s].map((val,i)=>{
      return `<div class="unit text-white text-center"><div class="fs-3 fw-bold">${two(val)}</div><div class="small">${labels[i]}</div></div>`;
    }).join('');
  }
  tick();
}

setInterval(renderCountdown, 1000);

// Cookie banner unchanged from previous version
(function(){
  const banner = document.getElementById('cookieBanner');
  const accept = document.getElementById('btnAcceptCookies');
  const reject = document.getElementById('btnRejectCookies');
  const key = 'icoha_cookies_pref_v1';
  const pref = localStorage.getItem(key);
  if(!pref){ banner.style.display = 'block'; }
  accept.addEventListener('click', ()=>{
    const analyticsEnabled = document.getElementById('analyticsSwitch').checked;
    localStorage.setItem(key, JSON.stringify({necessary:true, analytics:analyticsEnabled}));
    banner.style.display = 'none';
  });
  reject.addEventListener('click', ()=>{
    localStorage.setItem(key, JSON.stringify({necessary:true, analytics:false}));
    banner.style.display = 'none';
  });
})();

// Track CTA click (if GA loaded)
document.getElementById('ctaRegister').addEventListener('click', ()=>{
  if(typeof gtag === 'function'){
    gtag('event','select_content', {content_type: 'button', item_id: 'cta_register'});
  }
});
