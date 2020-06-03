import { useEffect, useRef, useState } from 'react';

export const useIntersection = ({ root = null, rootMargin, threshold = 0 }) => {
    const [entry, updateEntry] = useState(null);
    const [node, setNode] = useState(null);

    const observer = useRef(
        new window.IntersectionObserver(([entry]) => updateEntry(entry), {
            root,
            rootMargin,
            threshold,
        })
    );

    useEffect(() => {
        if (!node) return;

        const { current: currentObserver } = observer;

        currentObserver.disconnect();
        currentObserver.observe(node);

        return () => {
            currentObserver.disconnect();
        };
    }, [node, observer]);

    return [setNode, entry];
};
