import { createBrowserRouter, Navigate } from 'react-router-dom';
import { EDITOR_TABS } from '@features/editor';
import { Layout } from '@components';
import { Placeholder } from './features/editor/views';

const routes = Object.entries(EDITOR_TABS).map(([tabId, tab]) => {
  if (tab.subtabs) {
    const subtabEntries = Object.entries(tab.subtabs);
    const firstSubtabRoute = subtabEntries[0][1].route;
    return {
      path: tab.route,
      children: [
        { index: true, element: <Navigate to={firstSubtabRoute} replace /> },
        ...subtabEntries.map(([_, subtab]) => ({
          path: subtab.route,
          element: subtab.element ?? <Placeholder />,
        })),
      ],
    };
  }
  return {
    path: tab.route,
    element: tab.element ?? <Placeholder />,
  };
});

export const router = createBrowserRouter([
  {
    path: '',
    element: <Layout />,
    children: [
      { index: true, element: <Navigate to="/home" replace /> },
      ...routes,
      { path: '*', element: <Navigate to="/home" replace /> },
    ],
  },
]);
