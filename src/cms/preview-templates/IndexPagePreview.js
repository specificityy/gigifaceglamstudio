import React from 'react';
import PropTypes from 'prop-types';

import IndexPage from '../../templates/index-page';

const IndexPagePreview = ({ entry }) => {
    const data = entry.getIn(['data']).toJS();

    if (data) {
        return <IndexPage />;
    } else {
        return <div>Loading...</div>;
    }
};

IndexPagePreview.propTypes = {
    entry: PropTypes.shape({
        getIn: PropTypes.func,
    }),
};

export default IndexPagePreview;
