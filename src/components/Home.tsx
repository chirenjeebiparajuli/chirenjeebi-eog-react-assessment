import React, { useState } from 'react';
import Card from '@material-ui/core/Card';
import AutoComplete from './AutoComplete';
import CardComponent from './CardComponent';
import { Provider, useQuery, createClient } from 'urql';
import { LinearProgress } from '@material-ui/core';

const query = `
    query  {
        getMetrics,
        __typename
    }
`;

const client = createClient({
    url: 'https://react.eogresources.com/graphql',
});

export default () => {
    return (
        <Provider value={client}>
          <Home />
        </Provider>
      );
}

const Home = () => {
    const [currentMetric, setCurrentMetric] = useState(0);
    let cardData:any = [];
    const onMetricsChangeHandler = (event:any, data:any) => {
        cardData = data;
        setCurrentMetric(data);
    }
    
    const [result] = useQuery({
        query,
        variables: {},
    })
    const { fetching, data, error } = result;

    if (fetching) return <LinearProgress />;
    const metrics = data.getMetrics;


    return (
        <Provider value={client}>
            <Card>
                <AutoComplete
                    metrics={metrics}
                    onMetricsChangeHandler={onMetricsChangeHandler}
                />
                <Card>
                    {
                        currentMetric ? <CardComponent data={currentMetric} /> : ''
                    }
                </Card>
            </Card>
        </Provider>
    );
}
