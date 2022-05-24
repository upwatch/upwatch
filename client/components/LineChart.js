import React, { useState } from 'react';
import { useSelector } from 'react-redux';
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

  const [chartDays, setChartDays] = useState(7);
  const [isSelected, setIsSelected] = useState('7 D');

  function handleClick(name) {
    setIsSelected(name);
    const numberDays = parseInt(name.split('').slice(0, -2).join(''));
    setChartDays(numberDays);
  }

  const buttons = ['7 D', '30 D', '60 D', '180 D'];

  return (
    <div>
      {buttons.map((name, i) => {
        return (
          <button
            key={i}
            name={name}
            className={isSelected === name ? 'selected' : ''}
            onClick={() => handleClick(name)}
          >
            {name}
          </button>
        );
      })}
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
          data={historicalData.filter((data, idx) => idx <= chartDays)}
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
