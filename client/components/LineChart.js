import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  VictoryChart,
  VictoryLine,
  VictoryVoronoiContainer,
  VictoryTooltip,
  VictoryAxis,
} from 'victory';
import { formatAsDollars, formatDate } from '../utility';

const LineChart = () => {
  const { historicalData } = useSelector((state) => state);

  return (
    <div>
      <VictoryChart
        width={750}
        height={500}
        scale={{ x: 'time' }}
        //padding={{ top: 5, bottom: 50, left: 50, right: 50 }}
        containerComponent={
          <VictoryVoronoiContainer
            responsive={false}
            labels={({ datum }) =>
              `${formatDate(datum.date)} ${formatAsDollars(datum.close)}`
            }
            labelComponent={
              <VictoryTooltip
                dy={-7}
                constrainToVisibleArea
                flyoutStyle={{
                  fill: 'gray',
                }}
                style={{
                  fill: 'white',
                  fontSize: 18,
                }}
              />
            }
          />
        }
      >
        <VictoryLine
          style={{
            data: { stroke: '#c43a31' },
            parent: { border: '1px solid #ccc' },
          }}
          data={historicalData.filter((data, i) => i <= 60)}
          x='date'
          y='close'
        />
        <VictoryAxis
          crossAxis
          style={{
            tickLabels: {
              fill: 'black',
              fontSize: 16,
            },
            axis: {
              stroke: 'black',
            },
          }}
        />
        <VictoryAxis
          dependentAxis
          style={{
            tickLabels: {
              fill: 'black',
            },
            axis: {
              stroke: 'black',
            },
          }}
        />
      </VictoryChart>
    </div>
  );
};

export default LineChart;
