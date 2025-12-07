import classes from "./HamMenuContent.module.css";
import { useRouter } from "next/router";
import { useContext, useState } from "react";
import GlobalContext from "../../pages/store/globalContext";

export default function HamMenuContent(props) {
  const globalCtx = useContext(GlobalContext);
  const router = useRouter();
  const [meetupsOpen, setMeetupsOpen] = useState(true); // start expanded
  const [isClosing, setIsClosing] = useState(false);

  // If menu is hidden, render nothing
  if (globalCtx.theGlobalObject.hideHamMenu && !isClosing) {
    return null;
  }

  function clicked(webAddress) {
    globalCtx.updateGlobals({ cmd: "hideHamMenu", newVal: true });
    router.push(webAddress);
  }

  function closeMe() {
    setIsClosing(true);

    setTimeout(() => {
      globalCtx.updateGlobals({ cmd: "hideHamMenu", newVal: true });
      setIsClosing(false); // reset state
    }, 250);
  }

  const isDark = globalCtx.theGlobalObject.theme === "dark";

  function toggleTheme() {
    globalCtx.updateGlobals({ cmd: "toggleTheme" });
  }

  function toggleMeetups() {
    setMeetupsOpen((prev) => !prev);
  }

  const contentJsx = [];

  contentJsx.push(
    <div className={classes.themeRow} key="theme-toggle">
      <span className={classes.themeLabel}>Light</span>
      <label className={classes.switch}>
        <input type="checkbox" checked={isDark} onChange={toggleTheme} />
        <span className={classes.slider}>
          <span className={classes.icon}>{isDark ? "🌙" : "☀️"}</span>
        </span>
      </label>
      <span className={classes.themeLabel}>Dark</span>
    </div>
  );

  contentJsx.push(
    <div
      className={classes.menuItemTop}
      key="add-new"
      onClick={() => clicked("/new-meetup")}
    >
      Add a New Meetup
    </div>
  );

  contentJsx.push(
    <div
      className={classes.menuItemGroup}
      key="meetups-group"
      onClick={toggleMeetups}
    >
      <span>Meetups</span>
      <span
        className={`${classes.arrow} ${meetupsOpen ? classes.arrowOpen : ""}`}
      >
        ▸
      </span>
    </div>
  );
  if (meetupsOpen) {
    contentJsx.push(
      <div
        className={`${classes.menuItem} ${classes.subItem} ${classes.allItem}`}
        key="all-meetups"
        onClick={() => clicked("/meetups")}
      >
        Go to All Meetups
      </div>
    );

    props.contents.forEach((item, index) => {
      contentJsx.push(
        <div
          className={`${classes.menuItem} ${classes.subItem}`}
          key={"meet-" + index}
          onClick={() => clicked(item.webAddress)}
        >
          {item.title}
        </div>
      );
    });
  }

  return (
    <div
      className={`${classes.background} ${isClosing ? classes.closing : ""}`}
      onClick={closeMe}
    >
      <div
        className={`${classes.mainContent} ${isClosing ? classes.closing : ""}`}
        // keep clicks inside from closing
        onClick={(e) => e.stopPropagation()}
      >
        {contentJsx}
      </div>
    </div>
  );
}
