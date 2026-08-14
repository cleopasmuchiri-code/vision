import { Routes, Route } from "react-router-dom";
import Visions from "./components/Vision/Visions.jsx";
import Profile from "./components/Profile";
import LandingPage from "./components/LandingPage";
import History from "./components/History/History.jsx";
import VisionForm from "./components/Forms/VisionForm";
import VisionDetail from "./components/Vision/VisionDetails";
import NotFound from "./components/NotFound.jsx";

// layout
import MainLayout from "./components/MainLayout.jsx";

const App = () => {
  return (
    <main className="px-8 bg-">
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
            <Route path="add" element={<VisionForm />} />
            <Route path=":id" element={<VisionDetail />} />
          </Route>
        </Route>
      </Routes>
    </main>
  );
};

export default App;
