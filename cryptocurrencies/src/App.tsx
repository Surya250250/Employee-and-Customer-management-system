import axios from 'axios';
import { useEffect, useState } from 'react'

import type { ChartData, ChartOptions } from 'chart.js';
import './App.css';
import { __String } from 'typescript';
import Cryptosummary from './components/cryptosummary';
import { Crypto } from "./types/crypto";
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
import moment from 'moment';
import Dropdown from './dropdown';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function App() {
  const [range, setrange] = useState<string>('30')
  const [cryptos, setcryptos] = useState<Crypto[] | null>([]);
  const [selected, setselected] = useState<Crypto | null>()
  const [data, setdata] = useState<ChartData<'line'>>()
  const [options, setoptions] = useState<ChartOptions<'line'>>(

    {
      responsive: true,

      plugins: {
        legend: {
          position: 'top' as const,
        },
        title: {
          display: false,
          text: 'Chart.js Line Chart',
        },
      },
    }
  )
  useEffect(() => {

    const url: string = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false&locale=en'
    axios.get(url).then((response) => {
      console.log(response.data)
      setcryptos(response.data)
    })
  }, [])

  useEffect(() => {

    if (selected) {
      const url = `https://api.coingecko.com/api/v3/coins/${selected.id}/market_chart?vs_currency=usd&days=${range}&interval=daily`;
      axios
        .get(url)
        .then((response) => {
          console.log('getting crypto');
          console.log(response.data);
          setdata({
            labels: response.data.prices.map((price: number[]) => {
              return moment.unix(price[0] / 1000).format('MM-DD');
            }),
            datasets: [
              {
                label: selected.id,
                data: response.data.prices.map((price: number[]) => {
                  return price[1];
                }),
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
              },
            ],
          });
          setoptions({
            responsive: true,

            plugins: {
              legend: {
                position: 'top' as const,
              },
              title: {
                display: false,
                text: `${selected?.name} Price over last ${range === '1' ? `${range} day` : ` ${range} days`}`,
              },
            },
          })
        })
        .catch((error) => {
          console.error('Error fetching data:', error);
        });
    }
  }, [selected, range])
  // Add the missing closing parenthesis for the useEffect dependency array


  return (
    <>
      <div className='App'>
        <select
          onChange={(e) => {
            const d = cryptos?.find((x) => x.id === e.target.value);
            setselected(d);
          }}
        >
          <option defaultValue='value'>Choose a crypto currency</option>

          {cryptos ? cryptos.map((c) => {
            return <option key={c.id} value={c.id}>{c.name}</option>
          }) : null}
        </select>

        <select onChange={(e) => {
          setrange(e.target.value)
        }}>
          <option value='30'>30 days</option>
          <option value='7'>7 days</option>
          <option value='1'>1 day</option>
        </select>
      </div>
      {selected ? <Cryptosummary crypto={selected} /> : null}
      {data ? <div style={{ height: 600, width: 600 }} ><Line options={options} data={data} /></div> : null}


    </>
  )

}

export default App;
