import { API_URL } from "../Moviesearch";

const rowCount = 100

const infiniteDatasource = (URL, searchParams) => ({
  getRows: async (params) => {
    try {
      const { startRow } = params;
      const queryParams = new URLSearchParams(searchParams);

      const page = Math.floor(startRow / 100 ) + 1;
      queryParams.append("page", page);
      
      const nextMoviesURL = `${API_URL}${URL}?${queryParams}`
      // development
      console.log(nextMoviesURL);
      
      const response = await fetch(nextMoviesURL)
      if (!response.ok) throw new Error("Inf - Failed to fetch data")
      
      const json = await response.json();
      const data = json.data

      const rowsThisPage = data ? data : []
      
      let lastRow = undefined;
      if (rowsThisPage.length < rowCount) {
        lastRow = startRow + rowsThisPage.length;
      } 

      params.successCallback(rowsThisPage, lastRow)

    } catch (error) {
      console.error("Error fetching infinite rows:", error);
      params.failCallback();   
    }
  }
})


export default infiniteDatasource;