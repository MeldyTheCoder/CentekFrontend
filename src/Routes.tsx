import {BrowserRouter, Routes, Route} from 'react-router-dom';
import { Main } from './pages/Main/Main';
import { AboutUs } from './pages/AboutUs/AboutUs';
import { Login } from './pages/Login/Login';
import { Registration } from './pages/Registration/Registration';
import { EmailConfirmation } from './pages/EmailConfirmation/EmailConfirmation';
import { ProfileEditor } from './pages/ProfileEditor/ProfileEditor';
import { Doctors } from './pages/Doctors/Doctors';
import { RestrictAuthenticated } from './providers/AuthProvider';
import { ActivateAccount } from './pages/UserActivate/UserActivate';
import RequireAuth from '@auth-kit/react-router/RequireAuth'
import { Pacients } from './pages/Pacients/Pacients';

const Authorized = ({children}: any) => (
  <RequireAuth fallbackPath='/login/'>
    {children}
  </RequireAuth>
)


const AProfileEditor = () => (
  <Authorized>
    <ProfileEditor />
  </Authorized>
)


const ADoctors = () => (
  <Authorized>
    <Doctors />
  </Authorized>
)

const APacients = () => (
  <Authorized>
    <Pacients />
  </Authorized>
)

const RLogin = () => (
  <RestrictAuthenticated>
    <Login />
  </RestrictAuthenticated>
)

const RRegistration = () => (
  <RestrictAuthenticated>
    <Registration />
  </RestrictAuthenticated>
)

const RActivateAccount = () => (
  <RestrictAuthenticated>
    <ActivateAccount />
  </RestrictAuthenticated>
)


export function ProjectRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' Component={Main}/>
        <Route path='/about-us/' Component={AboutUs}/>
        <Route path='/login/' Component={RLogin} />
        <Route path='/registration/' Component={RRegistration} />
        <Route path='/email-verification/' Component={EmailConfirmation} />
        <Route path='/profile/' Component={AProfileEditor} />
        <Route path='/doctors/' Component={ADoctors} />
        <Route path="/activate/:uid/:token/" Component={RActivateAccount} />
        <Route path='/pacients/' Component={APacients} />
      </Routes>
    </BrowserRouter>
  );
}