import "./App.css";
import { NotFound } from "./pages/NotFound";
import { Dashboard } from "./route/Dashboard";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { NavbarDashbord } from "./components/NavbarDashbord";
import { HomePage } from "./pages/HomePage";
import { LoginPage } from "./pages/LoginPage";
import { ListStudent } from "./admin/student/ListStudent";
import { AddStudent } from "./admin/student/AddStudent";
import { ListMajor } from "./admin/major/ListMajor";
import { ListClub } from "./admin/club/ListClub";
import { AddMajor } from "./admin/major/AddMajor";
import { EditMajor } from "./admin/major/EditMajor";
import { EditStudent } from "./admin/student/EditStudent";
import { AddClub } from "./admin/club/AddClub";
import { EditClub } from "./admin/club/EditClub";

function App() {
  function PrivateOutlet() {
    return localStorage.getItem("token") ? (
      <NavbarDashbord />
    ) : (
      <Navigate to='/login' />
    );
  }
  return (
    <div className='App'>
      <BrowserRouter>
        <Routes>
          <Route path='' element={<Navbar />}>
            <Route path='/' element={<HomePage />} />
            <Route path='/login' element={<LoginPage />} />
            <Route path='*' element={<NotFound />} />
          </Route>
          <Route path='' element={<PrivateOutlet />}>
            <Route path='/dashboard' element={<Dashboard />}>
              <Route path='student'>
                <Route path='list' element={<ListStudent />} />
                <Route path='add' element={<AddStudent />} />
                <Route path='edit/:id' element={<EditStudent />} />
              </Route>
              <Route path='major'>
                <Route path='list' element={<ListMajor />} />
                <Route path='add' element={<AddMajor />} />
                <Route path='edit/:id' element={<EditMajor />} />
              </Route>
              <Route path='club'>
                <Route path='list' element={<ListClub />} />
                <Route path='add' element={<AddClub />} />
                <Route path='edit/:id' element={<EditClub />} />
              </Route>
              <Route path='*' element={<NotFound />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
