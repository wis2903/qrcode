const pow = Math.pow;

// The easing function that makes the scroll decelerate over time
const easeOutQuart = (x: number): number => {
    return 1 - pow(1 - x, 4);
};

export const animateScroll = ({
    el,
    target,
    duration = 1200,
}: {
    el?: HTMLDivElement;
    target: number;
    duration?: number;
}): void => {
    let start: number;
    let position: number;
    let animationFrame: number;

    const _el = el || document.documentElement;

    const initialPosition = _el.scrollTop;
    const maxAvailableScroll = _el.scrollHeight - _el.clientHeight;
    const amountOfPixelsToScroll = initialPosition - target;

    const requestAnimationFrame = window.requestAnimationFrame;
    const cancelAnimationFrame = window.cancelAnimationFrame;

    const step = (timestamp: number): void => {
        if (start === undefined) {
            start = timestamp;
        }

        const elapsed = timestamp - start;

        // this just gives us a number between 0 (start) and 1 (end)
        const relativeProgress = elapsed / duration;

        // ease out that number
        const easedProgress = easeOutQuart(relativeProgress);

        // calculate new position for every thick of the requesAnimationFrame
        position = initialPosition - amountOfPixelsToScroll * Math.min(easedProgress, 1);

        // set the scrollbar position
        _el.scrollTo(0, position);

        // Stop when max scroll is reached
        if (initialPosition !== maxAvailableScroll && _el.scrollTop === maxAvailableScroll) {
            cancelAnimationFrame(animationFrame);
            return;
        }

        // repeat until the end is reached
        if (elapsed < duration) {
            animationFrame = requestAnimationFrame(step);
        }
    };

    animationFrame = requestAnimationFrame(step);
};

// left: 37, up: 38, right: 39, down: 40,
// spacebar: 32, pageup: 33, pagedown: 34, end: 35, home: 36
const keys: Record<number, number> = { 37: 1, 38: 1, 39: 1, 40: 1 };

const preventDefault = (e: Event): void => {
    e.preventDefault();
};

const preventDefaultForScrollKeys = (e: KeyboardEvent): boolean => {
    if (keys[e.keyCode]) {
        preventDefault(e);
        return false;
    }

    return true;
};

// modern Chrome requires { passive: false } when adding event
const supportsPassive = false;
const wheelOpt = supportsPassive ? { passive: false } : false;
const wheelEvent = 'onwheel' in document.createElement('div') ? 'wheel' : 'mousewheel';

// call this to Disable
export const disableScroll = (): void => {
    window.addEventListener('DOMMouseScroll', preventDefault, false); // older FF
    window.addEventListener(wheelEvent, preventDefault, wheelOpt); // modern desktop
    window.addEventListener('touchmove', preventDefault, wheelOpt); // mobile
    window.addEventListener('keydown', preventDefaultForScrollKeys, false);
};

// call this to Enable
export const enableScroll = (): void => {
    window.removeEventListener('DOMMouseScroll', preventDefault, false);
    window.removeEventListener(wheelEvent, preventDefault);
    window.removeEventListener('touchmove', preventDefault);
    window.removeEventListener('keydown', preventDefaultForScrollKeys, false);
};
