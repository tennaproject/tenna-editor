import LegacyDebugUI from './components/LegacyDebugUI';

function App() {
  return (
    <>{import.meta.env.VITE_SHOW_OLD_UI !== 'false' && <LegacyDebugUI />}</>
  );
}

export default App;
