import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router';

import { HomeLayout, PlatformLayout } from '~/layouts';
import { FeedPage, GenealogyPage, HomePage, TimelinePage } from '~/pages';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: HomeLayout,
    children: [
      {
        path: '/',
        component: HomePage,
      },
    ],
  },
  {
    path: '/*',
    component: PlatformLayout,
    children: [
      {
        path: '/feed',
        component: FeedPage,
      },
      {
        path: '/timeline',
        component: TimelinePage,
      },
      {
        path: '/genealogy',
        component: GenealogyPage,
      },
    ],
  },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});
