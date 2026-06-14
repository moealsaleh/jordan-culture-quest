
(function(){
  const DATA = window.APP_DATA;
  const app = document.getElementById('app');
  const LS_LANG = 'jq.final.lang';
  const LS_STAMPS = 'jq.final.stamps';
  const state = {
    lang: localStorage.getItem(LS_LANG) || 'en',
    screen: 'home',
    categoryId: null,
    itemId: null,
    quiz: null,
    selected: null,
    result: null,
    usedQuestions: {},
    stamps: JSON.parse(localStorage.getItem(LS_STAMPS) || '[]')
  };

  const byId = (arr, id) => arr.find(x => x.id === id);
  const L = obj => obj ? (obj[state.lang] || obj.en || '') : '';
  const T = key => L(DATA.translations[key]);
  const currentCategory = () => byId(DATA.categories, state.categoryId) || DATA.categories[0];
  const currentItem = () => byId(currentCategory().items, state.itemId) || currentCategory().items[0];

  function setDocumentLang(){
    document.documentElement.lang = state.lang === 'ar' ? 'ar' : 'en';
    document.documentElement.dir = state.lang === 'ar' ? 'rtl' : 'ltr';
  }

  window.setLang = function(lang){
    state.lang = lang;
    localStorage.setItem(LS_LANG, lang);
    setDocumentLang();
    render();
  };

  window.goHome = function(){
    stopVoice();
    Object.assign(state, {screen:'home', categoryId:null, itemId:null, quiz:null, selected:null, result:null});
    render();
  };

  window.resetApp = function(){
    stopVoice();
    state.stamps = [];
    localStorage.removeItem(LS_STAMPS);
    window.goHome();
  };

  window.openCategory = function(categoryId, itemId){
    stopVoice();
    const cat = byId(DATA.categories, categoryId);
    Object.assign(state, {
      screen: 'category',
      categoryId,
      itemId: itemId || cat.items[0].id,
      quiz: null,
      selected: null,
      result: null
    });
    render();
  };

  window.selectItem = function(itemId){
    stopVoice();
    Object.assign(state, {itemId, quiz:null, selected:null, result:null, screen:'category'});
    render();
  };

  function shuffleArray(arr){
    const out = arr.slice();
    for(let i = out.length - 1; i > 0; i--){
      const j = Math.floor(Math.random() * (i + 1));
      [out[i], out[j]] = [out[j], out[i]];
    }
    return out;
  }

  function buildQuestionPool(cat){
    const pools = [];
    cat.items.forEach((item) => {
      const others = shuffleArray(cat.items.filter(x => x.id !== item.id));
      const otherNames = others.slice(0,3).map(x => x.name);
      const otherFacts = others.filter(x => x.fact).slice(0,3).map(x => x.fact);

      // Main item-specific MCQ.
      pools.push({
        id: `${cat.id}-${item.id}-main`,
        question: item.question,
        options: item.options.map((opt, i) => ({text: opt, correct: i === item.correctIndex}))
      });

      // Fact question about this specific item.
      if(item.fact && otherFacts.length >= 3){
        pools.push({
          id: `${cat.id}-${item.id}-fact`,
          question: {
            en: `What specific fact was mentioned about “${item.name.en}”?`,
            ar: `ما المعلومة المحددة التي ذُكرت عن «${item.name.ar}»؟`
          },
          options: shuffleArray([{text: item.fact, correct: true}, ...otherFacts.map(f => ({text: f, correct: false}))])
        });
      }

      // Clue question based on the item’s information.
      if(item.fact && otherNames.length >= 3){
        pools.push({
          id: `${cat.id}-${item.id}-clue`,
          question: {
            en: `Which item matches this clue: ${item.fact.en}?`,
            ar: `أي عنصر تنطبق عليه هذه المعلومة: ${item.fact.ar}؟`
          },
          options: shuffleArray([{text: item.name, correct: true}, ...otherNames.map(n => ({text: n, correct: false}))])
        });
      }
    });
    return pools;
  }

  function pickNewQuestion(cat){
    const pool = buildQuestionPool(cat);
    if(!state.usedQuestions[cat.id]) state.usedQuestions[cat.id] = [];
    let available = pool.filter(q => !state.usedQuestions[cat.id].includes(q.id));
    if(available.length === 0){
      state.usedQuestions[cat.id] = [];
      available = pool;
    }
    const picked = available[Math.floor(Math.random() * available.length)];
    state.usedQuestions[cat.id].push(picked.id);
    picked.options = shuffleArray(picked.options);
    return picked;
  }

  window.readyQuestion = function(){
    stopVoice();
    state.quiz = pickNewQuestion(currentCategory());
    state.selected = null;
    state.result = null;
    state.screen = 'question';
    render();
  };

  window.selectOption = function(i){
    state.selected = i;
    document.querySelectorAll('.option').forEach((el, idx) => el.classList.toggle('selected', idx === i));
  };

  window.submitAnswer = function(){
    if(state.selected === null || state.selected === undefined){
      toast(T('selectOne'));
      return;
    }
    const correct = !!state.quiz.options[state.selected].correct;
    state.result = {correct};
    const catId = state.categoryId;
    if(correct && !state.stamps.includes(catId)){
      state.stamps.push(catId);
      localStorage.setItem(LS_STAMPS, JSON.stringify(state.stamps));
    }
    correct ? playSuccess() : playWrong();
    if(correct) confetti();
    state.screen = 'result';
    render();
  };


  window.stopVoice = stopVoice;

  function header(){
    return `
      <header class="topbar">
        <button class="brand" onclick="goHome()" aria-label="Home">
          <span class="flag" aria-hidden="true"></span>
          <span>Jordan Quest <small>رحلة الثقافة الأردنية</small></span>
        </button>
        <div class="actions-top">
          <div class="lang" aria-label="${T('language')}">
            <button class="${state.lang==='en'?'active':''}" onclick="setLang('en')">${T('english')}</button>
            <button class="${state.lang==='ar'?'active':''}" onclick="setLang('ar')">${T('arabic')}</button>
          </div>
          <button class="btn ghost" onclick="resetApp()">${T('reset')}</button>
        </div>
      </header>`;
  }

  function progress(){
    return `<div class="progress" aria-label="${T('progress')}">
      ${DATA.categories.map(c=>`<span class="${state.stamps.includes(c.id)?'done':''}" title="${L(c.title)}">${c.icon}</span>`).join('')}
    </div>`;
  }

  function mapComponent(activeId='', compact=false){
    const cities = byId(DATA.categories, 'cities').items;
    return `<div class="map-wrap exact-city-map" role="region" aria-label="${T('mapTitle')}">
      <img src="${DATA.assets.cityMapExact}" alt="${T('mapTitle')}" />
      ${cities.map(item => `
        <button type="button" class="hotspot exact-hotspot ${activeId === item.id ? 'active' : ''}"
          style="--x:${item.zone?.x ?? item.x}%;--y:${item.zone?.y ?? item.y}%;--w:${item.zone?.w ?? 7.2}%;--h:${item.zone?.h ?? 6}%"
          onclick="event.preventDefault(); event.stopPropagation(); openCategory('cities','${item.id}')"
          aria-label="${L(item.name)}" title="${L(item.name)}">
          <span class="hover-card city-name-only">${L(item.name)}</span>
        </button>
      `).join('')}
    </div>`;
  }

  function home(){
    return `<main>
      <section class="home-hero clean-home">
        <img class="home-map-bg" src="${DATA.assets.homeFlagMap}" alt="" aria-hidden="true" />
        <div class="home-glow" aria-hidden="true"></div>
        <div class="home-content">
          <div class="home-kicker">🇯🇴 Jordan Culture Booth</div>
          <h1>Jordan Quest</h1>
          <h2>رحلة الثقافة الأردنية</h2>
          <p>${T('homeHeroText')}</p>
          <div class="home-actions">
            <button class="btn primary" onclick="document.getElementById('categories').scrollIntoView({behavior:'smooth'})">${T('startCities')}</button>
          </div>
        </div>
        <div class="home-info-card compact-progress">
          <strong>${T('progress')}</strong>
          ${progress()}
        </div>
      </section>

      <section id="categories" class="section-head"><div><h2>${T('chooseCategory')}</h2></div></section>
      <section class="category-grid">
        ${DATA.categories.map(c => `<button class="card ${state.stamps.includes(c.id)?'done':''}" onclick="openCategory('${c.id}')">
          <span class="icon">${c.icon}</span><strong>${L(c.title)}</strong><small>${L(c.intro)}</small>
        </button>`).join('')}
      </section>
    </main>`;
  }

  function category(){
    const cat = currentCategory();
    const item = currentItem();
    const sourceNames = item.sourceIds.map(id => DATA.sources[id]?.name || id).join(' · ');
    return `<main>
      <button class="btn back-button" onclick="goHome()">← ${T('back')}</button>
      <section class="section-head">
        <div><h2>${cat.icon} ${L(cat.title)}</h2><p>${L(cat.intro)}</p></div>
        ${progress()}
      </section>

      <section class="category-layout">
        ${cat.usesMap ? `<section class="map-panel"><p style="margin:0 0 12px;color:var(--muted);font-weight:900">${T('hoverMapHelp')}</p>${mapComponent(item.id)}</section>` : `<section class="panel"><h2>${cat.icon}</h2><p>${L(cat.intro)}</p><p class="source-line">${T('questionPool')}</p></section>`}
        <section class="panel">
          <h2>${L(item.name)}</h2>
          <div class="item-feature">
            <span class="big-icon">${item.icon}</span>
            <div>
              <p>${L(item.text)}</p>
            </div>
          </div>
          <div class="controls">
            <button class="btn primary" onclick="readyQuestion()">${T('ready')}</button>
          </div>
        </section>
      </section>

      <section class="items-grid">
        ${cat.items.map(it => `<button class="item-card" onclick="selectItem('${it.id}')">
          <span class="icon">${it.icon}</span><strong>${L(it.name)}</strong><small>${L(it.text)}</small>
        </button>`).join('')}
      </section>
    </main>`;
  }

  function question(){
    const item = currentItem();
    if(!state.quiz) state.quiz = shuffledQuestion(item);
    return `<main>
      <section class="question-panel">
        <button class="btn back-button" onclick="openCategory('${state.categoryId}','${state.itemId}')">← ${T('back')}</button>
        <h2>${T('question')}: ${L(state.quiz.question)}</h2>
        <div class="options">
          ${state.quiz.options.map((opt, idx) => `<button class="option" onclick="selectOption(${idx})">
            <span class="letter">${String.fromCharCode(65+idx)}</span><span>${L(opt.text)}</span>
          </button>`).join('')}
        </div>
        <div class="controls"><button class="btn primary" onclick="submitAnswer()">${T('submit')}</button></div>
      </section>
    </main>`;
  }

  function result(){
    const item = currentItem();
    const correct = !!state.result?.correct;
    const correctOpt = state.quiz.options.find(o => o.correct);
    return `<main>
      <section class="result-panel">
        <div class="result-symbol">${correct ? '🇯🇴' : '💡'}</div>
        <h2>${correct ? T('correct') : T('wrong')}</h2>
        <p>${correct ? L(item.text) : `${L(correctOpt.text)} — ${L(item.text)}`}</p>
        ${correct ? `<div class="stamp">${T('stamp')} · ${L(currentCategory().title)}</div>` : ''}
        <div class="controls" style="justify-content:center">
          <button class="btn primary" onclick="readyQuestion()">${T('anotherQuestion')}</button>
          <button class="btn secondary" onclick="goHome()">${T('next')}</button>
          <button class="btn back-button" onclick="openCategory('${state.categoryId}','${state.itemId}')">${T('back')}</button>
        </div>
      </section>
    </main>`;
  }

  function render(){
    setDocumentLang();
    app.innerHTML = `<div class="shell">${header()}${state.screen==='home'?home():state.screen==='category'?category():state.screen==='question'?question():result()}</div>`;
  }

  function stopVoice(){}

  function toast(msg){
    const old = document.querySelector('.toast');
    if(old) old.remove();
    const el = document.createElement('div');
    el.className = 'toast';
    el.textContent = msg;
    document.body.appendChild(el);
    setTimeout(()=>el.remove(), 2600);
  }

  function tone(freq, duration, delay=0, type='sine'){
    try{
      const Ctx = window.AudioContext || window.webkitAudioContext;
      const ctx = new Ctx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = type;
      osc.frequency.value = freq;
      gain.gain.value = 0.045;
      osc.connect(gain); gain.connect(ctx.destination);
      const now = ctx.currentTime + delay;
      osc.start(now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);
      osc.stop(now + duration + 0.03);
    }catch(e){}
  }
  function playSuccess(){ tone(523,.12,0); tone(659,.14,.12); tone(784,.18,.25,'triangle'); }
  function playWrong(){ tone(392,.11,0); tone(330,.16,.14); }

  function confetti(){
    const layer = document.createElement('div');
    layer.className = 'confetti';
    const colors = ['#CE1126','#111111','#007A3D','#FFFFFF'];
    for(let i=0;i<80;i++){
      const p = document.createElement('span');
      p.style.left = Math.random()*100 + '%';
      p.style.background = colors[i%colors.length];
      p.style.animationDelay = Math.random()*0.65 + 's';
      p.style.transform = `rotate(${Math.random()*360}deg)`;
      layer.appendChild(p);
    }
    document.body.appendChild(layer);
    setTimeout(()=>layer.remove(), 3200);
  }

  render();
})();
