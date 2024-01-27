import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import App from './App';
import SearchBooks from './pages/SearchBooks';
import LoginForm from './components/LoginForm';
import SignupForm from './components/SignupForm';
import SavedBooks from './pages/SavedBooks';

const routes = [
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <SearchBooks /> },
      { path: '/login', element: <LoginForm /> },
      { path: '/signup', element: <SignupForm /> },
      { path: '/savedbooks', element: <SavedBooks /> },
    ],
  },
];

const router = createBrowserRouter(routes);

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
);