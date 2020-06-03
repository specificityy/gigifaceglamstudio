import { useEffect, useRef, useState } from 'react';

export const useIntersection = ({ root = null, rootMargin, threshold = 0 }) => {
    const [entry, updateEntry] = useState(null);
    const [node, setNode] = useState(null);

    useEffect(() => {
        if (!node) return;

        const observer = new window.IntersectionObserver(([entry]) => updateEntry(entry), {
            root,
            rootMargin,
            threshold,
        });

        observer.disconnect();
        observer.observe(node);

        return () => {
            observer.disconnect();
        };
    }, [node]);

    return [setNode, entry];
};
