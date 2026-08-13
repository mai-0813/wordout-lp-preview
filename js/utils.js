(function () {
    const onReady = (callback) => {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', callback, { once: true });
            return;
        }
        callback();
    };

    const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

    const setActiveState = (root, selector, isActive, className = 'active') => {
        root?.querySelectorAll(selector).forEach((element) => {
            element.classList.toggle(className, isActive);
        });
    };

    const setScrollLock = (locked) => {
        const body = document.body;
        const root = document.documentElement;

        if (locked) {
            body.classList.add('lightbox-open');
            body.classList.add('feature-lightbox-locked');
            return;
        }

        body.classList.remove('lightbox-open');
        body.classList.remove('feature-lightbox-locked');
        body.style.top = '';
        root.style.scrollBehavior = '';
    };

    const setElementSize = (element, width, height) => {
        if (!element) return;
        if (typeof width !== 'undefined') {
            element.style.setProperty('width', `${width}px`, 'important');
        }
        if (typeof height !== 'undefined') {
            element.style.setProperty('height', `${height}px`, 'important');
        }
    };

    window.WordOutUtils = {
        onReady,
        clamp,
        setActiveState,
        setScrollLock,
        setElementSize,
    };
})();
