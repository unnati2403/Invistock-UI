import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/layout/AppSidebar";
import { Header } from "@/components/layout/Header";
import { Routes, Route } from "react-router-dom";

import Home from "@/pages/Home";
import Profile from "@/pages/Profile";
import Settings from "@/pages/Settings";

function App() {
  return (
    <SidebarProvider >
      <div className="flex h-screen">
        <AppSidebar />
        
        <div className="flex flex-col flex-1">
          <Header />

          <main className="flex-1 p-6">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/settings" element={<Settings />} />
            </Routes>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}

export default App;
