import { Page } from '@components';
import { useSave } from '@store';
import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

export function HomeRoot() {
  const navigate = useNavigate();
  const save = useSave.getState().save;
  const firstVisit = Boolean(sessionStorage.getItem('tenna-welcome'));

  useEffect(() => {
    if (!save && !firstVisit) {
      navigate('/welcome');
      sessionStorage.setItem('tenna-welcome', 'true');
    }
  }, [save, firstVisit, navigate]);

  return (
    <Page>
      <Page.TopBar title="Home">
        <Page.Nav>
          <Page.NavItem title="Overview" to="" />
          <Page.NavItem title="Welcome" to="welcome" />
        </Page.Nav>
      </Page.TopBar>
      <Page.Content>
        <Outlet />
      </Page.Content>
    </Page>
  );
}
