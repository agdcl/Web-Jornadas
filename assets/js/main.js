
// Reveal on scroll
(function(){
  const obs = new IntersectionObserver((entries)=>{
    entries.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add('revealed'); obs.unobserve(e.target);} });
  }, {threshold: 0.12});
  document.querySelectorAll('.reveal').forEach(el=>obs.observe(el));
})();

// i18n
const I18N = {
  en: {
    "brand":"ICoHA · 2025",
    "nav.about":"About","nav.speakers":"Speakers","nav.pricing":"Registration","nav.abstracts":"Submissions","nav.venue":"Venue","nav.register":"Register",
    "cta.register":"Register",
    "hero.title":"II International Congress on Health and Addictions",
    "hero.tagline":"Evidence based advances in Health and Addictions",
    "hero.meta":"December 11 (16:00–20:00) and December 12 (9:00–14:00) · Miguel Hernández University · Elche",
    "hero.view_prices":"View prices","hero.register_now":"Register now",
    "about.heading":"A congress for professionals and students",
    "about.copy":"Welcome to ICoHA 2025. Over two days we bring together international researchers, professionals and students to share recent evidence and discuss emerging trends in the field of health and addictions. The program addresses both problematic, technology-related behaviors and substance use such as cannabis and opioids. It balances academic rigor with an applied focus on prevention, intervention, and knowledge transfer.",
    "about.benefit1.title":"Networking","about.benefit1.copy":"Connect with researchers, clinicians and program leads.",
    "about.benefit2.title":"International speakers","about.benefit2.copy":"Leading perspectives in health and addictions.",
    "about.benefit3.title":"Up-to-date science","about.benefit3.copy":"Applied to prevention and health promotion.",
    "about.when_where.title":"When and where",
    "about.when_where.copy":"December 11 (16:00–20:00) and December 12 (9:00–14:00), Miguel Hernández University, Elche. Valona Building.",
    "about.when_where.item1":"In-person","about.when_where.item2":"Attendance certificate","about.when_where.item3":"Credit recognition","about.when_where.item4":"Limited seats",
    "speakers.opening_badge":"Opening keynote","speakers.closing_badge":"Closing lecture","speakers.view_all":"View all speakers","speakers.modal_title":"Speakers",
    "pricing.title":"Registration","pricing.earlybird":"Early-bird discount active until November 30",
    "pricing.students":"Students","pricing.general":"General","pricing.benefit1":"Access to all sessions","pricing.benefit2":"Attendance certificate","pricing.until":"until Nov 30","pricing.from":"from Dec 1",
    "abstracts.title":"Submissions","abstracts.copy":"Deadline November 20. See poster guidelines.","abstracts.rules_btn":"Poster guidelines","abstracts.submit_btn":"Submit your work",
    "abstracts.timeline.title":"Key dates","abstracts.timeline.item1":"Nov 20: submissions deadline","abstracts.timeline.item2":"Nov 30: early-bird ends","abstracts.timeline.item3":"Dec 11: congress starts",
    "venue.title":"Venue","venue.copy":"The congress will be held at Miguel Hernández University of Elche, in the Valona Building. Elche offers a wide range of accommodation and dining options around its historic palm grove.",
    "org.title":"Organizers",
    "register.title":"Registration",
    "register.copy":"Complete the form to reserve your place. Payment will be made via secure gateway. We will send the payment link by email if the gateway is not integrated into the form.",
    "register.item1":"Limited seats","register.item2":"You will receive automatic email confirmation",
    "footer.legal":"Legal notice","footer.privacy":"Privacy policy","footer.cookies":"Cookies policy",
    "abstracts.rules_title":"Poster submission and presentation guidelines",
    "submit.title":"Submission information",
    "submit.copy":"Send your abstract following the author guidelines to <a href='mailto:info@icoha.es'>info@icoha.es</a>.",
    "submit.view_rules":"View guidelines",
    "common.prev":"Previous","common.next":"Next","common.close":"Close"
  }
};
let currentLang = 'es';
function setLang(lang){
  currentLang = (lang==='en') ? 'en' : 'es';
  if(currentLang==='en'){
    const map = I18N.en;
    document.querySelectorAll('[data-i18n]').forEach(el=>{
      const k = el.getAttribute('data-i18n');
      if(map[k]) el.innerHTML = map[k];
    });
    // Replace poster rules body with brief EN summary
    const body = document.getElementById('posterRulesBody');
    if(body){ if(!body.dataset.esHtml){ body.dataset.esHtml = body.innerHTML.trim(); } body.innerHTML = `
        <h6 class="fw-bold">How to submit your poster abstract</h6>
        <p><strong>Format:</strong> Poster only.</p>
        <p><strong>Abstract (max 500 words):</strong> Introduction/Objectives, Method, Results (processed data), Conclusions and two references. No tables or figures.</p>
        <p><strong>Authors:</strong> Surnames followed by initials; add affiliation. Include academic supervisor if applicable (UG/PG thesis).</p>
        <p><strong>Contact author:</strong> Name and email of the corresponding author.</p>
        <hr>
        <h6 class="fw-bold">Poster presentation</h6>
        <p><strong>Size:</strong> A0 (118.9 × 84.1 cm), vertical.</p>
        <p><strong>Structure:</strong> Title, authors, affiliation; then Introduction, Objectives, Method, Results, Conclusions, References.</p>
        <p><strong>Typography:</strong> Title ≥ 26 pt (32 pt recommended); body 18–26 pt. Legible figures/tables.</p>
        <p>Accepted posters must be displayed in the assigned area. A supplement in <em>Health and Addictions/Salud y Drogas</em> will include accepted and presented posters.</p>
      `;
    }
  }else{
    // restore ES from data-i18n-es snapshot or keep current text as ES baseline
    document.querySelectorAll('[data-i18n]').forEach(el=>{
      const es = el.getAttribute('data-i18n-es');
      if(es!=null) el.innerHTML = es;
    });
    // restore ES detailed rules already in DOM on load
  }
  document.documentElement.lang = currentLang;
  const body = document.getElementById('posterRulesBody');
  if(body && body.dataset.esHtml){ body.innerHTML = body.dataset.esHtml; }
}
document.addEventListener('DOMContentLoaded', ()=>{
  // Snapshot ES text content for all translatable elements
  document.querySelectorAll('[data-i18n]').forEach(el=>{
    if(!el.hasAttribute('data-i18n-es')) el.setAttribute('data-i18n-es', el.innerHTML.trim());
  
  // Snapshot ES of poster rules body
  const posterBody = document.getElementById('posterRulesBody');
  if (posterBody && !posterBody.dataset.esHtml) {
    posterBody.dataset.esHtml = posterBody.innerHTML.trim();
  }});
  // Smooth-scroll fix for hero buttons (in case overlay interfered on some browsers)
  document.querySelectorAll('a[href^="#"]').forEach(a=>{
    a.addEventListener('click', (e)=>{
      const id = a.getAttribute('href');
      if(id.length>1 && document.querySelector(id)){
        e.preventDefault();
        document.querySelector(id).scrollIntoView({behavior:'smooth'});
      }
    });
  });
  // Language buttons
  document.querySelectorAll('.lang-btn').forEach(btn=>{
    btn.addEventListener('click', ()=> setLang(btn.dataset.lang));
  });
});
