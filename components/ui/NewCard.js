import classes from "./NewCard.module.css"


export default function NewCard(props) {   
    return <div className={classes.card}>{props.children}</div>;
}