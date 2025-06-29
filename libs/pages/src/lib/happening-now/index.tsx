'use client';
import { EventsView } from '@digital-www-pwa/components';
import { EVENT_START, EVENT_END } from '@digital-www-pwa/utils';
import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';
import { useNavigate } from 'react-router';
import { useEffect, useState } from 'react';

dayjs.extend(isBetween);

export function HappeningNowPage() {
  const navigate = useNavigate();
  const [currentTime, setCurrentTime] = useState(dayjs());

  const updateTime = () => setCurrentTime(dayjs());

  useEffect(() => {
    const interval = setInterval(updateTime, 5000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    if (!currentTime.isBetween(EVENT_START, EVENT_END)) {
      navigate('/');
    }
  }, [currentTime]);

  return <EventsView happeningAt={currentTime} header="Happening Now!" />;
}
