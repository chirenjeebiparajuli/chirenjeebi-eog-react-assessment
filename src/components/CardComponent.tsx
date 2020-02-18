import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Paper, LinearProgress } from '@material-ui/core';
import { useQuery, useSubscription } from 'urql';
import CardComponentView from './CardComponentView';

const useStyles = makeStyles({
    root: {
        width: 275
    },
    bullet: {
      display: 'inline-block',
      margin: '0 2px',
      transform: 'scale(0.8)',
    },
    title: {
      fontSize: 14,
    },
    pos: {
      marginBottom: 12,
    },
  });

const query = `
    query ($input: [MeasurementQuery]) {
        getMultipleMeasurements(input: $input) {
        metric,
        measurements {
            at,
            value,
        metric,
        unit,
        __typename
        },
        __typename
    },
    __typename
    }
`;
  
function CardComponent(props: any)  {
    const classes = useStyles();
    const { data } = props;
    var dt = new Date();
    dt.setMinutes( dt.getMinutes() - 30 );
    const ts = Math.round(dt.getTime() / 1000);

    const inputArray = data.length ? data.map( (elem: any) => {
        return {
            metricName: elem,
            after: ts
        }
    }) : [];

    const [result] = useQuery({
        query,
        variables: {input: inputArray},
    })
    const handleSubscription:any = (messages:any = [], response: any) => {
        return [response.newMessages, ...messages];
      };

    const { fetching, error } = result;
    const data1 = result.data;

    if (fetching) return <LinearProgress />;

    if (error) return <h2>Error</h2>

    let cardComponent;
    let cardArray: any = [];
    let chartsData: any = [];

    if(data1) {
        const { getMultipleMeasurements } = data1;
        if (getMultipleMeasurements && getMultipleMeasurements.length) {
        const finalInputArray = [...inputArray];
        chartsData = [...getMultipleMeasurements];
        finalInputArray.forEach((obj: any) => {
            getMultipleMeasurements.forEach((metricObj:any) => {
                if(metricObj.metric === obj.metricName) {
                    const temp = {
                        metricName: obj.metricName,
                        currentValue: metricObj.measurements[metricObj.measurements.length -1].value
                    }
                    cardArray.push(temp);
                }
            })
        })
        }
    }
    return (
        <React.Fragment>
            <CardComponentView metricsArray={cardArray} chartsData={chartsData}/>
        </React.Fragment>
    );    
  }





export default CardComponent;
