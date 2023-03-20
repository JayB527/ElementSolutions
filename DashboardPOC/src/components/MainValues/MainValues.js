import './MainValues.css'
import ValueCard from './ValueCard/ValueCard';
import { useState, useEffect } from 'react';
import { defaultRules } from './ValueDefaults';


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
                setRulesData(data);

            } catch (err) {
                console.log(err);
                setRulesData(defaultRules);

            } finally {
                setLoading(false);
            }
        }

        getValues();
    }, []);

    
    return(
        <>
            <div className="titleWrapper">
                <div className="dataHeader" id="data-title"> Data Analytics </div>
                <div className="underlineBar"></div>
            </div>

            <div className="valueContainer">
                { rulesData.map((rule) => <ValueCard key={rule['name']} title={rule['name']} value={rule['value']} isLoading={isLoading} />) }
            </div>    
        </>
    );
}

export default MainValues;
