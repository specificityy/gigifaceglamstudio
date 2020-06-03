import React from 'react'; // eslint-disable-line
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import styled from '@emotion/styled';
import { ThemeProvider } from 'emotion-theming';
/** @jsx jsx */
import { jsx, css, keyframes } from '@emotion/core';
import kebabCase from 'lodash/kebabCase';

import { PreviewCompatibleBackgroundImage } from '../components/PreviewCompatibleBackgroundImage';
import theme from '../components/theme';

export const HomePageTemplate = ({ pageName, heading, description, backgroundHome }) => {
    return (
        <ThemeProvider theme={theme}>
            <h1>Hello Nuna</h1>
        </ThemeProvider>
    );
};

const BackgroundImage = styled(PreviewCompatibleBackgroundImage)`
    width: 100%;
    height: 100%;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
`;

HomePageTemplate.propTypes = {
    pageName: PropTypes.string,
    heading: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    backgroundHome: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
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
                pageName
                heading
                description
            }
        }
    }
`;
