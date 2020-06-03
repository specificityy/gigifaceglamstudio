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
                        backgroundHome {
                            childImageSharp {
                                fluid(maxWidth: 2000, quality: 50) {
                                    ...GatsbyImageSharpFluid
                                }
                            }
                        }
                    }
                }
            }
        `
    ).markdownRemark.frontmatter;
};
