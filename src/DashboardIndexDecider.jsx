import AuthenticationService from "./services/authentication.service";
import {useState} from "react";
import AdminDashboard from "./pages/Administrators/Dashboard/AdminDashboard";
import ApplicantDashboard from "./pages/Applicants/Dashboard/ApplicantDashboard";
import SuperuserDashboard from "./pages/Superusers/Dashboard/SuperuserDashboard";

const DashboardIndexDecider = () => {
    const [role, setRole] = useState(AuthenticationService.getUserRole());

    if(role === 'ADMIN') {
        return <AdminDashboard />
    } else if(role === 'APPLICANT') {
        return <h1><ApplicantDashboard/></h1>
    } else if(role === 'SUPERUSER') {
        return <SuperuserDashboard />  
    }
}

export default DashboardIndexDecider;