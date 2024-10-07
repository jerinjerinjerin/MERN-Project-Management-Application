import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from 'react-hot-toast';
import HomePage from "./pages/HomePage";
import UpdatePage from "./pages/UpdatePage";
import Navbar from "./components/Navbar";
import CreateTaskPage from "./pages/CreateTaskPage";
import ViewTask from "./pages/ViewTask";
import DeleteTaskPage from "./pages/DeleteTaskPage";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="flex flex-col min-h-screen"> {/* Flex container */}
      <BrowserRouter>
        <Navbar />
        <Toaster position="top-center" />
        <div className="flex-grow"> {/* This will take up the available space */}
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/update-task/:id" element={<UpdatePage />} />
            <Route path="/view-task/:id" element={<ViewTask />} />
            <Route path="/create-task" element={<CreateTaskPage />} />
            <Route path="/delete-task/:id" element={<DeleteTaskPage />} />
          </Routes>
        </div>
        <Footer /> {/* Footer stays at the bottom */}
      </BrowserRouter>
    </div>
  );
}

export default App;
