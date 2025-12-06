import Card from '../ui/Card';
import classes from './MeetupItem.module.css';


function MeetupItem(props) {
  function handleClick(){
    if (props.onOpen){
      props.onOpen();
    }
  }

  return (
    <li className={classes.item} onClick={handleClick}>
      <Card>
        <div className={classes.image}>
          <img src={props.image} alt={props.title} />
        </div>
        <div className={classes.content}>
          <h3>{props.title}</h3>
          <address>{props.address}</address>
        </div>
      </Card>
    </li>
  );
}

export default MeetupItem;
