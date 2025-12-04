import MainNavigation from "./MainNavigation";
import Login from "../new/Login";
import classes from "./Layout.module.css";

function Layout(props) {
  return (
    <div>
      <MainNavigation />
      <main className={classes.main}>{props.children}</main>
      
    </div>
  );
}

export default Layout;
