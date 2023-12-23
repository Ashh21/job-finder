import './App.css';
import { Outlet, createBrowserRouter } from 'react-router-dom'
import { AddJob } from './components/addjob/AddJob';
import { ViewJob } from './components/viewjob/ViewJob';
import { Home } from './components/home/Home';
import { SignUp } from './components/authentication/SignUp';
import { Login } from './components/authentication/Login';

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
        element: <SignUp />,
      },
      {
        path: '/login',
        element: <Login />,
      },
      {
        path: '/jobs',
        element: <Home />
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
