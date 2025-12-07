import Card from "../ui/Card";
import classes from "./MeetupItem.module.css";

function MeetupItem(props) {
  function handleClick() {
    if (props.onSelect) {
      props.onSelect();
    }
  }

  function handleFavouriteClick(event) {
    event.stopPropagation();
    if (props.onToggleFavourite) {
      props.onToggleFavourite();
    }
  }

  const starSymbol = props.isFavourite ? "★" : "☆";

  return (
    <li className={classes.item} onClick={handleClick}>
      <Card>
        <div className={classes.image}>
          <img src={props.image} alt={props.title} />
        </div>
        <div className={classes.content}>
          <div className={classes.headerRow}>
            <h3>{props.title}</h3>
            <button
              type="button"
              className={`${classes.favButton} ${
                props.isFavourite ? classes.favButtonActive : ""
              }`}
              onClick={handleFavouriteClick}
              aria-label={
                props.isFavourite
                  ? "Remove from favourites"
                  : "Add to favourites"
              }
            >
              {starSymbol}
            </button>
          </div>
          <address>{props.address}</address>
        </div>
      </Card>
    </li>
  );
}

export default MeetupItem;
