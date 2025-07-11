import { LegacyDebugUI, Layout } from './components';

const App = () => {
  return (
    <>
      {import.meta.env.VITE_SHOW_OLD_UI !== 'false' && <LegacyDebugUI />}
      <Layout />
    </>
  );
};

export default App;
