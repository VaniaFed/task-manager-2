import { merge } from 'webpack-merge';

import baseConfig from './webpack/webpack-config';
import appConfig from './webpack/webpack-app-config';
import prodConfig from './webpack/webpack-prod-config';
import aliasConfig from './webpack/webpack-alias-config';

export default merge([baseConfig, appConfig, prodConfig, aliasConfig]);
