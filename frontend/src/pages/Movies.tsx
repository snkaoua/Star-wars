// MoviesPage component: defines a typed, static list of Star Wars movies and renders it as a table, 
// using simple “pill” labels to visually highlight each movie’s type and era.

interface Movie {
  id: number;
  episode: string;
  title: string;
  year: number;
 
  type: 'Saga' | 'Spin-off';

  era: 'Prequel' | 'Original' | 'Sequel' | 'Anthology';
}

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

function MoviesPage() {
  return (
    <div className="page-contained movies-page">
      <h1>Star Wars Movies</h1>

      <p className="movies-intro">
        Here is a quick overview of the main Star Wars saga episodes and standalone
        movies. This list is static and meant just to give context while you play
        with the character search.
      </p>

      <div className="movies-table-wrapper">
        <table className="movies-table">
          <thead>
            <tr>
              <th>Episode</th>
              <th>Title</th>
              <th>Year</th>
              <th>Type</th>
              <th>Era</th>
            </tr>
          </thead>
          <tbody>
            {MOVIES.map((m) => (
              <tr key={m.id} className="movies-row">
                <td>{m.episode}</td>
                <td>{m.title}</td>
                <td>{m.year}</td>

                <td>
                  <span
                    className={
                      m.type === 'Saga' ? 'pill pill-saga' : 'pill pill-spin'
                    }
                  >
                    {m.type}
                  </span>
                </td>

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

      <p className="movies-note">
        Timeline is simplified and focused on the main movies – just enough to keep
        orientation in the galaxy.
      </p>
    </div>
  );
}

export default MoviesPage;
