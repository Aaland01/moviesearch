import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

// https://codesandbox.io/p/devbox/xenodochial-hoover-1695r?embed=1&file=%2FApp.tsx%3A2%2C1-11%2C19

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Graph = ( {movies} ) => {

  const ratings = movies.map((movie) => movie.imdbRating);
  const labels = movies.map((movie) => `${movies.indexOf(movie) + 1}`)

  const options = {
    responsive: true,
    plugins: {
      legend: {display:false,},
      title:{display:false,},
      tooltip: {
        callbacks: {
          title: (context) => {
            const index = context[0].dataIndex;
            const movie = movies[index];
            const title = movie.movieName || `E${index + 1}`;
            return `${title}`
          },
          label: (context) => {
            const rating = context.raw;
            return `Rated: ${rating}`;
          }
        }
      }
    },
    scales: {
      x: {
        ticks: {
          display: false,
          color: "#AFAFAF"
        },
        grid: {
          color: 'rgba(0,0,0,0)'
        },
        title: {
          display: true,
          text: 'Movies',
          color: "#AFAFAF"
        },
      },
      y: {
        ticks: {
          color: "#AFAFAF"
        },
        grid: {
          color: '#292926'
        },
        title: {
          display: true,
          text: 'Ratings',
          color: "#AFAFAF"
        },
      }
    }
  };

  const data = {
    labels,
    datasets: [
      {
        label: 'IMDB Ratings',
        data: ratings,
        borderColor: '#F8A62650',
        backgroundColor: '#F8A626',
      },
    ],
  };

  return (
    <>
      <div className="chartwrapper">
        <Line options={options} data={data} />
      </div>
      
    </>
  )
};

export default Graph;
