'use client';
import { useGetCalls } from '@/hooks/useGetCalls';
import React from 'react';

const UpcomingMeetingCard = () => {
  const { upcomingCalls } = useGetCalls();
  let meetingTime: string | undefined;

  if (upcomingCalls.length > 0) {
    const {
      state: { startsAt },
    } = upcomingCalls[0];

    meetingTime = startsAt?.toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  }

  return (
    <h2 className="glassmorphism lg:max-w-[320px]">
      Upcoming Meeting: {meetingTime || `No Upcoming Meeting`}
    </h2>
  );
};

export default UpcomingMeetingCard;
