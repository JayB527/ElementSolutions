import './ValueCard.css'
import Card from '@mui/material/Card';
import CircularProgress from '@mui/material/CircularProgress';
import { CardContent } from '@mui/material';

const cardStyle = {
    height: 250,
    width: 250,
    borderRadius: 4,
}

const cardContentStyle = {
    height: '90%'
}

const progressStyle = {
    color: '#ff4b1f'
}

const ValueCard = (props) => {
    return(
        <Card sx={ cardStyle }>
            <CardContent sx={ cardContentStyle }>
                 <div className="valueWrapper">
                    { props.isLoading ? <></> : <div className="cardHeader">{ props.title }</div> }
                    { props.isLoading ? <></> : <div className="value">{ props.value }</div> }
                    { props.isLoading ? <CircularProgress sx={progressStyle} /> : <></> }
                </div>
            </CardContent> 
        </Card>
    );
}

export default ValueCard;
