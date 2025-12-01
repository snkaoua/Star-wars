// Define a TypeScript interface that describes the shape of a Movie object.
// This helps with type safety and autocompletion in your editor.
interface Movie {
  // Unique numeric identifier for the movie (used as React key).
  id: number;

  // Short episode label (e.g. "Episode IV", "Rogue One", "Solo").
  episode: string;

  // Full title of the movie.
  title: string;

  // Release year of the movie.
  year: number;

  // Type of movie: can only be 'Saga' or 'Spin-off'.
  // 'Saga' = main Skywalker saga; 'Spin-off' = standalone/anthology movies.
  type: 'Saga' | 'Spin-off';

  // Era of the movie: restricts values to these four specific strings.
  // 'Prequel', 'Original', 'Sequel', 'Anthology'.
  era: 'Prequel' | 'Original' | 'Sequel' | 'Anthology';
}

// Hard-coded (static) list of Star Wars movies used in the table.
// The type Movie[] guarantees each object matches the Movie interface above.
const MOVIES: Movie[] = [
  { id: 1, episode: 'Episode I', title: 'The Phantom Menace', year: 1999, type: 'Saga', era: 'Prequel' },
  { id: 2, episode: 'Episode II', title: 'Attack of the Clones', year: 2002, type: 'Saga', era: 'Prequel' },
  { id: 3, episode: 'Episode III', title: 'Revenge of the Sith', year: 2005, type: 'Saga', era: 'Prequel' },
  { id: 4, episode: 'Episode IV', title: 'A New Hope', year: 1977, type: 'Saga', era: 'Original' },
  { id: 5, episode: 'Episode V', title: 'The Empire Strikes Back', year: 1980, type: 'Saga', era: 'Original' },
  { id: 6, episode: 'Episode VI', title: 'Return of the Jedi', year: 1983, type: 'Saga', era: 'Original' },
  { id: 7, episode: 'Episode VII', title: 'The Force Awakens', year: 2015, type: 'Saga', era: 'Sequel' },
  { id: 8, episode: 'Episode VIII', title: 'The Last Jedi', year: 2017, type: 'Saga', era: 'Sequel' },
  { id: 9, episode: 'Episode IX', title: 'The Rise of Skywalker', year: 2019, type: 'Saga', era: 'Sequel' },
  { id: 10, episode: 'Rogue One', title: 'Rogue One: A Star Wars Story', year: 2016, type: 'Spin-off', era: 'Anthology' },
  { id: 11, episode: 'Solo', title: 'Solo: A Star Wars Story', year: 2018, type: 'Spin-off', era: 'Anthology' },
];

// React component that renders the Movies page.
function MoviesPage() {
  return (
    // Outer page container.
    // "page-contained" likely centers content and limits max-width.
    // "movies-page" is a page-specific class for extra styling.
    <div className="page-contained movies-page">
      {/* Main heading of the page */}
      <h1>Star Wars Movies</h1>

      {/* Introductory paragraph explaining what this list is for.
          "movies-intro" is a CSS class to style this text (margin, font-size, etc.). */}
      <p className="movies-intro">
        Here is a quick overview of the main Star Wars saga episodes and standalone
        movies. This list is static and meant just to give context while you play
        with the character search.
      </p>

      {/* Wrapper around the table.
          Often used to make the table scrollable on small screens
          (e.g. overflow-x: auto). */}
      <div className="movies-table-wrapper">
        {/* Main HTML table displaying the list of movies.
            "movies-table" is used for table-specific styles (borders, zebra rows, etc.). */}
        <table className="movies-table">
          <thead>
            <tr>
              {/* Table header cells define the column titles */}
              <th>Episode</th>
              <th>Title</th>
              <th>Year</th>
              <th>Type</th>
              <th>Era</th>
            </tr>
          </thead>
          <tbody>
            {/* Iterate over the static MOVIES array and render one table row per movie. */}
            {MOVIES.map((m) => (
              // Use movie "id" as the React key to uniquely identify each row.
              <tr key={m.id} className="movies-row">
                {/* Display basic movie properties directly in table cells */}
                <td>{m.episode}</td>
                <td>{m.title}</td>
                <td>{m.year}</td>

                {/* TYPE column:
                    - Wrap the type ('Saga' or 'Spin-off') in a <span> with pill styles.
                    - If type is 'Saga', use 'pill pill-saga'.
                      Otherwise (Spin-off), use 'pill pill-spin'.
                    - The CSS can give different colors for saga vs spin-off. */}
                <td>
                  <span
                    className={
                      m.type === 'Saga' ? 'pill pill-saga' : 'pill pill-spin'
                    }
                  >
                    {m.type}
                  </span>
                </td>

                {/* ERA column:
                    - Another <span> with pill base class plus a dynamic era-specific class.
                    - `m.era.toLowerCase()` turns "Prequel" → "prequel", "Original" → "original", etc.
                    - So final classes look like:
                        "pill pill-era-prequel"
                        "pill pill-era-original"
                        "pill pill-era-sequel"
                        "pill pill-era-anthology"
                    - In your CSS you can define different colors for each era. */}
                <td>
                  <span className={`pill pill-era-${m.era.toLowerCase()}`}>
                    {m.era}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Small note under the table.
          "movies-note" is a CSS class to style this as a secondary/footnote text. */}
      <p className="movies-note">
        Timeline is simplified and focused on the main movies – just enough to keep
        orientation in the galaxy.
      </p>
    </div>
  );
}

// Export the MoviesPage component so it can be used by the router
// when the user navigates to "/movies".
export default MoviesPage;
