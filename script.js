'use strict';

(() => {
  const toggle=document.getElementById('navtoggle');
  const nav=document.getElementById('mainnav');
  toggle.addEventListener('click',()=>nav.classList.toggle('open'));
  nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>nav.classList.remove('open')));

  document.querySelectorAll('.faq-item').forEach(item=>{
    const q=item.querySelector('.faq-q');
    const a=item.querySelector('.faq-a');
    q.addEventListener('click',()=>{
      const isOpen=item.classList.contains('open');
      document.querySelectorAll('.faq-item.open').forEach(openItem=>{
        openItem.classList.remove('open');
        openItem.querySelector('.faq-a').style.maxHeight=null;
      });
      if(!isOpen){item.classList.add('open');a.style.maxHeight=a.scrollHeight+'px';}
    });
  });

  const io=new IntersectionObserver(entries=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){entry.target.classList.add('in');io.unobserve(entry.target);}
    });
  },{threshold:.1});
  document.querySelectorAll('.reveal').forEach(el=>io.observe(el));

  const heroCard=document.querySelector('.hero-visual-card');
  const heroLightbox=document.getElementById('heroLightbox');
  const heroLightboxContent=heroLightbox.querySelector('.hero-lightbox-content');
  const heroLightboxClose=heroLightbox.querySelector('.hero-lightbox-close');
  const openHeroLightbox=()=>{
    heroLightboxContent.innerHTML=heroCard.innerHTML;
    heroLightbox.classList.add('open');
    heroLightbox.setAttribute('aria-hidden','false');
    document.body.classList.add('lightbox-open');
    heroLightboxClose.focus();
  };
  const closeHeroLightbox=()=>{
    heroLightbox.classList.remove('open');
    heroLightbox.setAttribute('aria-hidden','true');
    document.body.classList.remove('lightbox-open');
    heroCard.focus({preventScroll:true});
  };
  heroCard.addEventListener('click',openHeroLightbox);
  heroCard.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();openHeroLightbox();}});
  heroLightboxClose.addEventListener('click',closeHeroLightbox);
  heroLightbox.addEventListener('click',e=>{if(e.target===heroLightbox)closeHeroLightbox();});
  document.addEventListener('keydown',e=>{if(e.key==='Escape'&&heroLightbox.classList.contains('open'))closeHeroLightbox();});
})();

(() => {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let showAfter = false;
  const applyHeroToggle = () => {
    document.querySelectorAll('.hero-toggle-card').forEach(card => {
      const beforeImage = card.querySelector('.toggle-img.is-before');
      const afterImage = card.querySelector('.toggle-img.is-after');
      const beforeLabel = card.querySelector('.toggle-label.is-before');
      const afterLabel = card.querySelector('.toggle-label.is-after');
      beforeImage?.classList.toggle('active', !showAfter);
      afterImage?.classList.toggle('active', showAfter);
      beforeLabel?.classList.toggle('active', !showAfter);
      afterLabel?.classList.toggle('active', showAfter);
    });
  };
  applyHeroToggle();
  if (!reduceMotion) {
    setInterval(() => {
      showAfter = !showAfter;
      applyHeroToggle();
    }, 2600);
  }
})();

