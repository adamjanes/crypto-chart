import React, { useEffect, useState } from "react"
// import { json } from "d3"
import { AppBar, Container, Toolbar, Grid } from "@material-ui/core"
import CoinGecko from "coingecko-api"
import LineChart from "./components/LineChart"
import SelectedCoin from "./components/SelectedCoin"

const App = () => {
  const [selected, setSelected] = useState(null)
  const [data, setData] = useState([])

  useEffect(() => {
    const CoinGeckoClient = new CoinGecko()

    // CoinGeckoClient.coins
    //   .all({
    //     per_page: 250,
    //     localization: false,
    //     page: 1,
    //   })
    const ps = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14].map((p) =>
      CoinGeckoClient.coins.all({
        per_page: 250,
        localization: false,
        page: p,
      })
    )
    Promise.all(ps).then((pages) => {
      const data = pages.reduce((curr, acc) => [...curr, ...acc.data], [])
      console.log(data)

      setData(
        data
          .filter(
            (d) =>
              !d.market_data?.price_change_percentage_200d &&
              d.market_data?.price_change_percentage_60d &&
              d.market_data?.price_change_percentage_30d &&
              d.market_data?.price_change_percentage_60d < 20 &&
              d.market_data?.price_change_percentage_7d < 0 &&
              d.market_data?.total_volume.usd > 50000
          )
          .map((d) => {
            return {
              ...d,
              vals: [
                {
                  date: new Date(new Date().setDate(new Date().getDate() - 60)),
                  price: -(
                    +d.market_data?.price_change_percentage_60d_in_currency
                      ?.usd || 0
                  ),
                },
                {
                  date: new Date(new Date().setDate(new Date().getDate() - 30)),
                  price: -(
                    +d.market_data?.price_change_percentage_30d_in_currency
                      ?.usd || 0
                  ),
                },
                {
                  date: new Date(new Date().setDate(new Date().getDate() - 14)),
                  price: -(
                    +d.market_data?.price_change_percentage_14d_in_currency
                      ?.usd || 0
                  ),
                },
                {
                  date: new Date(new Date().setDate(new Date().getDate() - 7)),
                  price: -(
                    +d.market_data?.price_change_percentage_7d_in_currency
                      ?.usd || 0
                  ),
                },
                {
                  date: new Date(new Date().setDate(new Date().getDate() - 1)),
                  price: -(
                    +d.market_data?.price_change_percentage_24h_in_currency
                      ?.usd || 0
                  ),
                },
                {
                  date: new Date(),
                  price: 0.01,
                },
              ].filter((d) => d.price !== 0),
            }
          })
      )
    }).catch(e => console.log(e))
  }, [])

  // console.log(Object.keys(selected))
  console.log(data, data.length)

  return (
    <div>
      <AppBar position="static">
        <Toolbar></Toolbar>
      </AppBar>
      <Toolbar></Toolbar>
      <Container style={{ height: "500px" }}>
        <Grid style={{ height: "500px" }} container spacing={3}>
          <Grid style={{ height: "500px" }} item xs={12} md={9}>
            {!!data.length && (
              <LineChart data={data} setSelected={setSelected} />
            )}
          </Grid>
          <Grid item xs={12} md={3}>
            {selected && <SelectedCoin coin={selected} />}
          </Grid>
        </Grid>
      </Container>
    </div>
  )
}

export default App
