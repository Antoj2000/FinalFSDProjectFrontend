import { useContext, useState } from "react";
import classes from "./MeetupDetail.module.css";
import GlobalContext from "../../pages/store/globalContext";
import { useRouter } from "next/router";

function MeetupDetail(props) {
  const globalCtx = useContext(GlobalContext);
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();

  function toggleMenu() {
    setMenuOpen((prev) => !prev);
  }

  async function handleUpdate() {
    setMenuOpen(false);

    const newTitle = window.prompt("Edit title", props.title);
    if (newTitle === null) return;

    const newImage = window.prompt("Edit image URL", props.image);
    if (newImage === null) return;

    const newAddress = window.prompt("Edit Address", props.address);
    if (newAddress === null) return;

    const newDescription = window.prompt("Edit Description", props.description);
    if (newDescription === null) return;

    await globalCtx.updateGlobals({
      cmd: "updateMeeting",
      newVal: {
        _id: props.id,
        meetingId: newTitle,
        image: newImage,
        address: newAddress,
        description: newDescription,
      },
    });
  }

  async function handleDelete() {
    setMenuOpen(false);

    const ok = window.confirm("Are you sure you want to delete this meetup?");
    if (!ok) return;

    await globalCtx.updateGlobals({
      cmd: "deleteMeeting",
      newVal: { _id: props.id },
    });

    router.push("/meetups");
  }

  return (
    <section className={classes.detail}>
      <img src={props.image} alt={props.title} />

      <div className={classes.titleRow}>
        <h1>{props.title}</h1>

        <div className={classes.gearWrapper}>
          <button
            className={classes.gearButton}
            type="button"
            onClick={toggleMenu}
            title="Options"
          >
            ⚙
          </button>

          {menuOpen && (
            <div className={classes.dropdown}>
              <button
                type="button"
                className={classes.dropdownItem}
                onClick={handleUpdate}
              >
                Update
              </button>
              <button
                type="button"
                className={classes.dropdownItemDanger}
                onClick={handleDelete}
              >
                Delete
              </button>
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
