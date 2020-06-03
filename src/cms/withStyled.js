import React from 'react';
import { CacheProvider } from '@emotion/core';
import createCache from '@emotion/cache';
import weakMemoize from '@emotion/weak-memoize';

import { GlobalStyles } from '../components/Layout';

const memoizedCreateCacheWithContainer = weakMemoize(container => {
    const newCache = createCache({ container });
    return newCache;
});

// Load styled components css into CMS wysiwyg preview
export const withStyled = Component => props => {
    const iframe = document.querySelector('#nc-root iframe');
    const iframeHeadElem = iframe && iframe.contentDocument.head;

    if (!iframeHeadElem) {
        return null;
    }

    return (
        <CacheProvider value={memoizedCreateCacheWithContainer(iframeHeadElem)}>
            <GlobalStyles />
            <Component {...props} />
        </CacheProvider>
    );
};
