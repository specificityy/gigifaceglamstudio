import React from 'react';
import PropTypes from 'prop-types';

import { HomePageTemplate } from '../../templates/home-page';

const HomePagePreview = ({ entry, getAsset }) => {
    return (
        <HomePageTemplate
            pageName={entry.getIn(['data', 'pageName'])}
            heading={entry.getIn(['data', 'heading'])}
            description={entry.getIn(['data', 'description'])}
            backgroundHome={getAsset(entry.getIn(['data', 'backgroundHome']))}
        />
    );
};

HomePagePreview.propTypes = {
    entry: PropTypes.shape({
        getIn: PropTypes.func,
    }),
    getAsset: PropTypes.func,
};

export default HomePagePreview;
