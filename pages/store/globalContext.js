// Lets do all database stuff here and just share this global context with the rest of the App
// - so no database code anywhere else in our App
// - every CRUD function the App needs to do is in here, in one place
// - makes debugging etc so much easier
// - all external connections still have to go through /api routes 

import { createContext, useState, useEffect } from 'react'

const GlobalContext = createContext()

export function GlobalContextProvider(props) {
    const [globals, setGlobals] = useState({
        aString: 'init val',
        count: 0,
        hideHamMenu: true,
        meetings: [],
        dataLoaded: false,
        theme: 'light',
        favourites: []
    })

    useEffect(() => {
        getAllMeetings()
    }, []);

    useEffect(() => {
        if (typeof document !== 'undefined'){
            const root = document.documentElement
            const isDark = globals.theme === 'dark'

            document.body.classList.toggle('dark', isDark)
            root.classList.toggle('dark', isDark)

            if (isDark) {
                root.style.setProperty('--menu-bg', '#212121')
                root.style.setProperty('--menu-hover', '#2a2a2a')
                root.style.setProperty('--menu-text', '#eaeaea')

                root.style.setProperty('--card-bg', '#212121')
                root.style.setProperty('--card-hover', '#2a2a2a')
                root.style.setProperty('--card-text', '#ffffff')
            } 
            else {
                root.style.removeProperty('--menu-bg')
                root.style.removeProperty('--menu-hover')
                root.style.removeProperty('--menu-text')
                root.style.removeProperty('--card-bg')
                root.style.removeProperty('--card-hover')
                root.style.removeProperty('--card-text')
            }
        }
    }, [globals.theme]);

    async function getAllMeetings() {
        const response = await fetch('/api/get-meetings', {
            method: 'POST',
            body: JSON.stringify({ meetups: 'all' }),
            headers: {'Content-Type': 'application/json'}
        });
        let data = await response.json();
        setGlobals((previousGlobals) => {
            const newGlobals = JSON.parse(JSON.stringify(previousGlobals));
            newGlobals.meetings = data.meetings;
            newGlobals.dataLoaded = true;
            return newGlobals;
        })
    }

    async function editGlobalData(command) {
        if (command.cmd == 'hideHamMenu') {
            setGlobals((previousGlobals) => {
                const newGlobals = JSON.parse(JSON.stringify(previousGlobals));
                newGlobals.hideHamMenu = command.newVal; 
                return newGlobals
            })
        }

        if (command.cmd === 'toggleTheme'){
            setGlobals((previousGlobals) => {
                const newGlobals = JSON.parse(JSON.stringify(previousGlobals));
                newGlobals.theme = previousGlobals.theme === 'dark' ? 'light' : 'dark';
                return newGlobals
            });
        }

        // ⭐ NEW: toggle favourite meetup (by _id)
        if (command.cmd === 'toggleFavourite') {
            setGlobals((previousGlobals) => {
                const newGlobals = JSON.parse(JSON.stringify(previousGlobals));
                const id = command.meetupId;
                const favs = newGlobals.favourites || [];
                if (favs.includes(id)) {
                    newGlobals.favourites = favs.filter(x => x !== id);
                } 
                else {
                    newGlobals.favourites = [...favs, id];
                }
                return newGlobals;
            });
        }

        if (command.cmd == 'addMeeting') {
            const response = await fetch('/api/new-meetup', {
                method: 'POST',
                body: JSON.stringify(command.newVal),
                headers: {'Content-Type': 'application/json'}
            });
            const data = await response.json();
            setGlobals((previousGlobals) => {
                const newGlobals = JSON.parse(JSON.stringify(previousGlobals));
                newGlobals.meetings.push(command.newVal);
                return newGlobals;
            })
        }

        if (command.cmd == 'updateMeeting') {
            const response = await fetch('/api/update-meeting', {
                method: 'POST',
                body: JSON.stringify(command.newVal),
                headers: {'Content-Type': 'application/json'}
            });

            const data = await response.json();

            setGlobals((previousGlobals) => {
                const newGlobals = JSON.parse(JSON.stringify(previousGlobals));
                const index = newGlobals.meetings.findIndex((m) => m._id === command.newVal._id);
                if (index !== -1) {newGlobals.meetings[index] = command.newVal;}
                return newGlobals;
            });
        }

        if (command.cmd == 'deleteMeeting') {
            const response = await fetch('/api/delete-meeting', {
                method: 'POST',
                body: JSON.stringify({ _id: command.newVal._id }),
                headers: {'Content-Type': 'application/json'}
            });
            const data = await response.json();

            setGlobals((previousGlobals) => {
                const newGlobals = JSON.parse(JSON.stringify(previousGlobals));
                newGlobals.meetings = newGlobals.meetings.filter((m) => m._id !== command.newVal._id);
                newGlobals.favourites = (newGlobals.favourites || []).filter((id) => id !== command.newVal._id);
                return newGlobals;
            });
        }
    }

    const context = {updateGlobals: editGlobalData, theGlobalObject: globals}

    return <GlobalContext.Provider value={context}>
        {props.children}
    </GlobalContext.Provider>
}

export default GlobalContext
