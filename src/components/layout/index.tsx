import { Outlet } from "react-router-dom";

import Footer from "./footer";
import Header from "./header";

function Layout() {
  return (
    <div className="bg-gradient-to-br from-background to-muted">
      <Header />
      <main className="min-h-screen container mx-auto px-4 py-8">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default Layout;
