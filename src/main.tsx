import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider
} from 'react-router-dom';

import App from './app/app';
import { Pokemon } from './pages/Pokemon';
import { Home } from './pages/Home';
import { PokedexContextProvider } from './context/PokedexContextProvider';
import './styles/index.scss'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <Home />
      },
      {
        path: 'pokemon/:id',
        element: <Pokemon />
      },
    ]
  }
])

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <StrictMode>
    <PokedexContextProvider>
      <RouterProvider router={router} />
    </PokedexContextProvider>
  </StrictMode>
);
