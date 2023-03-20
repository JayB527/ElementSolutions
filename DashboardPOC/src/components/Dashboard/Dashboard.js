import './Dashboard.css'
import elementLogo from '../../images/element_logo_black.png'
import MainValues from '../MainValues/MainValues';
import DataTable from '../DataTable/DataTable';
import DatasetOutlinedIcon from '@mui/icons-material/DatasetOutlined';
import TableRowsIcon from '@mui/icons-material/TableRows';
import Tooltip from '@mui/material/Tooltip';


const Dashboard = () => {
    return(
        <>
            <div className="header">
                <div className="left-header">
                        <img id="elementLogo" src={elementLogo} alt="Element Logo" />
                        <div className="title">
                            <span id="fhirSpan">FHIR</span><span id="dashboardSpan">Dashboard</span>
                        </div>
                </div>

                <div className="right-header">
                    <Tooltip title="Data Analytics">
                        <a href="#data-title"><DatasetOutlinedIcon className="icon" /></a>
                    </Tooltip>
                    
                    <Tooltip title="Patients Table">
                        <a href="#table-title"><TableRowsIcon className="icon" /></a>
                    </Tooltip>
                </div>
                
            </div>

            <MainValues />
            <DataTable />
           
        </>
    );
}

export default Dashboard;