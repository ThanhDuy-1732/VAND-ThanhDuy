/**
 * plugins/index.ts
 *
 * Automatically included in `./src/main.ts`
 */

// Plugins
import pinia from './pinia';
import vuetify from './vuetify';
import router from '../router/index';
import vueTablerIcons from 'vue-tabler-icons';
import { visibleDirective } from './directive/index';

// Types
import type { App } from 'vue'

export function registerPlugins (app: App) {
  app.use(vuetify)
  .use(pinia)
  .use(router)
  .use(vueTablerIcons)

  app.directive('visible', visibleDirective)
}
