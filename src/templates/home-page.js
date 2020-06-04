import React, { useEffect, useRef, useState } from 'react'; // eslint-disable-line
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
import InstagramIcon from '../img/social/instagram.svg';
import YouTubeIcon from '../img/social/youtube.svg';
import MirrorSvg from '../img/dressing-room-mirror.svg';

const thresholdArray = Array.from(Array(20).keys(), i => i / 20);

export const HomePageTemplate = ({ heading, description, pictures }) => {
    // console.log(pictures);
    const content = useRef(null);

    const [pos, setPos] = useState('');

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
                <h1 style={{ position: 'fixed', left: '10vw', top: '100px' }}>{pos}</h1>
                <SlidesShow>
                    <WhoAmI />
                    <Mirror />

                    {pictures.map(pic => (
                        <Picture key={uuidv4()} image={pic.image} caption={pic.caption} />
                    ))}
                    <WhoAmI />
                </SlidesShow>
            </Container>
        </ThemeProvider>
    );
};

const Mirror = styled(MirrorSvg)`
    height: 125vh;
    position: fixed;
    left: 50%;
    transform: translateX(-50%) scale(0.7);
    z-index: 10;
    box-shadow: 0px 11px 15px -7px rgba(250, 250, 50, 0.2), 0px 24px 38px 3px rgba(250, 250, 50, 0.14),
        0px 9px 48px 13px rgba(250, 250, 50, 0.12);

    * g {
        rect {
            // display: none;
        }
        path {
        }
    }
`;

const Picture = ({ image, caption }) => {
    const [ref, entry] = useIntersection({
        rootMargin: '0px',
        threshold: thresholdArray,
    });

    const { intersectionRatio = 1 } = entry || {};
    const scale = clamp(intersectionRatio > 0.8 ? 1 : intersectionRatio, 0.9, 1);
    const opacity = clamp(intersectionRatio > 0.6 ? 1 : intersectionRatio, 0.3, 1);

    console.log(caption, scale, intersectionRatio);

    return (
        <>
            <ImageWrapper ref={ref} scale={scale} opacity={scale === 1 ? 0 : 0.5}>
                <BackgroundImage imageInfo={image} />
                <h3>{caption}</h3>
            </ImageWrapper>
            {scale === 1 ? (
                <DisplayedImage>
                    <BackgroundImage imageInfo={image} />
                    <h3>{caption}</h3>
                </DisplayedImage>
            ) : null}
        </>
    );
};

const DisplayedImage = styled.div`
    position: fixed;
    z-index: 10;
    left: 50%;
    transform: translateX(-50%);
`;

const ImageWrapper = styled.div`
    transition: transform 300ms, opacity 1000ms;
    transform: ${props => `scale(${props.scale})`};
    opacity: ${props => `${props.opacity}`};
    will-change: transform;
`;

const BackgroundImage = styled(PreviewCompatibleBackgroundImage)`
    ${props => `
    width: 50vw;
    height: 50vh;
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
    background-image: radial-gradient(#333 1px, transparent 0), radial-gradient(#333 1px, transparent 0);
    background-position: 0 0, 25px 25px;
    background-attachment: fixed;
    background-size: 50px 50px;
    overflow-x: scroll;
    display: flex;

    color: wheat;
    background-color: #1d1d1d;
`;

const SlidesShow = styled.div`
    display: flex;
    align-items: center;
    margin: 0 100px;
    padding-right: 2vw;
    & > * {
        flex: 1 0 auto;
        margin-right: 100px;
    }
`;

const About = styled.div`
    margin-right: 10rem;
    & > * {
        margin-bottom: 1rem;
    }

    h1,
    h2,
    h3 {
        font-weight: 400;
    }
`;

const SocialMedia = styled.h2`
    margin-top: 4rem;
`;

const Instagram = styled(InstagramIcon)`
    width: 80px;
    height: 80px;
    margin-right: 2rem;
`;

const YouTube = styled(YouTubeIcon)`
    width: 100px;
    height: 90px;
`;

const WhoAmI = () => (
    <About>
        <h1>Gigi Face Glam Studio</h1>
        <p>💄 Maquillista profesional 🇩🇴 </p>
        <p>💇Depilación y tintado de cejas </p>
        <p>♦️Postura de Pestañas </p>
        <p>🔶Depilación corporal </p>
        <p>youtu.be/7GsteKPkL-E</p>
        <SocialMedia>
            Follow me on
            <br />
            <br />
            <Instagram />
            <YouTube />
        </SocialMedia>
    </About>
);

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
