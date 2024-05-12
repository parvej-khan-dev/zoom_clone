// @ts-nocheck
'use client';
import { useGetCalls } from '@/hooks/useGetCalls';
import { Call, CallRecording } from '@stream-io/video-react-sdk';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import MeetingCard from './MeetingCard';
import Loader from './Loader';
import { useToast } from './ui/use-toast';

type CallListProps = {
  type: 'upcoming' | 'ended' | 'recording';
};

const CallList = ({ type }: CallListProps) => {
  const { endedCalls, upcomingCalls, callRecordings, isLoading } =
    useGetCalls();
  const router = useRouter();
  const [recordings, setRecordings] = useState<CallRecording[]>([]);
  const toast = useToast();

  const getCalls = () => {
    switch (type) {
      case 'upcoming':
        return upcomingCalls;
      case 'ended':
        return endedCalls;
      case 'recording':
        return recordings;
      default:
        return [];
    }
  };
  const getNoCallsMessage = () => {
    switch (type) {
      case 'upcoming':
        return 'No Upcoming calls';
      case 'ended':
        return 'No Previous calls';
      case 'recording':
        return 'No Recordings';
      default:
        return '';
    }
  };

  useEffect(() => {
    const fetchRecordings = async () => {
      try {
        const callData = await Promise.all(
          callRecordings?.map((meeting) => meeting.queryRecordings()) ?? []
        );
        console.log(callData);

        const recordings = callData
          .filter((call) => call.recordings.length > 0)
          .flatMap((call) => call.recordings);

        setRecordings(recordings);
      } catch (error) {
        toast({ title: 'Try again later' });
      }
    };

    if (type === 'recording') {
      fetchRecordings();
    }
  }, [type, callRecordings]);

  const calls = getCalls();
  const noCallMessage = getNoCallsMessage();

  if (isLoading) return <Loader />;
  return (
    <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">
      {calls && calls.length > 0 ? (
        calls.map((meeting: Call | CallRecording) => (
          <MeetingCard
            key={(meeting as Call)?.id}
            icon={
              type === 'upcoming'
                ? '/icons/upcoming.svg'
                : type === 'ended'
                ? '/icons/previous.svg'
                : '/icons/recordings.svg'
            }
            title={
              meeting?.state?.custom?.description?.substring(0, 20) ||
              meeting?.filename?.substring(0, 20) ||
              'Personal Meeting'
            }
            date={
              (meeting as Call)?.state?.startsAt?.toLocaleString() ||
              meeting.start_time.toLocaleString()
            }
            isPreviousMeeting={type === 'ended'}
            buttonIcon1={type === 'recording' ? '/icons/play.svg' : undefined}
            handleClick={
              type === 'recording'
                ? () => router.push(`${meeting.url}`)
                : () => router.push(`/meeting/${(meeting as Call).id}`)
            }
            link={
              type === 'recording'
                ? meeting?.url
                : `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${
                    (meeting as Call).id
                  }`
            }
            buttonText={type === 'recording' ? 'Play' : 'Start'}
          />
        ))
      ) : (
        <h1>{noCallMessage}</h1>
      )}
    </div>
  );
};

export default CallList;
