// AboutPage component: displays a short explanation about the Star Wars universe
//  and what this app lets the user do.

function AboutPage() {
  return (
    
    <div className="page-contained">
      <h1>About the Star Wars Saga</h1>

      
      <p>
        Star Wars is an epic space opera that tells the story of a galaxy torn
        between the light side and the dark side of the Force. The saga begins
        with the fall of the Galactic Republic, the rise of the Empire and the
        tragic transformation of Anakin Skywalker into Darth Vader, and later
        follows the fight of a new generation of heroes to restore freedom to the
        galaxy.
      </p>

      <p>
        The main story is told across nine saga films, from <strong>Episode I:
        The Phantom Menace</strong> to <strong>Episode IX: The Rise of
        Skywalker</strong>. Along the way we meet Jedi Knights, Sith Lords,
        smugglers, bounty hunters, droids and rebels – all connected through
        family, friendship and the Force.
      </p>

      <p>
        In addition to the Skywalker saga, there are also standalone movies such
        as <strong>Rogue One</strong> and <strong>Solo</strong>, which explore
        side stories in the same universe: the theft of the Death Star plans, the
        early adventures of Han Solo and more.
      </p>

      <p>
        This app gives you a small window into that universe: you can search for
        characters, see basic information about them and browse a simple list of
        the movies to better understand where each story fits in the timeline.
      </p>
    </div>
  );
}

export default AboutPage;
 