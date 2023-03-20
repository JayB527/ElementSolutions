import './DataTable.css'
import { DataGrid } from '@mui/x-data-grid';
import { useState, useEffect } from 'react';
import { defaultRows, defaultColumns } from './TableDefaults';


const tableStyle = {
    height: 550,
    padding: '1% 3%',
    margin: '1% 7% 10% 7%',
    backgroundColor: 'white',
    borderRadius: 4,
}


const DataTable = () => {
    const [rows, setRows] = useState(defaultRows);
    const [cols, setCols] = useState(defaultColumns);
    const [isLoading, setLoading] = useState(true);
 
    useEffect(() => {
        let getData = async () => {
            try {
                let host = window.location.hostname
                let response = await fetch(`http://${host}:3001/table`);
                let body = await response.json();

                let colData = body.colData
                let rowData = body.rowData

                // Map each column header into the proper column object for the DataTable
                setCols(colData.map((value) => { 
                    return { field: value, headerName: value, flex: 1 }
                }));
            
                // Map each row into the proper row object for the DataTable
                setRows(rowData.map((element, index) => {
                    let row = { id: index };
                    
                    for (let i = 0; i < colData.length; i++) {
                        row[colData[i]] = element[i];
                    }

                    return row
                }));

            } catch (err) {
                console.log(err);

                setCols(defaultColumns);
                setRows(defaultRows);

            } finally {
                setLoading(false);
            }
        }

        getData();
    }, []);

    
    return(
        <>
            <div className="titleWrapper">
                <div className="patientHeader" id="table-title">Data Table</div>
                <div className="underlineBar"></div>
            </div>

            <DataGrid
                sx={tableStyle}
                rows={rows}
                columns={cols}
                pageSize={8}
                rowsPerPageOptions={[8]}
                disableSelectionOnClick
                disableColumnMenu
                loading={isLoading}
            />
        </>
    );
}

export default DataTable;
