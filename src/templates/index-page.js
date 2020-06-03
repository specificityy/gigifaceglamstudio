import React from 'react';

import Layout from '../components/Layout';
import { HomePage } from '../components/HomePage';
import { ProductsPage } from '../components/ProductsPage';
import { ServicesPage } from '../components/ServicesPage';
import { AboutPage } from '../components/AboutPage';

const IndexPage = () => {
    return (
        <Layout>
            <HomePage />
            <AboutPage />
            <ProductsPage />
            <ServicesPage />
        </Layout>
    );
};

export default IndexPage;
