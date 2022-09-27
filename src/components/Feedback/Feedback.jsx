import { useReducer } from 'react';
import {
  FEEDBACK_STATE_INITIAL_VALUE,
  INCREMENT_VALUE,
} from 'constants/feedback';
import { FeedbackButtonList } from './Feedback.styled';
import { FeedbackOptions } from './FeedbackOptions/FeedbackOptions';
import { FeedbackStatistics } from './FeedbackStatistics/FeedbackStatistics';
import { NotificationMessage } from './NotificationMessage/NotificationMessage';

const feedbackReducer = (state, action) => {
  switch (action.type) {
    case 'good':
      return { ...state, good: state.good + action.payload };

    case 'neutral':
      return { ...state, neutral: state.neutral + action.payload };

    case 'bad':
      return { ...state, bad: state.bad + action.payload };

    default:
      throw new Error(`Unsupported action in Feedback Reducer ${action.type}`);
  }
};

export const Feedback = () => {
  const [state, dispatch] = useReducer(
    feedbackReducer,
    FEEDBACK_STATE_INITIAL_VALUE
  );

  const totalFeedbackCount = Object.values(state).reduce(
    (acc, value) => acc + value,
    0
  );

  const percentageOfFeedbackTypes = Object.fromEntries(
    Object.entries(state).map(([key, value]) => [
      key,
      Math.round((value * 100) / totalFeedbackCount) || 0,
    ])
  );

  return (
    <>
      <FeedbackButtonList>
        {Object.entries(state).map(([key, value]) => (
          <FeedbackOptions
            key={key}
            options={{ name: key, quantity: value }}
            onLeaveFeedback={() =>
              dispatch({ type: key, payload: INCREMENT_VALUE })
            }
          />
        ))}
      </FeedbackButtonList>

      {totalFeedbackCount > 0 ? (
        <FeedbackStatistics
          totalFeedbackCount={totalFeedbackCount}
          currentFeedbacsState={state}
          percentageOfFeedbackTypes={percentageOfFeedbackTypes}
        />
      ) : (
        <NotificationMessage message="There is no feedback yet" />
      )}
    </>
  );
};