(() => {
  const lightbox = document.getElementById('heroLightbox');
  const content = lightbox?.querySelector('.hero-lightbox-content');
  const dialog = lightbox?.querySelector('.hero-lightbox-dialog');
  const closeButton = lightbox?.querySelector('.hero-lightbox-close');
  if (!lightbox || !content || !dialog || !closeButton) return;

  let trigger = null;
  let savedScrollY = 0;
  let featureOpen = false;

  const panels = document.querySelectorAll('#solution .actual-compare, #solution .detail-visual');
  panels.forEach((panel, index) => {
    panel.setAttribute('role', 'button');
    panel.setAttribute('tabindex', '0');
    panel.setAttribute('aria-label', `変換サンプル画像${index + 1}を拡大表示`);
  });

  const lockPage = () => {
    savedScrollY = window.scrollY || window.pageYOffset || 0;
    document.documentElement.style.scrollBehavior = 'auto';
    document.body.classList.add('feature-lightbox-locked');
    document.body.style.top = `-${savedScrollY}px`;
  };

  const restorePage = () => {
    document.body.classList.remove('feature-lightbox-locked');
    document.body.style.top = '';
    window.scrollTo({top: savedScrollY, left: 0, behavior: 'auto'});
    requestAnimationFrame(() => window.scrollTo(0, savedScrollY));
    setTimeout(() => {
      window.scrollTo(0, savedScrollY);
      document.documentElement.style.scrollBehavior = '';
    }, 0);
  };

  const openFeature = panel => {
    trigger = panel;
    const clone = panel.cloneNode(true);
    /* Cloned sliders inherit data-slider-ready from the source, but not event listeners.
       Remove it so the lightbox clone is initialized as an interactive slider. */
    clone.removeAttribute('data-slider-ready');
    clone.classList.add('feature-visual-enlarged');

    /* Use 01 as the reference outer-frame size for every feature modal (01/02/03). */
    const referencePanel = document.querySelector('#solution .detail-visual.crop-math');
    if (referencePanel) {
      const referenceRect = referencePanel.getBoundingClientRect();
      if (referenceRect.width > 0 && referenceRect.height > 0) {
        const referenceMaxW = Math.min(window.innerWidth * 0.82, 980);
        const referenceMaxH = window.innerHeight * 0.76;
        const referenceScale = Math.min(referenceMaxW / referenceRect.width, referenceMaxH / referenceRect.height);
        const referenceW = Math.round(referenceRect.width * referenceScale);
        const referenceH = Math.round(referenceRect.height * referenceScale);
        dialog.style.setProperty('--wordout-feature-modal-w', `${referenceW}px`);
        dialog.style.setProperty('--wordout-feature-modal-h', `${referenceH}px`);
        dialog.style.setProperty('width', `${referenceW}px`, 'important');
        dialog.style.setProperty('height', `${referenceH}px`, 'important');
      }
    }

    /* 01 only: enlarge the exact inline viewport without changing its crop.
       03 (format-slider) is intentionally untouched. */
    if (panel.classList.contains('detail-visual') && panel.classList.contains('crop-math')) {
      const sourceRect = panel.getBoundingClientRect();
      const sourceInner = panel.querySelector('.feature-image-inner');
      const cloneInner = clone.querySelector('.feature-image-inner');
      let targetW = sourceRect.width;
      let targetH = sourceRect.height;
      if (sourceRect.width > 0 && sourceRect.height > 0) {
        const maxW = Math.min(window.innerWidth * 0.82, 980);
        const maxH = window.innerHeight * 0.76;
        const scale = Math.min(maxW / sourceRect.width, maxH / sourceRect.height);
        targetW = Math.round(sourceRect.width * scale);
        targetH = Math.round(sourceRect.height * scale);
        clone.style.setProperty('width', `${targetW}px`, 'important');
        clone.style.setProperty('height', `${targetH}px`, 'important');
        clone.style.setProperty('min-height', '0', 'important');
        clone.style.setProperty('max-height', 'none', 'important');
        clone.style.setProperty('aspect-ratio', 'auto', 'important');
      }
      if (sourceInner && cloneInner) {
        const r = sourceInner.getBoundingClientRect();
        /* The clone is still detached here, so getBoundingClientRect() on it is 0x0.
           Use the target scale already calculated from the live source panel instead. */
        const scaleX = (sourceRect.width > 0 && typeof targetW !== 'undefined') ? targetW / sourceRect.width : 1;
        if (r.width > 0 && r.height > 0) {
          cloneInner.style.setProperty('width', `${Math.round(r.width * scaleX)}px`, 'important');
          cloneInner.style.setProperty('height', `${Math.round(r.height * scaleX)}px`, 'important');
          cloneInner.style.setProperty('aspect-ratio', 'auto', 'important');
        }
      }
    }
    clone.removeAttribute('role');
    clone.removeAttribute('tabindex');
    clone.removeAttribute('aria-label');
    content.replaceChildren(clone);
    lockPage();
    featureOpen = true;
    dialog.classList.add('feature-visual-dialog');
    lightbox.classList.add('open');
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.classList.add('lightbox-open');
    closeButton.focus({preventScroll: true});
  };

  const closeFeature = () => {
    if (!featureOpen) return;
    featureOpen = false;
    lightbox.classList.remove('open');
    lightbox.setAttribute('aria-hidden', 'true');
    dialog.classList.remove('feature-visual-dialog');
    dialog.style.removeProperty('width');
    dialog.style.removeProperty('max-width');
    dialog.style.removeProperty('height');
    dialog.style.removeProperty('--wordout-feature-modal-w');
    dialog.style.removeProperty('--wordout-feature-modal-h');
    document.body.classList.remove('lightbox-open');
    content.replaceChildren();
    restorePage();
    const previousTrigger = trigger;
    trigger = null;
    if (previousTrigger) requestAnimationFrame(() => previousTrigger.focus({preventScroll: true}));
  };

  panels.forEach(panel => {
    panel.addEventListener('click', event => {
      if (event.target.closest('.format-slider-arrow, .format-slider-dot, [data-format-label]')) return;
      event.preventDefault();
      event.stopImmediatePropagation();
      openFeature(panel);
    }, true);
    panel.addEventListener('keydown', event => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        event.stopImmediatePropagation();
        openFeature(panel);
      }
    }, true);
  });

  closeButton.addEventListener('click', event => {
    if (!featureOpen) return;
    event.preventDefault();
    event.stopImmediatePropagation();
    closeFeature();
  }, true);

  lightbox.addEventListener('click', event => {
    if (!featureOpen || event.target !== lightbox) return;
    event.preventDefault();
    event.stopImmediatePropagation();
    closeFeature();
  }, true);

  document.addEventListener('keydown', event => {
    if (!featureOpen || event.key !== 'Escape') return;
    event.preventDefault();
    event.stopImmediatePropagation();
    closeFeature();
  }, true);
})();

