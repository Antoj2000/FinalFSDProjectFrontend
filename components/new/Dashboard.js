import Link from "next/link";
import classes from "./Dashboard.module.css";

export default function Dashboard() {
  return (
    <>
      <header className={classes.header}>
        <div className={classes.slideshow}></div>
        <div>
          <div className={classes.hero}>
            <h1>Find Meetup Spots for Scenic Meetups</h1>
            <p>Explore & share meetups from all over the world.</p>
          </div>
          <div className={classes.cta}>
            <Link href="/community">Join the community</Link>
            <Link href="/meals">Explore Meetups</Link>
          </div>
        </div>
      </header>
      <main>
        <section className={classes.section}>
          <h2>How it works</h2>
          <p>
            S&A Meetups is a simple way to share your favourite meetup spots
            with the world. Browse unique locations submitted by other users,
            save places you want to visit, and discover hidden gems you would
            never find on Google Maps
          </p>
          <p>
            Whether it&apos;s a cosy café, a scenic overlook, or a lively urban
            hangout, S&A Meetups helps travellers and locals connect through
            shared experiences.
          </p>
        </section>

        <section className={classes.section}>
          <h2>Why S&A Meetups?</h2>
          <p>
            S&A Meetups shows real places recommended by real people. It&apos;s
            built for anyone who loves exploring, documenting meaningful spots,
            and finding new places with a personal touch.
          </p>
          <p>
            By sharing your experiences, you contribute to a growing community
            of explorers who value authenticity over algorithms.
          </p>
        </section>
      </main>
    </>
  );
}
