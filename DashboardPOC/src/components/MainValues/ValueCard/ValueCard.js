import './ValueCard.css'
import Card from '@mui/material/Card';
import { CardContent } from '@mui/material';

const cardStyle = {
    height: 250,
    width: 250,
}

const cardContentStyle = {
    height: '90%',
}

const ValueCard = (props) => {
    return(
        <Card sx={ cardStyle }>
            <CardContent sx={ cardContentStyle }>
                <div className="valueWrapper">
                    <div className="cardHeader">{ props.title }</div>
                    <div className="value">{ props.value }</div>
                </div>
            </CardContent>
        </Card>
    );
}

export default ValueCard;