(() => {
  const header = document.querySelector('header');
  let lastY = window.scrollY;
  let ticking = false;
  const updateHeader = () => {
    const y = window.scrollY;
    if (y <= 20 || y < lastY - 5) header?.classList.remove('header-hidden');
    else if (y > lastY + 5 && y > 90) header?.classList.add('header-hidden');
    lastY = y;
    ticking = false;
  };
  window.addEventListener('scroll', () => {
    if (!ticking) { requestAnimationFrame(updateHeader); ticking = true; }
  }, {passive:true});
})();

(function(){
  function initSlider(root){
    if(!root || root.__wordoutSliderReadyV47) return;
    root.__wordoutSliderReadyV47 = true;

    /* Remove any runtime clone inherited by a lightbox clone, then rebuild cleanly. */
    root.querySelectorAll('[data-carousel-clone="1"]').forEach(function(el){ el.remove(); });

    var labels = Array.from(root.querySelectorAll('[data-format-label]'));
    var dots = Array.from(root.querySelectorAll('[data-format-dot]'));
    var prev = root.querySelector('.format-slider-prev');
    var next = root.querySelector('.format-slider-next');
    var viewport = root.querySelector('.format-slider-viewport');
    var track = root.querySelector('.format-slider-track');
    var originals = track ? Array.from(track.querySelectorAll('.format-slider-slide')) : [];
    if(!viewport || !track || originals.length < 2) return;

    /* Track order: [Word clone] [InDesign] [Word] [InDesign clone].
       The clones let each manual arrow animate in its own visual direction without a visible jump. */
    var wordClone = originals[1].cloneNode(true);
    wordClone.setAttribute('data-carousel-clone','1');
    track.insertBefore(wordClone, originals[0]);
    var indesignClone = originals[0].cloneNode(true);
    indesignClone.setAttribute('data-carousel-clone','1');
    track.appendChild(indesignClone);

    var slides = Array.from(track.querySelectorAll('.format-slider-slide'));
    var logical = Number(root.getAttribute('data-format-slider') || 0) ? 1 : 0;
    var position = logical === 0 ? 1 : 2;
    var autoTimer = null;
    var animating = false;
    var duration = 950;

    function updateIndicators(n){
      root.setAttribute('data-format-slider', String(n));
      labels.forEach(function(el){
        el.classList.toggle('is-active', el.getAttribute('data-format-label') === String(n));
      });
      dots.forEach(function(el){
        el.classList.toggle('is-active', el.getAttribute('data-format-dot') === String(n));
      });
    }

    function xFor(pos){ return -(pos * viewport.clientWidth); }

    function setPosition(pos, animate){
      track.style.transition = animate ? ('transform ' + (duration/1000) + 's cubic-bezier(.22,.61,.36,1)') : 'none';
      track.style.transform = 'translate3d(' + xFor(pos) + 'px,0,0)';
    }

    function normalizeAfterMove(){
      /* Jump only between visually identical clone/original slides, so the reset is invisible. */
      if(position === 0){
        position = 2; /* Word clone -> real Word */
        setPosition(position, false);
        void track.offsetWidth;
      } else if(position === 3){
        position = 1; /* InDesign clone -> real InDesign */
        setPosition(position, false);
        void track.offsetWidth;
      }
    }

    function advanceRight(){
      if(animating) return;
      animating = true;

      if(logical === 0){
        /* InDesign -> Word: move the whole strip to the right, revealing the Word clone from the left. */
        logical = 1;
        position = 0;
      } else {
        /* Word -> InDesign: from the real Word position, move right to the middle InDesign slide. */
        logical = 0;
        position = 1;
      }

      updateIndicators(logical);
      setPosition(position, true);

      window.setTimeout(function(){
        normalizeAfterMove();
        animating = false;
      }, duration + 40);
    }

    function advanceLeft(){
      if(animating) return;
      animating = true;

      if(logical === 0){
        /* InDesign -> Word: move the strip left to the real Word slide. */
        logical = 1;
        position = 2;
      } else {
        /* Word -> InDesign: move left to the trailing InDesign clone. */
        logical = 0;
        position = 3;
      }

      updateIndicators(logical);
      setPosition(position, true);

      window.setTimeout(function(){
        normalizeAfterMove();
        animating = false;
      }, duration + 40);
    }

    function startAuto(){
      if(autoTimer) window.clearInterval(autoTimer);
      autoTimer = window.setInterval(advanceRight, 3000);
      root.__wordoutAutoTimer = autoTimer;
    }

    function restartAuto(){ startAuto(); }

    /* Manual arrows now follow their visual direction. Auto-play remains rightward. */
    if(prev){
      prev.addEventListener('click', function(e){
        e.preventDefault();
        e.stopPropagation();
        advanceLeft();
        restartAuto();
      });
    }
    if(next){
      next.addEventListener('click', function(e){
        e.preventDefault();
        e.stopPropagation();
        advanceRight();
        restartAuto();
      });
    }

    dots.forEach(function(dot){
      dot.addEventListener('click', function(e){
        e.preventDefault();
        e.stopPropagation();
        var target = Number(dot.getAttribute('data-format-dot')) ? 1 : 0;
        if(target !== logical) advanceRight();
        restartAuto();
      });
    });

    labels.forEach(function(label){
      label.style.cursor = 'pointer';
      label.addEventListener('click', function(e){
        e.preventDefault();
        e.stopPropagation();
        var target = Number(label.getAttribute('data-format-label')) ? 1 : 0;
        if(target !== logical) advanceRight();
        restartAuto();
      });
    });

    /* Initial placement without animation. */
    updateIndicators(logical);
    requestAnimationFrame(function(){ setPosition(position, false); });

    var resizeTimer = null;
    window.addEventListener('resize', function(){
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(function(){ setPosition(position, false); }, 80);
    });

    startAuto();
  }

  function initAll(scope){
    (scope || document).querySelectorAll('.format-slider').forEach(initSlider);
  }

  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', function(){ initAll(document); });
  } else {
    initAll(document);
  }

  new MutationObserver(function(muts){
    muts.forEach(function(m){
      m.addedNodes.forEach(function(n){
        if(n.nodeType !== 1) return;
        if(n.matches && n.matches('.format-slider')) initSlider(n);
        initAll(n);
      });
    });
  }).observe(document.body, {childList:true, subtree:true});
})();
