import './PatientsTable.css'
import { DataGrid } from '@mui/x-data-grid';
import { useState, useEffect } from 'react';


const columns = [
    { field: "id", headerName: "ID", type: 'number', align: 'left', headerAlign: 'left' },
    { field: 'fname', headerName: 'First Name', flex: 1 },
    { field: 'lname', headerName: 'Last Name', flex: 1 },
    { field: 'cholesterol', headerName: 'Cholesterol', type: 'number', flex: 1, align: 'left', headerAlign: 'left' },
    { field: 'age', headerName: 'Age', type: 'number', flex: 1, align: 'left', headerAlign: 'left' }
];
  
const defaultRows = [
    { id: 1, fname: 'FILLER', lname: 'Doe', age: 35, cholesterol: '113.7' },
    { id: 2, fname: 'FILLER', lname: 'Johnson', age: 25, cholesterol: '143.7' },
    { id: 3, fname: 'FILLER', lname: 'Shell', age: 17, cholesterol: '103.7' },
    { id: 4, fname: 'FILLER', lname: 'Smith', age: 9, cholesterol: '221.7' },
    { id: 5, fname: 'FILLER', lname: 'Barb', age: 63, cholesterol: '123.7' },
    { id: 6, fname: 'FILLER', lname: 'Chip', age: 40, cholesterol: '172.7' }
];

const tableStyle = {
    height: 550,
    padding: '1% 3%',
    margin: '1% 7% 10% 7%',
    backgroundColor: 'white',
    borderRadius: 4,
}


const PatientsTable = () => {
    const [rows, setRows] = useState(defaultRows);
 
    useEffect(() => {
        let getData = async () => {
            try {
                let response = await fetch("http://localhost:3001/data");
                let body = await response.json();

                // Sort the data based on ID first to account for updated rows.
                let data = body.data.sort((a, b) => a.id - b.id);
                setRows(data);

            } catch (err) {
                console.log(err);
                setRows(defaultRows);
            }
        }

        getData();
    }, []);

    
    return(
        <>
            <div className="titleWrapper">
                <div className="patientHeader" id="table-title">Patients Table</div>
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
