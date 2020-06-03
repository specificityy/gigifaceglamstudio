import PropTypes from 'prop-types';
import styled from '@emotion/styled';

const PERSPECTIVE = '1';

export const Parallax = styled.main`
    perspective: ${PERSPECTIVE}px;
    height: 100vh;
    overflow-x: hidden;
    overflow-y: auto;
    perspective-origin-x: 100%;
`;

export const ParallaxGroup = styled.div`
    position: relative;
    height: 100vh;
    transform-style: preserve-3d;
`;

export const ParallaxLayer = styled.div`
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    transform-origin-x: 100%;
    transform: ${props => layerVariants[props.variant]};
`;

// scale = 1 + (translateZ * -1) / perspective
const calcScale = translateZ => 1 + (translateZ * -1) / PERSPECTIVE;

const layerVariants = {
    base: 'translateZ(0);',
    back: `translateZ(-0.25px) scale(${calcScale(-0.25)});`,
    deep: `translateZ(-0.5px) scale(${calcScale(-0.5)});`,
};

ParallaxLayer.propTypes = {
    variant: PropTypes.oneOf(['base', 'back', 'deep']),
};
