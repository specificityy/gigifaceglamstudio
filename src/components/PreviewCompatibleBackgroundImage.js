import React from 'react';
import PropTypes from 'prop-types';
import BackgroundImage from 'gatsby-background-image';

export const PreviewCompatibleBackgroundImage = ({ imageInfo, className, style }) => {
    const { childImageSharp = {} } = imageInfo;

    return (
        <BackgroundImage
            Tag="div"
            className={className}
            fluid={childImageSharp.fluid}
            backgroundColor={`#040e18`}
            style={style}
        />
    );
};

PreviewCompatibleBackgroundImage.propTypes = {
    imageInfo: PropTypes.shape({
        alt: PropTypes.string,
        childImageSharp: PropTypes.object,
        image: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
        style: PropTypes.object,
    }).isRequired,
};
