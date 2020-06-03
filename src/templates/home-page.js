import React, { useEffect, useRef } from 'react'; // eslint-disable-line
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import styled from '@emotion/styled';
import { ThemeProvider } from 'emotion-theming';
/** @jsx jsx */
import { jsx, css, keyframes } from '@emotion/core';
import { v4 as uuidv4 } from 'uuid';
import clamp from 'lodash/clamp';

import { PreviewCompatibleBackgroundImage } from '../components/PreviewCompatibleBackgroundImage';
import theme from '../components/theme';
import { useIntersection } from '../components/useIntersection';

const thresholdArray = Array.from(Array(20).keys(), i => i / 20);

export const HomePageTemplate = ({ heading, description, pictures }) => {
    console.log(pictures);
    const content = useRef(null);

    useEffect(() => {
        window.addEventListener('mousewheel', mouseWheelHandler);

        function mouseWheelHandler(e) {
            if (content.current === undefined) {
                content.current = window.document.body;
            } else {
                content.current.scrollLeft += e.deltaY;
            }
        }

        return () => {
            window.removeEventListener('mousewheel', mouseWheelHandler);
        };
    }, [content]);

    return (
        <ThemeProvider theme={theme}>
            <Container ref={content}>
                <SlidesShow>
                    <h1>
                        Gigi Face Glam Studio <br />
                        <br />
                        💄 Maquillista profesional 🇩🇴 <br />
                        <br />
                        💇Depilación y tintado de cejas <br />
                        <br />
                        ♦️Postura de Pestañas <br />
                        <br />
                        🔶Depilación corporal <br />
                        <br />
                        youtu.be/7GsteKPkL-E
                    </h1>

                    {pictures.map(pic => (
                        <Picture key={uuidv4()} image={pic.image} caption={pic.caption} />
                    ))}
                </SlidesShow>
            </Container>
        </ThemeProvider>
    );
};

const Picture = ({ image, caption }) => {
    const [ref, entry] = useIntersection({
        rootMargin: '-5%',
        threshold: thresholdArray,
    });

    const scale = clamp(entry?.intersectionRatio > 0.6 ? 1 : entry?.intersectionRatio, 0.9, 1);

    console.log(caption, scale, entry?.intersectionRatio);

    const style = {
        // transform
    };

    return (
        <ImageWrapper ref={ref} scale={scale}>
            <BackgroundImage imageInfo={image} style={{ borderRadius: '10px' }} />
            <h3>{caption}</h3>
        </ImageWrapper>
    );
};

const ImageWrapper = styled.div`
    transition: transform 1000ms;
    transform: ${props => `scale(${props.scale})`};
    will-change: transform;
`;

const BackgroundImage = styled(PreviewCompatibleBackgroundImage)`
    ${props => `
    width: 65vw;
    height: 65vh;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    box-shadow: 0 30px 60px rgba(0,0,0,0.12);
    box-shadow: ${props.theme.shadows[24]};
    border-radius: 10px;
    margin-bottom: 30px;
`}
`;

const Container = styled.main`
    height: 100vh;
    background-image: radial-gradient(#ddd 1px, transparent 0), radial-gradient(#ddd 1px, transparent 0);
    background-position: 0 0, 25px 25px;
    background-attachment: fixed;
    background-size: 50px 50px;
    overflow-x: scroll;
    display: flex;
`;

const SlidesShow = styled.div`
    display: flex;
    align-items: center;
    margin: 0 100px;
    padding-right: 20vw;
    & > * {
        flex: 1 0 auto;
        margin-right: 100px;
    }
`;

HomePageTemplate.propTypes = {
    heading: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    pictures: PropTypes.any,
};

const HomePage = ({ data }) => {
    const { frontmatter } = data.markdownRemark;
    return <HomePageTemplate {...frontmatter} />;
};

HomePage.propTypes = {
    data: PropTypes.object.isRequired,
};

export default HomePage;

export const homePageQuery = graphql`
    query HomePage($id: String!) {
        markdownRemark(id: { eq: $id }) {
            html
            frontmatter {
                heading
                description
                pictures {
                    caption
                    description
                    image {
                        childImageSharp {
                            fluid(maxWidth: 2000, quality: 90) {
                                ...GatsbyImageSharpFluid
                            }
                        }
                    }
                }
            }
        }
    }
`;
