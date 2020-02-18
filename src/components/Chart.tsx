import React from 'react';
import moment from 'moment';
import {
  LineChart, Line, XAxis, YAxis, Tooltip, Legend
} from 'recharts';


function Chart(props:any)  {
    const { chartsData } = props;
    
    const dummyData = chartsData[0].measurements;
    const strokes = ["#8884d8", "#ed616b", "#7cf287", "#f2cb5e", "#21201e", "#0af2ee", "#f5050d"];
      return (
        <LineChart
          width={800}
          height={300}
          margin={{
            top: 5, right: 30, left: 20, bottom: 5,
          }}
        >
          <XAxis dataKey="at" 
            scale="time" tickFormatter = {(unixTime) => moment(unixTime).format('HH:mm')}
            type="number"
            domain={[dummyData[0].at, dummyData[dummyData.length-1].at]}
            />
          <YAxis />
          <Tooltip />
          <Legend />
          {
              chartsData.map((s:any, key: number) => (
                <Line dataKey="value" data={s.measurements} name={s.metric} stroke={strokes[key]} dot={false} key={s.metric} />
              ))
          }
        </LineChart>
      );

  }

  export default Chart;
