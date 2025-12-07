import MeetupItem from "./MeetupItem";
import classes from "./MeetupList.module.css";

function MeetupList(props) {
  const favourites = props.favourites || [];

  return (
    <ul className={classes.list}>
      {props.meetups.map((meetup) => (
        <MeetupItem
          key={meetup._id}
          id={meetup._id}
          image={meetup.image}
          title={meetup.title}
          address={meetup.address}
          isFavourite={favourites.includes(meetup._id)}
          onToggleFavourite={props.onToggleFavourite ? () => props.onToggleFavourite(meetup) : undefined}
          onSelect={props.onSelect ? () => props.onSelect(meetup) : undefined}
        />
      ))}
    </ul>
  );
}

export default MeetupList;
