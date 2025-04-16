/**
 * 
 * @param {Object} movieObj - json object on the format:
 * {... ,
 *  imdbRating: value,
 *  rottenTomatoesRating: null,
 *  metacriticRating: value,
 *  ... ,
 * 
 *  Turns three separate values into a single string with spacing 
 *      to fit into one column
 * }
 * 
 * @returns "NN  NN  NN"
 */
export const ratingsPrettyPrint = (movieObj) => {
    const ratings = []
    if(movieObj.imdbRating){
      let imdbRating = movieObj.imdbRating.toString();
      if(!imdbRating.includes(".")) imdbRating += ".0";
      ratings.push(imdbRating)
    } else ratings.push("\u00A0\u00A0\u00A0");

    ratings.push(movieObj.rottenTomatoesRating ? movieObj.rottenTomatoesRating.toString() : "\u00A0\u00A0\u00A0\u00A0\u00A0");
    ratings.push(movieObj.metacriticRating ? movieObj.metacriticRating.toString() : "");
    
    return ratings.join("\u00A0\u00A0\u00A0");
  }