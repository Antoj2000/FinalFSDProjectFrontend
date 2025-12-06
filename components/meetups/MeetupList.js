import MeetupItem from './MeetupItem';
import classes from './MeetupList.module.css';

function MeetupList(props) {
  return (
    <ul className={classes.list}>
      {props.meetups.map((meetup) => (
        <MeetupItem
          key={meetup._id}
          id={meetup.meetingId}
          image={meetup.image}
          title={meetup.title}
          address={meetup.address}
          //when it's clicked tell the parent which meetup it is
          onOpen={() => props.onSelect && props.onSelect(meetup)}
        />
      ))}
    </ul>
  );
}

export default MeetupList;
