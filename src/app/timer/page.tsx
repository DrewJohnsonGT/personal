'use client';

import { useEffect, useState } from 'react';
import { Flex, Heading } from '@chakra-ui/react';

export interface TimeSince {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  percentOfMonth: number;
}

const ONE_MONTH = 1000 * 60 * 60 * 24 * 30;

const TIMES = [
  {
    goal: ONE_MONTH,
    time: new Date('Jun 25 2024 17:07:00 GMT-0400 (Eastern Daylight Time)'),
  },
];

const getPercentOfGoal = (date: Date, goal: number) => {
  const currentDate = new Date();
  const ms = currentDate.getTime() - date.getTime();
  const percentage = (ms / goal) * 100;
  return Math.round(percentage * 100) / 100;
};

const useHomeLogic = () => {
  const [timeSince, setTimeSince] = useState<TimeSince[]>();

  // Find time since TIME and update every second
  const getTimeSince = (time: Date) => {
    const now = new Date();
    const diff = now.getTime() - time.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);
    return { days, hours, minutes, seconds };
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeSince(
        TIMES.map(({ goal, time }) => ({
          ...getTimeSince(time),
          percentOfMonth: getPercentOfGoal(time, goal),
        })),
      );
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return {
    timeSince,
  };
};

const TimeSincePage = () => {
  const { timeSince } = useHomeLogic();
  const { days, hours, minutes, percentOfMonth, seconds } =
    timeSince?.[0] || {};
  return (
    <Flex direction="column" justify="center" align="center">
      <Heading>
        {days} <span>days</span>
      </Heading>
      <Heading>
        {hours} <span>hours</span>
      </Heading>
      <Heading>
        {minutes} <span>minutes</span>
      </Heading>
      <Heading>
        {seconds} <span>seconds</span>
      </Heading>
      {percentOfMonth && (
        <Heading mt={4}>{percentOfMonth?.toFixed(2)}%</Heading>
      )}
    </Flex>
  );
};

export default TimeSincePage;
