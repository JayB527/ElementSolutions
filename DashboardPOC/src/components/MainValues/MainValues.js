import './MainValues.css'
import ValueCard from './ValueCard/ValueCard';
import IconButton from '@mui/material/IconButton';
import RefreshIcon from '@mui/icons-material/Refresh';
import { useState, useEffect } from 'react';
import { Tooltip } from '@mui/material';


const buttonStyle = {
    margin: '0 0 .25rem .5rem'
}

const defaultRules = [
    {"name": "Created Users", "value": "0"},
    {"name": "Requests Called", "value": "2"},
    {"name": "Percent Active", "value": "10%"},
    {"name": "Security Status", "value": "Good"},
    {"name": "Logs Created", "value": "0"},
    {"name": "Current Active Users", "value": "-"}
];

const MainValues = () => {
    const [rulesData, setRulesData] = useState(defaultRules);
    const [isLoading, setLoading] = useState(true);
    
    useEffect(() => {
        let getValues = async () => {
            try {
                let host = window.location.hostname
                let response = await fetch(`http://${host}:3001/rules`);
                let body = await response.json();

                // Sort the data based on ID first to account for updated rules.
                let data = body.data.sort((a, b) => a.id - b.id);

                setLoading(false);
                setRulesData(data);

            } catch (err) {
                console.log(err);

                setLoading(false);
                setRulesData(defaultRules);
            }
        }

        setTimeout(() => { getValues() }, 1000);
    }, []);

    
    return(
        <>
            <div className="titleWrapper">
                <div className="dataHeader" id="data-title"> Data Analytics </div>
                <div className="underlineBar"></div>
            </div>

            <Tooltip title="Refresh">
                <IconButton sx={buttonStyle} aria-label="Refresh">
                    <RefreshIcon />
                </IconButton>
            </Tooltip>

            <div className="valueContainer">
                { rulesData.map((rule) => <ValueCard key={rule['name']} title={rule['name']} value={rule['value']} isLoading={isLoading} />) }
            </div>    
        </>
    );
}

export default MainValues;
