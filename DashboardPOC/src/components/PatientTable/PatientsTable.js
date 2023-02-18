import './PatientsTable.css'
import { DataGrid } from '@mui/x-data-grid';


const columns = [
    { field: "id", headerName: "ID", type: 'number', align: 'left', headerAlign: 'left'},
    { field: 'firstName', headerName: 'First name', flex: 1 },
    { field: 'lastName', headerName: 'Last name', flex: 1 },
    { field: 'cholesterol', headerName: 'Cholesterol', type: 'number', flex: 1, align: 'left', headerAlign: 'left' },
    { field: 'age', headerName: 'Age', type: 'number', flex: 1, align: 'left', headerAlign: 'left'}
];
  
const rows = [
    { id: 1, firstName: 'Jon', lastName: 'Doe', age: 35, cholesterol:'113.7' },
    { id: 2, firstName: 'Anna', lastName: 'Johnson', age: 25, cholesterol:'143.7' },
    { id: 3, firstName: 'Maddison', lastName: 'Shell', age: 17, cholesterol:'103.7' },
    { id: 4, firstName: 'Oliver', lastName: 'Smith', age: 9, cholesterol:'221.7' },
    { id: 5, firstName: 'Oakley', lastName: 'Barb', age: 63, cholesterol:'123.7' },
    { id: 6, firstName: 'Olivia', lastName: 'Chip', age: 40, cholesterol:'172.7' },
    { id: 7, firstName: 'Walt', lastName: 'Michaels', age: 20, cholesterol:'201.7' },
    { id: 8, firstName: 'Sam', lastName: 'Bert', age: 53, cholesterol:'149.7' }
];

const tableStyle = {
    height: 550,
    padding: '1% 3%',
    margin: '1% 7% 10% 7%',
    backgroundColor: 'white'
}

const PatientsTable = () => {
    return(
        <>
            <div className="titleWrapper">
                <div className="patientHeader">Patients Table</div>
                <div className="underlineBar"></div>
            </div>

            <DataGrid
                sx={tableStyle}
                rows={rows}
                columns={columns}
                pageSize={10}
                disableSelectionOnClick
                disableColumnMenu
            />
        </>
    );
}

export default PatientsTable;