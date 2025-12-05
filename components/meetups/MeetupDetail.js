import { useContext, useState } from 'react';
import classes from './MeetupDetail.module.css';
import GlobalContext from '../../pages/store/globalContext';

function MeetupDetail(props){
    const globalCtx = useContext(GlobalContext);
    const [showMenu, setShowMenu] = useState(false);

    function toggleMenu(){
        setShowMenu(prev => !prev);
    }

    async function editHandler() {
        const newTitle = window.prompt('Edit title', props.title);
        if (newTitle === null) return;

        const newImage = window.prompt('Edit image URL', props.image);
        if (newImage === null) return;

        const newAddress = window.prompt('Edit Address', props.address);
        if (newAddress === null) return;

        const newDescription = window.prompt('Edit description', props.description);
        if (newDescription === null) return;


        await globalCtx.updateGlobals({
            cmd: 'updateMeeting',
            newVal: {
                _id: props.id,
                meetingId: props.meetingId,
                title: newTitle,
                image: newImage,
                address: newAddress,
                description: newDescription
            }
        });
          
}
async function deleteHandler() {
    const ok = window.confirm('Are you sure you want to delete this meetup?');
    if (!ok) return;

    await globalCtx.updateGlobals({
        cmd: 'deleteMeeting',
        newVal:{ _id: props.id }
    });
}
    return (
        <section className={classes.detail}>
            <img src={props.image} alt= {props.title} />

            <div className = {classes.topRow}>
                <h1>{props.title}</h1>

                <div className={classes.gearWrapper}>
                    <button className={classes.gearButton} type="Button" onClick={toggleMenu} title="Options">⚙</button>
                    
                    {showMenu && (
                        <div className={classes.actionMenu}>
                        <button onClick={editHandler}>Edit</button>
                        <button className={classes.deleteOption} onClick={deleteHandler}>Delete</button>
                    </div>
                    )}
                </div>
            </div>

            <address>{props.address}</address>
            <p>{props.description}</p>
        </section>
    );
}

export default MeetupDetail;