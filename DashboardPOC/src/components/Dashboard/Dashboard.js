import './Dashboard.css'
import elementLogo from '../../images/element_logo_black.png'
import MainValues from '../MainValues/MainValues';
import PatientTable from '../PatientTable/PatientsTable';


const Dashboard = () => {
    return(
        <>
            <div className="header">
                <img id="elementLogo" src={elementLogo} alt="Element Logo" />
                <div className="title">
                    <span id="fhirSpan">FHIR</span><span id="dashboardSpan">Dashboard</span>
                </div>
            </div>

            <MainValues />
            <PatientTable />
           
        </>
    );
}

export default Dashboard;