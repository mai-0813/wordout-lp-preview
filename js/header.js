(() => {
    const init = () => {
        const header = document.querySelector('header');
        if (!header) return;

        let lastY = window.scrollY;
        let ticking = false;

        const updateHeader = () => {
            const y = window.scrollY;
            if (y <= 20 || y < lastY - 5) {
                header.classList.remove('header-hidden');
            } else if (y > lastY + 5 && y > 90) {
                header.classList.add('header-hidden');
            }
            lastY = y;
            ticking = false;
        };

        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(updateHeader);
                ticking = true;
            }
        }, { passive: true });
    };

    window.WordOutUtils.onReady(init);
})();
