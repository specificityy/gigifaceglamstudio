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
                    {/* <Frame /> */}
                    <Mirror />

                    {pictures.map(pic => (
                        <Picture key={uuidv4()} image={pic.image} caption={pic.caption} />
                    ))}
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
    box-shadow: ${props => props.theme.shadows[24]};

    * g {
        rect {
            // display: none;
        }
        path {
        }
    }
`;

const Frame = styled(props => {
    return (
        <div className="hero-home-oct-19__website__wrapper scroll-in" {...props}>
            <div className="browser-dots">
                <div className="dot one"></div>
                <div className="dot two"></div>
                <div className="dot three"></div>
            </div>
            <div className="frame-border">
                <div className="border__top"></div>
                <div className="border__right"></div>
                <div className="border__bottom"></div>
                <div className="border__left"></div>
            </div>
        </div>
    );
})`
    width: 60vw;
    height: 65vh;
    position: fixed;
    left: 50%;
    transform: translateX(-50%);
    z-index: 10;

    & .frame-border {
        box-shadow: inset 0 0 0 15px #ddd;
        position: absolute;
        height: 100%;
        width: 100%;
    }

    & .browser-dots {
    }

    & .dot {
        height: 20px;
        width: 20px;
        margin-right: 7px;
        background-color: #ddd;
        border-radius: 50%;
        display: inline-block;

        & .one {
        }
    }
`;

const Picture = ({ image, caption }) => {
    const [ref, entry] = useIntersection({
        rootMargin: '-5%',
        threshold: thresholdArray,
    });

    const { intersectionRatio = 1 } = entry || {};
    const scale = clamp(intersectionRatio > 0.6 ? 1 : intersectionRatio, 0.9, 1);
    const opacity = clamp(intersectionRatio > 0.6 ? 1 : intersectionRatio, 0.3, 1);

    console.log(caption, scale, intersectionRatio);

    return (
        <ImageWrapper ref={ref} scale={scale} opacity={opacity}>
            <BackgroundImage imageInfo={image} style={{ borderRadius: '10px' }} />
            <h3>{caption}</h3>
        </ImageWrapper>
    );
};

const ImageWrapper = styled.div`
    transition: transform 1000ms, opacity 1000ms;
    transform: ${props => `scale(${props.scale})`};
    opacity: ${props => `${props.opacity}`};
    will-change: transform;
`;

const BackgroundImage = styled(PreviewCompatibleBackgroundImage)`
    ${props => `
    width: 55vw;
    height: 55vh;
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
    background-color: palevioletred;
    overflow-x: scroll;
    display: flex;
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
