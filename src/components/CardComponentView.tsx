import React from 'react';
import { Paper, Card, CardContent, Typography } from "@material-ui/core";
import Chart from './Chart';

function CardComponentView(props:any) {
    const { metricsArray, chartsData } = props;
    let cardComponent= '';
    if(metricsArray && metricsArray.length > 0) {
        cardComponent = metricsArray.map((obj:any, key:any) => 
            <Paper>
                <Card  key={key}>
                    <CardContent>
                    <Typography variant="h6" component="h2">
                    {obj.metricName}
                    </Typography>
                    <Typography variant="h5" component="h2">
                    {obj.currentValue}
                    </Typography>
                    </CardContent>
                </Card>
            </Paper>
        )
    } else {
         cardComponent = ""
    }
    return (
        <React.Fragment>
            {cardComponent}
            {cardComponent ? <Chart chartsData={chartsData}/> : '' }
        </React.Fragment>
    );
}

export default CardComponentView;