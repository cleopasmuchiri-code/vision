import { Routes, Route } from "react-router-dom";
import Visions from "./components/Vision/Visions.jsx";
import Profile from "./components/Profile";
import LandingPage from "./components/LandingPage";
import History from "./components/History/History.jsx";
import VisionDetail from "./components/Vision/VisionDetails";
import NotFound from "./components/NotFound.jsx";

// layout
import MainLayout from "./components/MainLayout.jsx";

const App = () => {
  return (
    <main className="flex justify-center items-center pb-8">
      <div className="w-full lg:w-[60%]">
        <Routes>
          {/* for errors */}
          <Route path="*" element={<NotFound />} />

          {/* app routes */}

          <Route path="/" element={<MainLayout />}>
            <Route index element={<LandingPage />} />

            <Route path="/history" element={<History />} />
            <Route path="/profile" element={<Profile />} />

            <Route path="/visions">
              <Route index element={<Visions />} />
              <Route path=":id" element={<VisionDetail />} />
            </Route>
          </Route>
        </Routes>
      </div>
    </main>
  );
};

export default App;
