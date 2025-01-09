import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Header from './componenets/common/Header';
import Footer from './componenets/common/Footer';

import Home from './componenets/Home';
import About from './componenets/About';
import Shop from './componenets/Shop';
import Contact from './componenets/Contact';
import SignIn from './componenets/SignIn';
import Cart from './componenets/Cart';
import Terms from './componenets/Terms';
import PrivacyPolicy from './componenets/PrivacyPolicy';

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
};

export default App;
