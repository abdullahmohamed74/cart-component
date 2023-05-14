// components
import Navbar from './components/Navbar';
import CartContainer from './components/CartContainer';
import useAppContext from './hooks/useAppContext';

function App() {
  const { isLoading } = useAppContext();

  if (isLoading) {
    return (
      <main>
        <div className="loading" style={{ marginTop: '5rem' }}></div>
      </main>
    );
  }

  return (
    <main>
      <Navbar />
      <CartContainer />
    </main>
  );
}

export default App;
