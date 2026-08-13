(() => {
    const init = () => {
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
            window.scrollTo({ top: savedScrollY, left: 0, behavior: 'auto' });
            requestAnimationFrame(() => window.scrollTo(0, savedScrollY));
            setTimeout(() => {
                window.scrollTo(0, savedScrollY);
                document.documentElement.style.scrollBehavior = '';
            }, 0);
        };

        const openFeature = (panel) => {
            trigger = panel;
            const clone = panel.cloneNode(true);
            clone.removeAttribute('data-slider-ready');
            clone.classList.add('feature-visual-enlarged');

            const referencePanel = document.querySelector('#solution .detail-visual.crop-math');
            if (referencePanel) {
                const referenceRect = referencePanel.getBoundingClientRect();
                if (referenceRect.width > 0 && referenceRect.height > 0) {
                    const referenceMaxW = Math.min(window.innerWidth * 0.82, 980);
                    const referenceMaxH = Math.min(window.innerHeight * 0.76, 980);
                    const referenceScale = Math.min(referenceMaxW / referenceRect.width, referenceMaxH / referenceRect.height);
                    const referenceW = Math.round(referenceRect.width * referenceScale);
                    const referenceH = Math.round(referenceRect.height * referenceScale);

                    dialog.style.setProperty('--wordout-feature-modal-w', `${referenceW}px`);
                    dialog.style.setProperty('--wordout-feature-modal-h', `${referenceH}px`);
                    dialog.style.setProperty('width', `${referenceW}px`, 'important');
                    dialog.style.setProperty('height', `${referenceH}px`, 'important');
                }
            }

            if (panel.classList.contains('detail-visual') && panel.classList.contains('crop-math')) {
                const sourceRect = panel.getBoundingClientRect();
                const sourceInner = panel.querySelector('.feature-image-inner');
                const cloneInner = clone.querySelector('.feature-image-inner');
                let targetW = sourceRect.width;
                let targetH = sourceRect.height;

                if (sourceRect.width > 0 && sourceRect.height > 0) {
                    const maxW = Math.min(window.innerWidth * 0.82, 980);
                    const maxH = Math.min(window.innerHeight * 0.76, 980);
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
            closeButton.focus({ preventScroll: true });
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
            if (previousTrigger) {
                requestAnimationFrame(() => previousTrigger.focus({ preventScroll: true }));
            }
        };

        panels.forEach((panel) => {
            panel.addEventListener('click', (event) => {
                if (event.target.closest('.format-slider-arrow, .format-slider-dot, [data-format-label]')) return;
                event.preventDefault();
                event.stopImmediatePropagation();
                openFeature(panel);
            }, true);

            panel.addEventListener('keydown', (event) => {
                if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault();
                    event.stopImmediatePropagation();
                    openFeature(panel);
                }
            }, true);
        });

        closeButton.addEventListener('click', (event) => {
            if (!featureOpen) return;
            event.preventDefault();
            event.stopImmediatePropagation();
            closeFeature();
        }, true);

        lightbox.addEventListener('click', (event) => {
            if (!featureOpen || event.target !== lightbox) return;
            event.preventDefault();
            event.stopImmediatePropagation();
            closeFeature();
        }, true);

        document.addEventListener('keydown', (event) => {
            if (!featureOpen || event.key !== 'Escape') return;
            event.preventDefault();
            event.stopImmediatePropagation();
            closeFeature();
        }, true);

        document.addEventListener('click', (event) => {
            const triggerEl = event.target.closest('[data-open-sample]');
            if (!triggerEl) return;

            const source = document.querySelector('.hero-visual-card');
            if (!source) return;

            const clone = source.cloneNode(true);
            content.replaceChildren(clone);
            lightbox.classList.add('open');
            lightbox.setAttribute('aria-hidden', 'false');
            document.body.classList.add('lightbox-open');
        });
    };

    window.WordOutUtils.onReady(init);
})();
