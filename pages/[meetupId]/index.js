import MeetupDetail from '../../components/meetups/MeetupDetail';
import { useRouter } from 'next/router';
import GlobalContext from '../../pages/store/globalContext';
import { useContext } from 'react';

export default function MeetupDetailsPage() {
  const globalCtx = useContext(GlobalContext);
  const router = useRouter();

  // If data isn't loaded yet or route param missing, don't try render a meetup
  if (!globalCtx.theGlobalObject.dataLoaded || !router.query.meetupId) {
    return null; // or <p>Loading...</p>
  }

  let meeting = null;

  // Simple loop to find the matching meeting by meetingId
  for (let ii = 0; ii < globalCtx.theGlobalObject.meetings.length; ii++) {
    const temp = globalCtx.theGlobalObject.meetings[ii];

    if (
      temp.meetingId &&
      temp.meetingId.trim() === router.query.meetupId.trim()
    ) {
      meeting = temp;
      break;
    }
  }

  // If nothing matches the URL, show a simple message instead of undefined
  if (!meeting) {
    return <p>Meetup not found.</p>;
  }

  return (
    <MeetupDetail
      id={meeting._id}
      image={meeting.image}
      title={meeting.title}
      address={meeting.address}
      description={meeting.description}
    />
  );
}
