import {BrowserRouter, Routes, Route} from 'react-router-dom';
import { Main } from './pages/Main/Main';
import { AboutUs } from './pages/AboutUs/AboutUs';
import { Login } from './pages/Login/Login';
import { Registration } from './pages/Registration/Registration';
import { EmailConfirmation } from './pages/EmailConfirmation/EmailConfirmation';
import { ProfileEditor } from './pages/ProfileEditor/ProfileEditor';
import { Search } from './pages/Search/Search';
import { RequiresAuth, RestrictAuthenticated } from './providers/AuthProvider';
import { ActivateAccount } from './pages/UserActivate/UserActivate';

export function ProjectRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' Component={Main}/>
        <Route path='/about-us/' Component={AboutUs}/>
        <Route path='/login/' element={<RestrictAuthenticated><Login /></RestrictAuthenticated>} />
        <Route path='/registration/' element={<RestrictAuthenticated><Registration /></RestrictAuthenticated>} />
        <Route path='/email-verification/' Component={EmailConfirmation} />
        <Route path='/profile/' element={<RequiresAuth><ProfileEditor /></RequiresAuth>} />
        <Route path='/search/' Component={Search} />
        <Route path="/activate/:uid/:token/" element={<RestrictAuthenticated><ActivateAccount /></RestrictAuthenticated>} />
      </Routes>
    </BrowserRouter>
  );
}