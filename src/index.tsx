import React from 'react';
import ReactDOM from 'react-dom/client';
import { ProjectRoutes } from './Routes';
import reportWebVitals from './reportWebVitals';
import { App } from 'antd';
import { ApiProvider, HttpMethods, fetchApi } from './providers/ApiProvider';
import createStore from 'react-auth-kit/createStore';
import createRefresh from 'react-auth-kit/createRefresh';
import AuthProvider from 'react-auth-kit/AuthProvider';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const refresh = createRefresh({
  interval: 10,

  refreshApiCallback: async (param): Promise<any> => {
    try {
      const response = await fetchApi<any, any>({
        url: "auth/jwt/refresh",
        data: {
          refresh: param.refreshToken,
        },
        method: HttpMethods.POST,
      })

      console.log('Refreshing Token.')

      return {
        isSuccess: true,
        newAuthToken: response.access,
        newAuthTokenExpireIn: 5,
        newRefreshTokenExpiresIn: 60*24
      }
    }

    catch(error){
      console.error('Refresh Token Error: ', error)
      return {
        isSuccess: false
      } 
    }
  }
})

const store = createStore({
  authName: '_auth',
  authType: 'cookie',
  cookieDomain: 'localhost',
  cookieSecure: window.location.protocol === 'https:',
  refresh: refresh,
});

root.render(
  <React.StrictMode>
    <AuthProvider store={store}>
      <App>
        <ApiProvider>
          <ProjectRoutes />
        </ApiProvider>
      </App>
    </AuthProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
