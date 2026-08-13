(() => {
    const init = () => {
        const toggle = document.getElementById('navtoggle');
        const nav = document.getElementById('mainnav');

        if (toggle && nav) {
            toggle.addEventListener('click', () => nav.classList.toggle('open'));
            nav.querySelectorAll('a').forEach((a) => {
                a.addEventListener('click', () => nav.classList.remove('open'));
            });
        }

        document.querySelectorAll('.faq-item').forEach((item) => {
            const q = item.querySelector('.faq-q');
            const a = item.querySelector('.faq-a');
            if (!q || !a) return;

            q.addEventListener('click', () => {
                const isOpen = item.classList.contains('open');

                document.querySelectorAll('.faq-item.open').forEach((openItem) => {
                    openItem.classList.remove('open');
                    const faqAnswer = openItem.querySelector('.faq-a');
                    if (faqAnswer) faqAnswer.style.maxHeight = null;
                });

                if (!isOpen) {
                    item.classList.add('open');
                    a.style.maxHeight = `${a.scrollHeight}px`;
                }
            });
        });

        const io = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('in');
                    io.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        document.querySelectorAll('.reveal').forEach((el) => io.observe(el));

        const heroCard = document.querySelector('.hero-visual-card');
        const heroLightbox = document.getElementById('heroLightbox');
        if (!heroCard || !heroLightbox) return;

        const heroLightboxContent = heroLightbox.querySelector('.hero-lightbox-content');
        const heroLightboxClose = heroLightbox.querySelector('.hero-lightbox-close');
        if (!heroLightboxContent || !heroLightboxClose) return;

        const openHeroLightbox = () => {
            heroLightboxContent.innerHTML = heroCard.innerHTML;
            heroLightbox.classList.add('open');
            heroLightbox.setAttribute('aria-hidden', 'false');
            document.body.classList.add('lightbox-open');
            heroLightboxClose.focus();
        };

        const closeHeroLightbox = () => {
            heroLightbox.classList.remove('open');
            heroLightbox.setAttribute('aria-hidden', 'true');
            document.body.classList.remove('lightbox-open');
            heroCard.focus({ preventScroll: true });
        };

        heroCard.addEventListener('click', openHeroLightbox);
        heroCard.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                openHeroLightbox();
            }
        });

        heroLightboxClose.addEventListener('click', closeHeroLightbox);
        heroLightbox.addEventListener('click', (e) => {
            if (e.target === heroLightbox) closeHeroLightbox();
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && heroLightbox.classList.contains('open')) {
                closeHeroLightbox();
            }
        });
    };

    window.WordOutUtils.onReady(init);
})();
