(() => {
    const init = () => {
        const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        let showAfter = false;

        const applyHeroToggle = () => {
            document.querySelectorAll('.hero-toggle-card').forEach((card) => {
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
    };

    window.WordOutUtils.onReady(init);
})();
