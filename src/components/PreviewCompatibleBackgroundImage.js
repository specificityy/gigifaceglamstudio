import React from 'react';
import PropTypes from 'prop-types';
import BackgroundImage from 'gatsby-background-image';

export const PreviewCompatibleBackgroundImage = ({ imageInfo, className, style }) => {
    if (typeof imageInfo === 'undefined') return null;

    if (typeof imageInfo === 'string' || typeof imageInfo.childImageSharp === 'undefined') {
        return (
            <div
                style={{
                    backgroundImage: `url(${imageInfo.src || imageInfo})`,
                    ...style,
                }}
                className={className}
            />
        );
    }

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
