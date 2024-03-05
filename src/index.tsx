import {StrictMode, useReducer} from 'react';
import { createRoot } from 'react-dom/client';

import { App } from './App';
import { StoreProvider } from "./useStore";

const root = createRoot(document.getElementById('app'));

root.render(
  <StrictMode>
      <StoreProvider>
          <App />
      </StoreProvider>
  </StrictMode>
);
