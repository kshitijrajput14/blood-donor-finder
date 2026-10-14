import{BrowserRouter,Routes,Route} from "react-router-dom";


//browserrouter-starts routing
//Routes-keep all routes together
//Route-connects one URL to one component

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Donors from "./pages/Donors";
import EditDonor from "./pages/EditDonor";
import Search from "./pages/search";
import BloodRequest from "./pages/bloodrequest";
import BloodRequests from "./pages/BloodRequests";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Notification from "./pages/Notification";
import EditProfile from "./pages/Editprofile";
import PatientRegister from "./PatientRegister";
import PatientLogin from "./PatientLogin";
import PatientDashboard from "./PatientDashboard";
function App(){
  return(
    <BrowserRouter>
   
     <Navbar />
     <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/register" element={<Register />}/>
       <Route path="/login" element={<Login />} />
      <Route
    path="/dashboard"
    element={
        <ProtectedRoute>
            <Dashboard />
        </ProtectedRoute>
    }
/>
      <Route
    path="/Notification"
    element={
        <ProtectedRoute>
            <Notification />
        </ProtectedRoute>
    }
/>
       <Route path="/Donors" element={<Donors />}/>
     <Route path="/edit/:id" element={<EditDonor />} />
      <Route path="/search" element={<Search />} />
      <Route path="/blood-request" element={<BloodRequest />} />
      <Route path="/blood-requests" element={<BloodRequests />} />
      <Route path="/admin-login" element={<AdminLogin />} />
      
    <Route
    path="/edit-profile"
    element={
        <ProtectedRoute>
            <EditProfile />
        </ProtectedRoute>
    }
/>
      <Route
    path="/admin-dashboard"
    element={
        <ProtectedRoute>
            <AdminDashboard />
        </ProtectedRoute>
    }
    
/>

<Route
    path="/patient-register"
    element={<PatientRegister />}
/>

<Route
    path="/patient-login"
    element={<PatientLogin />}
/>
<Route
    path="/patient-dashboard"
    element={<PatientDashboard />}
/>
      </Routes>
   </BrowserRouter>
  );
}
export default App;