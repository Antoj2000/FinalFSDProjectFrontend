import MeetupList from '../components/meetups/MeetupList'
import { useContext } from "react";
import GlobalContext from "./store/globalContext"
import Dashboard from '../components/new/Dashboard';

function HomePage() {
  const globalCtx = useContext(GlobalContext);
  //const [selectedMeetup, setSelectedMeetup] = useState(null);

    if (globalCtx.theGlobalObject.dataLoaded == true) {
        return <Dashboard />
    }
    return <div>Loading data from database, please wait . . . </div>
}

export default HomePage;
