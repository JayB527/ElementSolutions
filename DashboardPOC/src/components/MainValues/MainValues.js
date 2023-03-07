import './MainValues.css'
import ValueCard from './ValueCard/ValueCard';
import { useState, useEffect } from 'react';

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
    
    useEffect(() => {
        let getValues = async () => {
            try {
                let host = window.location.hostname
                let response = await fetch(`http://${host}:3001/rules`);
                let body = await response.json();

                // Sort the data based on ID first to account for updated rules.
                let data = body.data.sort((a, b) => a.id - b.id);
                setRulesData(data);

            } catch (err) {
                console.log(err);
                setRulesData(defaultRules);
            }
        }

        getValues();
    }, []);

    
    return(
        <>
            <div className="titleWrapper">
                <div className="dataHeader" id="data-title">Data Analytics</div>
                <div className="underlineBar"></div>
            </div>

            <div className="valueContainer">
                { rulesData.map((rule) => <ValueCard key={rule['name']} title={rule['name']} value={rule['value']} /> ) }
            </div>    
        </>
    );
}

export default MainValues;
