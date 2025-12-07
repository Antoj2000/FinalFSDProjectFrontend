import MeetupList from "../../components/meetups/MeetupList";
import MeetupDetail from "../../components/meetups/MeetupDetail";
import { useContext, useState } from "react";
import GlobalContext from "../store/globalContext";
import classes from "../../styles/HomePage.module.css";

function listMeetups() {
  const globalCtx = useContext(GlobalContext);
  const [selectedMeetup, setSelectedMeetup] = useState(null);

  if (!globalCtx.theGlobalObject.dataLoaded) {
    return (
      <div className={classes.loading}>
        Loading data from database, please wait . . .
      </div>
    );
  }

  const meetups = globalCtx.theGlobalObject.meetings || [];
  const favourites = globalCtx.theGlobalObject.favourites || [];

  function closeDetail() {
    setSelectedMeetup(null);
  }

  function toggleFavourite(meetup) {
    globalCtx.updateGlobals({
      cmd: "toggleFavourite",
      meetupId: meetup._id,
    });
  }

  return (
    <div className={classes.dashboard}>
      <section className={classes.hero}>
        <h1>Welcome back!</h1>
        <p>
          You currently have <strong>{meetups.length}</strong> meetup
          {meetups.length !== 1 ? "s" : ""}.
        </p>
        <p>Use the menu to add a new meetup or jump into an existing one.</p>
      </section>

      <section className={classes.section}>
        <h2>Your Meetups</h2>
        <MeetupList
          meetups={meetups}
          onSelect={setSelectedMeetup}
          favourites={favourites}
          onToggleFavourite={toggleFavourite}
        />
      </section>

      {selectedMeetup && (
        <div className={classes.detailOverlay} onClick={closeDetail}>
          <div
            className={classes.detailInner}
            onClick={(e) => e.stopPropagation()}
          >
            <MeetupDetail
              id={selectedMeetup._id}
              image={selectedMeetup.image}
              title={selectedMeetup.title}
              address={selectedMeetup.address}
              description={selectedMeetup.description}
            />

            <button
              className={classes.backButton}
              type="button"
              onClick={closeDetail}
            >
              Back to all meetups
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default listMeetups;
