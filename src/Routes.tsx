import {BrowserRouter, Routes, Route} from 'react-router-dom';
import { Main } from './pages/Main/Main';
import { AboutUs } from './pages/AboutUs/AboutUs';
import { Login } from './pages/Login/Login';
import { Registration } from './pages/Registration/Registration';
import { EmailConfirmation } from './pages/EmailConfirmation/EmailConfirmation';
import { ProfileEditor } from './pages/ProfileEditor/ProfileEditor';
import { ProfileSecurity } from './pages/ProfileSecurity/ProfileSecurity';
import { Search } from './pages/Search/Search';


export function ProjectRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' Component={Main}/>
        <Route path='/about-us/' Component={AboutUs}/>
        <Route path='/login/' Component={Login} />
        <Route path='/registration/' Component={Registration} />
        <Route path='/email-verification/' Component={EmailConfirmation} />
        <Route path='/profile/' Component={ProfileEditor} />
        <Route path='/search/' Component={Search} />
      </Routes>
    </BrowserRouter>
  );
}