import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';

import { HomePageTemplate } from '../templates/home-page';

export const HomePage = props => <HomePageTemplate {...useHomepage()} {...props} />;

const useHomepage = () => {
    return useStaticQuery(
        graphql`
            {
                markdownRemark(frontmatter: { templateKey: { eq: "home-page" } }) {
                    frontmatter {
                        pageName
                        heading
                        description
                    }
                }
            }
        `
    ).markdownRemark.frontmatter;
};
