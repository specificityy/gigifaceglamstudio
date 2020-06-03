import React from 'react';
import PropTypes from 'prop-types';

import { HomePageTemplate } from '../../templates/home-page';

const HomePagePreview = ({ entry }) => {
    const entryPictures = entry.getIn(['data', 'pictures']);
    const pictures = entryPictures ? entryPictures.toJS() : [];

    return (
        <HomePageTemplate
            heading={entry.getIn(['data', 'heading'])}
            description={entry.getIn(['data', 'description'])}
            pictures={pictures}
        />
    );
};

HomePagePreview.propTypes = {
    entry: PropTypes.shape({
        getIn: PropTypes.func,
    }),
};

export default HomePagePreview;
