import CMS from 'netlify-cms-app';

import { withStyled } from './withStyled';
import AboutPagePreview from './preview-templates/AboutPagePreview';
import ProductPagePreview from './preview-templates/ProductPagePreview';
import ServicesPagePreview from './preview-templates/ServicesPagePreview';
import HomePagePreview from './preview-templates/HomePagePreview';
import FooterPreview from './preview-templates/FooterPreview';

CMS.registerPreviewTemplate('home', withStyled(HomePagePreview));
CMS.registerPreviewTemplate('footer', withStyled(FooterPreview));
CMS.registerPreviewTemplate('about', withStyled(AboutPagePreview));
CMS.registerPreviewTemplate('products', withStyled(ProductPagePreview));
CMS.registerPreviewTemplate('services', withStyled(ServicesPagePreview));
