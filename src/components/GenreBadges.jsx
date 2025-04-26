import { Badge } from "reactstrap";

const GenreBadges = ({genres}) => {

  const genreToColor = (genreName) => {
    let hash = 0;
    for (let i = 0; i < genreName.length; i++) {
      hash = genreName.charCodeAt(i) + ((hash << 5) - hash)
    }

    const hue = hash % 360;
    return `hsl(${hue}, 65%, 55%)`;
  }  

  return (
    <>
      {
        genres.map(genre => (
          <span 
            key={genre} 
            className={`rounded-pill px-2 py-1 genre ${genre} px-2 me-2`}
            style={{ backgroundColor: genreToColor(genre)}}
            title={genre}
          >
            {genre}
          </span>
        ))
      }
    </>
  )
};

export default GenreBadges;
