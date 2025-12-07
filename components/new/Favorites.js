import { useContext, useState } from "react";
import GlobalContext from "../../pages/store/globalContext";
import MeetupList from "../meetups/MeetupList";
import MeetupDetail from "../meetups/MeetupDetail";
import classes from "../../styles/HomePage.module.css";

export default function Favorites() {
  const globalCtx = useContext(GlobalContext);
  const [selectedMeetup, setSelectedMeetup] = useState(null);

  if (!globalCtx.theGlobalObject.dataLoaded) {
    return (<div className={classes.loading}>Loading data from database, please wait . . .</div>);
  }

  const meetups = globalCtx.theGlobalObject.meetings || [];
  const favourites = globalCtx.theGlobalObject.favourites || [];

  const favouriteMeetups = meetups.filter((m) =>
    favourites.includes(m._id)
  );

  function toggleFavourite(meetup) {
    globalCtx.updateGlobals({
      cmd: "toggleFavourite",
      meetupId: meetup._id,
    });
  }

  function handleSelect(meetup) {
    setSelectedMeetup(meetup);
  }

  function closeDetail() {
    setSelectedMeetup(null);
  }

  return (
    <div className={classes.dashboard}>
      <section className={classes.hero}>
        <h1>Your Favourites</h1>
        <p>
          You currently have{" "}
          <strong>{favouriteMeetups.length}</strong> favourite meetup
          {favouriteMeetups.length !== 1 ? "s" : ""}.
        </p>
      </section>

      <section className={classes.section}>
        <h2>Favourite Meetups</h2>
        {favouriteMeetups.length === 0 ? (
          <p>You haven&apos;t favourited any meetups yet.</p>
        ) : (
          <MeetupList
            meetups={favouriteMeetups}
            favourites={favourites}
            onToggleFavourite={toggleFavourite}
            onSelect={handleSelect}
          />
        )}
      </section>

      {selectedMeetup && (
        <div className={classes.detailOverlay} onClick={closeDetail}>
          <div className={classes.detailInner} onClick={(e) => e.stopPropagation()}>
            <MeetupDetail
              id={selectedMeetup._id}
              image={selectedMeetup.image}
              title={selectedMeetup.title}
              address={selectedMeetup.address}
              description={selectedMeetup.description}
            />

            <button className={classes.backButton} type="button" onClick={closeDetail}>Back to favourites</button>
          </div>
        </div>
      )}
    </div>
  );
}
