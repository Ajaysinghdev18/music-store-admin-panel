// Dependencies
import { Box, CircularProgress } from '@mui/material';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom';

// Apis
import { AuthApi } from '../apis';
// Constants
import { ADMIN_ROUTES, ARTIST_ROUTES, AUTH_ROUTES, ROUTES } from '../constants';
// Layouts
import { AuthLayout, FullLayout } from '../layouts';
import { NewEmailTemplatePage } from '../pages';
import { ViewEmailTemplatePage } from '../pages/EmailTemplate/View';
import { setAccount } from '../store/actions/auth.actions';
// Store
import { getAccount } from '../store/selectors';
import { CMSTemplate } from '../pages/CMS';
import { CMSDetailTemplate } from '../pages/CMS/Detail';
import { ExistingTemplateEditor } from '../components/CMS/ExistingTemplateEditior';
import { NewsLetterNew } from '../components/NewsLetter/New/NewsLetterNew';
import { NewsLetterNewPage } from '../pages/NewLetter';
import { ViewNewsLetterPage } from '../pages/NewLetter/View';

// Create app routes
const AppRoutes = () => {
  // States
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Get dispatch from hook
  const dispatch = useDispatch();

  // Get account from store
  const account = useSelector(getAccount);

  const routesWithRoles = {
    admin: ADMIN_ROUTES,
    artist: ARTIST_ROUTES
  };

  if (!account) {
    // Call me
    AuthApi.me()
      .then((res) => {
        if (res.user) {
          dispatch(setAccount(res.user));
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => setIsLoading(false));
  }

  // Return app routes
  return isLoading ? (
    <Box flex={1} height="100vh" display="flex" alignItems="center" justifyContent="center">
      <CircularProgress />
    </Box>
  ) : (
    <Router>
      {!account ? (
        <Routes>
          {AUTH_ROUTES.map(({ path, Component }) => (
            <Route
              path={path}
              key={path}
              element={
                <AuthLayout>
                  <Component />
                </AuthLayout>
              }
            />
          ))}
          <Route path="*" element={<Navigate to={ROUTES.AUTH.SIGN_IN} />} />
        </Routes>
      ) : (
        <Routes>
          {routesWithRoles[account?.role].map(({ path, Component }) => (
            <Route
              path={path}
              key={path}
              element={
                <FullLayout>
                  <Component />
                </FullLayout>
              }
            />
          ))}
          <Route path={ROUTES.EMAIL.NEW} element={<NewEmailTemplatePage />} />
          <Route path={ROUTES.EMAIL.VIEW} element={<ViewEmailTemplatePage />} />
          <Route path={ROUTES.NEWSLETTER.NEW} element={<NewsLetterNewPage />} />
          <Route path={ROUTES.NEWSLETTER.VIEW} element={<ViewNewsLetterPage />} />
          <Route path={ROUTES.CMS.NEW} element={<CMSTemplate />} />
          <Route path={ROUTES.CMS.NEWTEMPLATE} element={<ExistingTemplateEditor />} />
          <Route path={ROUTES.CMS.DETAIL} element={<CMSDetailTemplate />} />
          <Route path="*" element={<Navigate to={ROUTES.HOME} />} />
        </Routes>
      )}
    </Router>
  );
};

// Export app routes
export default AppRoutes;
