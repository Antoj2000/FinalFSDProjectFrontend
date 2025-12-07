import classes from './HamMenuContent.module.css'
import { useRouter } from 'next/router'
import { useContext, useState } from 'react'
import GlobalContext from "../../pages/store/globalContext"

export default function HamMenuContent(props) {
  const globalCtx = useContext(GlobalContext)
  const router = useRouter()
  const [meetupsOpen, setMeetupsOpen] = useState(true)  // start expanded

  // If menu is hidden, render nothing
  if (globalCtx.theGlobalObject.hideHamMenu) {return null}

  function clicked(webAddress) {globalCtx.updateGlobals({ cmd: 'hideHamMenu', newVal: true })
    router.push(webAddress)
  }

  function closeMe() {globalCtx.updateGlobals({ cmd: 'hideHamMenu', newVal: true })}

  const isDark = globalCtx.theGlobalObject.theme === 'dark';

  function toggleTheme() {globalCtx.updateGlobals({ cmd: 'toggleTheme'});}

  function toggleMeetups() {setMeetupsOpen(prev => !prev)}

  const contentJsx = []

  contentJsx.push(
    <div className={classes.themeRow} key="theme-toggle">
      <span className={classes.themeLabel}>Light</span>
      <label className={classes.switch}>
        <input type="checkbox" checked={isDark} onChange={toggleTheme}/>
        <span className={classes.slider}>
          <span className={classes.icon}>{isDark ? '🌙' : '☀️'}</span>
        </span>
      </label>
      <span className={classes.themeLabel}>Dark</span>
    </div>
  );

  contentJsx.push(<div className={classes.menuItemTop} key="add-new" onClick={() => clicked('/new-meetup')}>
      Add new meetup
    </div>
    )

  contentJsx.push(
    <div className={classes.menuItemGroup} key="meetups-group" onClick={toggleMeetups}>
      <span>Meetups</span>
      <span className={`${classes.arrow} ${meetupsOpen ? classes.arrowOpen : ''}`}>▸</span>
    </div>
  )
  if (meetupsOpen) {

    contentJsx.push(<div className={`${classes.menuItem} ${classes.subItem} ${classes.allItem}`} key="all-meetups" onClick={() => clicked('/meetups')}>
        ALL MEETUPS
    </div>
    );

    props.contents.forEach((item, index) => {
      contentJsx.push( <div className={`${classes.menuItem} ${classes.subItem}`} key={'meet-' + index}onClick={() => clicked(item.webAddress)}>
          {item.title}
        </div>
      )
    })
  }

  return (
    <div className={classes.background} onClick={closeMe}>
      <div className={classes.mainContent}
        // keep clicks inside from closing
        onClick={e => e.stopPropagation()}>{contentJsx}</div>
    </div>
  );
}
