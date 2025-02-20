import NavBar from "../NavBar/NavBar";
import Footer from "../Footer/Footer";
import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <>
      <div className="min-h-screen flex flex-col">
        <NavBar />

        <main className="py-15 flex-grow">
          <Outlet />
        </main>

        <Footer />
      </div>
    </>
  );
}

export default Layout;
