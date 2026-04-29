import { useRef } from 'react';

export default function LongPressButton({ onClick, onLongPress, onLongPressEnd, children, disabled, className }) {
    const timerRef = useRef(null);
    const isLongPress = useRef(false);

    const startPress = () => {
        if (disabled) return;
        isLongPress.current = false;
        timerRef.current = setTimeout(() => {
            isLongPress.current = true;
            if (onLongPress) onLongPress();
        }, 500);
    };

    const endPress = () => {
        if (timerRef.current) {
            clearTimeout(timerRef.current);
            timerRef.current = null;
        }
        if (isLongPress.current) {
            if (onLongPressEnd) onLongPressEnd();
        } else if (!disabled) {
            if (onClick) onClick();
        }
    };

    return (
        <button
            onMouseDown={startPress}
            onMouseUp={endPress}
            onMouseLeave={endPress}
            onTouchStart={startPress}
            onTouchEnd={(e) => { if (e.cancelable) e.preventDefault(); endPress(); }}
            disabled={disabled}
            className={`${className} touch-manipulation`}
        >
            {children}
        </button>
    );
}
