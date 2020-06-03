import CMS from 'netlify-cms-app';

import { withStyled } from './withStyled';
import HomePagePreview from './preview-templates/HomePagePreview';

CMS.registerPreviewTemplate('home', withStyled(HomePagePreview));
