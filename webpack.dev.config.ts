import { merge } from 'webpack-merge';

import baseConfig from './webpack/webpack-config';
import appConfig from './webpack/webpack-app-config';
import devConfig from './webpack/webpack-dev-config';
import devserverConfig from './webpack/webpack-devserver-config';
import aliasConfig from './webpack/webpack-alias-config';

export default merge([baseConfig, appConfig, devConfig, devserverConfig, aliasConfig]);
