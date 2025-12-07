import { useRef, useState } from "react";

import classes from "./NewMeetupForm.module.css";
import ImagePicker from "../new/image-picker/image-picker";

function NewMeetupForm(props) {
  const [pickedImage, setPickedImage] = useState(null);

  const titleInputRef = useRef();
  const imageInputRef = useRef();
  const addressInputRef = useRef();
  const descriptionInputRef = useRef();

  function submitHandler(event) {
    event.preventDefault();

    const enteredTitle = titleInputRef.current.value;
    const enteredImageURL = imageInputRef.current?.value || null;
    const finalImage = pickedImage || enteredImageURL;

    if(!finalImage){
      alert("You must provide an image, either URL or file.");
      return;
    }

    const enteredAddress = addressInputRef.current.value;
    const enteredDescription = descriptionInputRef.current.value;

    const meetupData = {
      meetingId: enteredTitle,
      title: enteredTitle,
      image: finalImage,
      address: enteredAddress,
      description: enteredDescription,
    };

    props.onAddMeetup(meetupData);
  }

  return (
    <>
      <header className={classes.header}>
        <h1>
          Share your{" "}
          <span className={classes.highlight}>favorite meetup spot</span>
        </h1>
        <p>Or any other spot you feel needs sharing!</p>
      </header>
      <main className={classes.main}>
        <form className={classes.form} onSubmit={submitHandler}>
          <div className={classes.row}>
            <p>
              <label htmlFor="title">
                Meetup Title (must be unique: it's the meeting ID)
              </label>
              <input type="text" required id="title" ref={titleInputRef} />
            </p>
          </div>
          {!pickedImage && (
            <p>
              <label htmlFor="image">Meetup Image URL</label>
              <input type="url" id="image" ref={imageInputRef} />
            </p>
          )}
          <p>
            <label htmlFor="address">Address</label>
            <input type="text" required id="address" ref={addressInputRef} />
          </p>
          <p>
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              required
              rows="5"
              ref={descriptionInputRef}
            ></textarea>
          </p>
          <ImagePicker
            label="Your image"
            name="image"
            onImagePicked={setPickedImage}
          />
          <div className={classes.actions}>
            <button>Add Meetup</button>
          </div>
        </form>
      </main>
    </>
  );
}

export default NewMeetupForm;
