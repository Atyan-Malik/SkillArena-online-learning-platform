import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
import Routes from "../router/Routes.jsx";

const Layout = () => {
  return (
    <>
      <Header />
      <main>
        <Routes />
      </main>
      <Footer />
    </>
  );
};

export default Layout;
