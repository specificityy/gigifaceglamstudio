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
        `
    ).markdownRemark.frontmatter;
};
