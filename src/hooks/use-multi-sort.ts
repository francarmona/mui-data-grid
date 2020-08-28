import { useState, useEffect } from 'react';

const CONTROL_KEY = 'Control';
const COMMAND_KEY = 'Meta';
const KEY_DOWN = 'keydown';
const KEY_UP = 'keyup';

const useMultiSort = (multiSort: boolean): boolean => {
    const [enabledMultiSort, setEnabledMultiSort] = useState(false);

    const handleKey = (event: KeyboardEvent) => {
        if (event.key === CONTROL_KEY || event.key === COMMAND_KEY) {
            if (event.type === KEY_DOWN) {
                setEnabledMultiSort(true);
            } else if (event.type === KEY_UP) {
                setEnabledMultiSort(false);
            }
        }
    };

    useEffect(() => {
        if (multiSort) {
            document.addEventListener(KEY_DOWN, handleKey);
            document.addEventListener(KEY_UP, handleKey);

            return () => {
                document.removeEventListener(KEY_DOWN, handleKey);
                document.removeEventListener(KEY_UP, handleKey);
            };
        }
        return () => {};
    }, [multiSort]);

    return enabledMultiSort;
};

export default useMultiSort;
