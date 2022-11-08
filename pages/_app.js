import '../styles/globals.css';
import Navbar from './Navbar';
import Footer from './Footer';
import { store, persistor } from '../redux';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

function MyApp({ Component, pageProps }) {
  return <>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Navbar />
        <Component {...pageProps} />
        <Footer />
      </PersistGate>
    </Provider>
  </>
}

export default MyApp
