import React, { useEffect, useRef, useState } from 'react'; // eslint-disable-line
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import styled from '@emotion/styled';
import { ThemeProvider } from 'emotion-theming';
/** @jsx jsx */
import { jsx, css, keyframes } from '@emotion/core';
import { v4 as uuidv4 } from 'uuid';
import clamp from 'lodash/clamp';
import debounce from 'lodash/debounce';
import { BehaviorSubject } from 'rxjs';

import { PreviewCompatibleBackgroundImage } from '../components/PreviewCompatibleBackgroundImage';
import theme from '../components/theme';
import { useIntersection } from '../components/useIntersection';
import InstagramIcon from '../img/social/instagram.svg';
import YouTubeIcon from '../img/social/youtube.svg';
import MirrorSvg from '../img/dressing-room-mirror.svg';

const thresholdArray = [0.4]; //Array.from(Array(10).keys(), i => i / 10);

const activeSlide$ = new BehaviorSubject(5);
let _active = 1000;
let _pictures;

const BASE_ZINDEX = 10;

const render = () => {
    for (let i = 0; i < _pictures.length; i++) {
        const pic = _pictures[i];
        const bgImage = pic.querySelector('.bg-image');

        if (i === _active) {
            pic.style.marginLeft = '-8%';
            bgImage.style.transform = 'rotateY(0)';
            pic.style.zIndex = BASE_ZINDEX + _pictures.length;
        } else if (i < _active) {
            pic.style.marginLeft = '-8%';
            bgImage.style.transform = 'rotateY(130deg) scaleX(0.5)';
            bgImage.style.transformOrigin = 'left';
            pic.style.zIndex = BASE_ZINDEX + i;
        } else {
            pic.style.marginLeft = '-10%';
            bgImage.style.transform = 'rotateY(-9deg)';
            bgImage.style.transformOrigin = 'right';
            pic.style.zIndex = BASE_ZINDEX + (_pictures.length - i);
        }
    }
};

export const HomePageTemplate = ({ heading, description, pictures }) => {
    // console.log(pictures);
    const content = useRef(null);
    const slideShow = useRef(null);
    const [active, setActive] = useState(5);

    useEffect(() => {
        // window.addEventListener('mousewheel', mouseWheelHandler);

        // function mouseWheelHandler(e) {
        //     if (content.current === undefined) {
        //         content.current = window.document.body;
        //     } else {
        //         content.current.scrollLeft += e.deltaY;
        //     }
        // }

        _pictures = Array.prototype.slice.call(window.document.querySelectorAll('.picture'));
        // _index = Math.floor(_pictures.length / 2);

        // // render();

        // console.log(_pictures);

        // window.setTimeout(() => {
        //     content.current.addEventListener('scroll', handleScroll);
        //     console.log(content.current);
        // });

        // const handleScroll = debounce(e => {
        //     console.log(e);
        // }, 300);

        activeSlide$.subscribe(active => {
            console.log(active);
            _active = active;
            render();
        });

        return () => {
            // window.removeEventListener('mousewheel', mouseWheelHandler);
            // content.current.removeEventListener('scroll', handleScroll);
        };
    }, [content]);

    return (
        <ThemeProvider theme={theme}>
            <Container ref={content}>
                {/* <Mirror /> */}

                <SlideShow ref={slideShow}>
                    <WhoAmI />

                    {pictures.map((pic, index) => (
                        <Picture key={uuidv4()} image={pic.image} caption={pic.caption} index={index} />
                    ))}

                    <WhoAmI />
                </SlideShow>
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

const Picture = ({ image, caption, index }) => {
    const imageRef = useRef(null);

    const [ref, entry] = useIntersection({
        rootMargin: '0px',
        threshold: thresholdArray,
    });

    const { intersectionRatio = 1 } = entry || {};
    const scale = clamp(intersectionRatio > 0.8 ? 1 : intersectionRatio, 0.5, 1);
    const opacity = clamp(intersectionRatio > 0.6 ? 1 : intersectionRatio, 0.3, 1);

    const visible = intersectionRatio > 0.4;

    console.log({ caption, intersectionRatio });

    if (visible) {
        activeSlide$.next(index);
    }

    return (
        <ImageWrapper ref={ref} scale={0.8} active={_active === index} before={index < _active} className="picture">
            <BackgroundImage imageInfo={image} className="bg-image" />
            <h3>{caption}</h3>
        </ImageWrapper>
    );
};

const ImageWrapper = styled.div`
    perspective: 600px;
    transition: transform 300ms, opacity 1000ms;
    transform: ${props => `scale(${props.scale})`};

    scroll-snap-align: start;

    ${props => {
        // if (props.active)
        //     return `
        //     margin-left: -8%;
        // `;
        // if (props.before) return 'margin-left: -8%;';
        // return `
        //     margin-left: -10%;
        // `;
    }}

    & > * {
        transform-style: preserve-3d;
        will-change: transform;
        transition: transform 500ms;

        // -webkit-box-reflect: below 0;
        // -webkit-gradient(linear, left top, left bottom, from(transparent), color-stop(0.3, transparent), to(white));

        ${props => {
            // if (props.active) return `transform: rotateY(0);`;
            // if (props.before)
            //     return `
            //         transform: rotateY(130deg) scaleX(0.5);
            //         transform-origin: left;
            //     `;
            // return `
            //     transform: rotateY(-9deg);
            //     transform-origin: right;
            // `;
        }}
    }
`;

const BackgroundImage = styled(PreviewCompatibleBackgroundImage)`
    ${props => `
    width: 40vw;
    height: 40vh;
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

    scroll-snap-type: x mandatory;
`;

const SlideShow = styled.div`
    display: flex;
    align-items: center;
    margin: 0 100px;
    padding-right: 2vw;
    & > * {
        flex: 1 0 auto;
        margin-right: -25%;

        &:nth-of-type(2) {
            // margin-left: -35%;
        }
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
