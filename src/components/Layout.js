import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { withPrefix } from 'gatsby';
/** @jsx jsx */
import { Global, css, jsx } from '@emotion/core';
import styled from '@emotion/styled';
import { BackTop } from 'antd';

import { cssReset } from './cssReset';
import useSiteMetadata from './SiteMetadata';
import { Parallax } from './Parallax';
import { Footer } from '../components/Footer';
import Navbar from '../components/Navbar';

const vw = v => {
    const w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
    return (v * w) / 100;
};

const maxNavbarWidth = 400;

const TemplateWrapper = ({ children }) => {
    const { title, description } = useSiteMetadata();
    const [navOpen, setNavOpen] = useState(false);
    const contentRef = React.useRef(null);

    const handleNavOpen = () => setNavOpen(true);
    const handleNavClose = () => setNavOpen(false);

    return (
        <>
            <Helmet>
                <html lang="en" />
                <title>{title}</title>
                <meta name="description" content={description} />

                <link rel="apple-touch-icon" sizes="180x180" href={`${withPrefix('/')}img/apple-touch-icon.png`} />
                <link rel="icon" type="image/png" href={`${withPrefix('/')}img/favicon-32x32.png`} sizes="32x32" />
                <link rel="icon" type="image/png" href={`${withPrefix('/')}img/favicon-16x16.png`} sizes="16x16" />

                <link rel="mask-icon" href={`${withPrefix('/')}img/safari-pinned-tab.svg`} color="#ff4400" />
                <meta name="theme-color" content="#fff" />

                <meta property="og:type" content="business.business" />
                <meta property="og:title" content={title} />
                <meta property="og:url" content="/" />
                <meta property="og:image" content={`${withPrefix('/')}img/og-image.jpg`} />
            </Helmet>
            <GlobalStyles />

            <Navbar
                onOpen={handleNavOpen}
                onClose={handleNavClose}
                open={navOpen}
                maxWidth={maxNavbarWidth}
                contentRef={contentRef}
            />

            <StyledContent navOpen={navOpen} ref={contentRef}>
                {children}
                <Footer />

                <BackTop name="back-top">
                    <StyledUp>UP</StyledUp>
                </BackTop>
            </StyledContent>
        </>
    );
};

const StyledContent = styled(Parallax)`
    background: white;
    color: #1c1c1c;
    transition: transform 300ms;
    ${props => (props.navOpen ? `transform: translateX(-${Math.min(maxNavbarWidth, vw(40))}px);` : '')}
`;

const StyledUp = styled.div`
    height: 40px;
    width: 40px;
    line-height: 40px;
    border-radius: 4px;
    background-color: #1088e9;
    color: #fff;
    text-align: center;
    font-size: 14px;
`;

export const GlobalStyles = () => {
    return (
        <Global
            styles={css`
                @import url('https://fonts.googleapis.com/css2?family=Quicksand:wght@100;300;400;700;800&display=swap');
                ${cssReset}
                * {
                    font-family: 'Quicksand', sans-serif;
                }
            `}
        />
    );
};

export default TemplateWrapper;
