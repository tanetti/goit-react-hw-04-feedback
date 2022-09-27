import PropTypes from 'prop-types';
import { useState } from 'react';
import {
  StyledChart,
  FeedbackStatisticsBox,
  StatisticsTitle,
  StatisticsTotalHead,
  StatisticsTotalValue,
} from './FeedbackStatistics.styled';
import { chartOptions } from 'constants/chartOptions';

export const FeedbackStatistics = ({
  currentFeedbacsState,
  percentageOfFeedbackTypes,
  totalFeedbackCount,
}) => {
  const [shouldStatisticsBoxShown, setShouldStatisticsBoxShown] =
    useState(false);

  const chartData = [
    ['Type of feedback', 'Feedback quantity'],
    ...Object.entries(currentFeedbacsState).map(([key, value]) => [
      key[0].toUpperCase() + key.substring(1) + ' feedbacks',
      value,
    ]),
  ];

  const topFeedbackType = Object.entries(percentageOfFeedbackTypes).sort(
    (a, b) => b[1] - a[1]
  )[0][0];

  return (
    <FeedbackStatisticsBox shouldShown={shouldStatisticsBoxShown}>
      <StatisticsTitle>Feedback statistics:</StatisticsTitle>
      <StyledChart
        chartType="PieChart"
        data={chartData}
        options={chartOptions}
        onLoad={setShouldStatisticsBoxShown}
      />
      <StatisticsTotalHead>
        Total:
        <StatisticsTotalValue topFeedbackType={topFeedbackType}>
          {totalFeedbackCount}
        </StatisticsTotalValue>
      </StatisticsTotalHead>
    </FeedbackStatisticsBox>
  );
};

FeedbackStatistics.propTypes = {
  currentFeedbacsState: PropTypes.exact({
    good: PropTypes.number.isRequired,
    neutral: PropTypes.number.isRequired,
    bad: PropTypes.number.isRequired,
  }).isRequired,
  percentageOfFeedbackTypes: PropTypes.exact({
    good: PropTypes.number.isRequired,
    neutral: PropTypes.number.isRequired,
    bad: PropTypes.number.isRequired,
  }).isRequired,
  totalFeedbackCount: PropTypes.number.isRequired,
};
