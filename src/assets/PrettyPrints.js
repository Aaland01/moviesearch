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
 * @returns {String} "NN  NN  NN"
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

/**
 * 
 * @param {Number} boxoffice Formatted as 12345 for instance
 * @returns {String} the number in groups of three followed by dollar sign
 * i.e. 12345678  ->  12 345 678 $
 */
export const boxofficePrettyPrint = (boxoffice) => {
    if (!boxoffice) return "No Records";
    let numberString = boxoffice.toString();
    let print = ""
    for(let i = 1; i < numberString.length; i++){
      if ((numberString.length - i) % 3 === 0){
        print += " ";
      }
      print += numberString[i]
    }
    return `${print} $`;
  }
/**
 * 
 * @param {Number} runtime in the format xxxx (minutes) 
 * @returns {String} Formatted hours and minutes with labels
 * i.e.  125 -> 2 hours, 5 minutes
 */
export const runtimePrettyPrint = (runtime) => {
    if(!runtime){
        return "";
    }
    let hours = Math.floor( runtime / 60 )
    let minutes = runtime - hours*60;
    return `${hours} hours, ${minutes} minutes`;
    }