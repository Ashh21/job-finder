import './App.css';
import { Outlet, createBrowserRouter } from 'react-router-dom'
import { Authentication } from './components/authentication/Authentication';
import { AddJob } from './components/addjob/AddJob';
import { ViewJob } from './components/viewjob/ViewJob';

const App = () => {
  return (
    <div className="App">
      <Outlet />
    </div>
  );
}

const appRouter = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <Authentication />,
      },
      {
        path: '/addJob',
        element: <AddJob />
      },
      {
        path: '/viewJob/:jobId',
        element: <ViewJob />
      }
    ]
  }
])

export { App, appRouter };
