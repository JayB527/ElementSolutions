import './MainValues.css'
import ValueCard from './ValueCard/ValueCard';

const MainValues = () => {
    return(
        <>
            <div className="titleWrapper">
                <div className="dataHeader">Data Analytics</div>
                <div className="underlineBar"></div>
            </div>

            <div className="valueContainer">
                <ValueCard title="Created Users" value="6"/>
                <ValueCard title="Requests Called" value="137"/>
                <ValueCard title="Percent Active" value="37%"/>
                <ValueCard title="Security Status" value="Good"/>
                <ValueCard title="Logs Created" value="79"/>
                <ValueCard title="Current Active Users" value="-"/>
            </div>    
        </>
    );
}

export default MainValues;