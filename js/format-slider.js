(() => {
    function initSlider(root) {
        if (!root || root.__wordoutSliderReadyV47) return;
        root.__wordoutSliderReadyV47 = true;

        root.querySelectorAll('[data-carousel-clone="1"]').forEach((el) => el.remove());

        const labels = Array.from(root.querySelectorAll('[data-format-label]'));
        const dots = Array.from(root.querySelectorAll('[data-format-dot]'));
        const prev = root.querySelector('.format-slider-prev');
        const next = root.querySelector('.format-slider-next');
        const viewport = root.querySelector('.format-slider-viewport');
        const track = root.querySelector('.format-slider-track');
        const originals = track ? Array.from(track.querySelectorAll('.format-slider-slide')) : [];

        if (!viewport || !track || originals.length < 2) return;

        const wordClone = originals[1].cloneNode(true);
        wordClone.setAttribute('data-carousel-clone', '1');
        track.insertBefore(wordClone, originals[0]);

        const indesignClone = originals[0].cloneNode(true);
        indesignClone.setAttribute('data-carousel-clone', '1');
        track.appendChild(indesignClone);

        let logical = Number(root.getAttribute('data-format-slider') || 0) ? 1 : 0;
        let position = logical === 0 ? 1 : 2;
        let autoTimer = null;
        let animating = false;
        const duration = 950;

        const updateIndicators = (n) => {
            root.setAttribute('data-format-slider', String(n));
            labels.forEach((el) => {
                el.classList.toggle('is-active', el.getAttribute('data-format-label') === String(n));
            });
            dots.forEach((el) => {
                el.classList.toggle('is-active', el.getAttribute('data-format-dot') === String(n));
            });
        };

        const xFor = (pos) => -(pos * viewport.clientWidth);

        const setPosition = (pos, animate) => {
            track.style.transition = animate ? `transform ${duration / 1000}s cubic-bezier(.22,.61,.36,1)` : 'none';
            track.style.transform = `translate3d(${xFor(pos)}px,0,0)`;
        };

        const normalizeAfterMove = () => {
            if (position === 0) {
                position = 2;
                setPosition(position, false);
                void track.offsetWidth;
            } else if (position === 3) {
                position = 1;
                setPosition(position, false);
                void track.offsetWidth;
            }
        };

        const advanceRight = () => {
            if (animating) return;
            animating = true;

            if (logical === 0) {
                logical = 1;
                position = 0;
            } else {
                logical = 0;
                position = 1;
            }

            updateIndicators(logical);
            setPosition(position, true);

            window.setTimeout(() => {
                normalizeAfterMove();
                animating = false;
            }, duration + 40);
        };

        const advanceLeft = () => {
            if (animating) return;
            animating = true;

            if (logical === 0) {
                logical = 1;
                position = 2;
            } else {
                logical = 0;
                position = 3;
            }

            updateIndicators(logical);
            setPosition(position, true);

            window.setTimeout(() => {
                normalizeAfterMove();
                animating = false;
            }, duration + 40);
        };

        const startAuto = () => {
            if (autoTimer) window.clearInterval(autoTimer);
            autoTimer = window.setInterval(advanceRight, 3000);
            root.__wordoutAutoTimer = autoTimer;
        };

        const restartAuto = () => startAuto();

        if (prev) {
            prev.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                advanceLeft();
                restartAuto();
            });
        }

        if (next) {
            next.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                advanceRight();
                restartAuto();
            });
        }

        dots.forEach((dot) => {
            dot.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                const target = Number(dot.getAttribute('data-format-dot')) ? 1 : 0;
                if (target !== logical) advanceRight();
                restartAuto();
            });
        });

        labels.forEach((label) => {
            label.style.cursor = 'pointer';
            label.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                const target = Number(label.getAttribute('data-format-label')) ? 1 : 0;
                if (target !== logical) advanceRight();
                restartAuto();
            });
        });

        updateIndicators(logical);
        requestAnimationFrame(() => setPosition(position, false));

        let resizeTimer = null;
        window.addEventListener('resize', () => {
            window.clearTimeout(resizeTimer);
            resizeTimer = window.setTimeout(() => setPosition(position, false), 80);
        });

        startAuto();
    }

    const initAll = (scope) => {
        (scope || document).querySelectorAll('.format-slider').forEach(initSlider);
    };

    window.WordOutUtils.onReady(() => initAll(document));

    new MutationObserver((muts) => {
        muts.forEach((m) => {
            m.addedNodes.forEach((n) => {
                if (n.nodeType !== 1) return;
                if (n.matches && n.matches('.format-slider')) initSlider(n);
                initAll(n);
            });
        });
    }).observe(document.body, { childList: true, subtree: true });
})();
