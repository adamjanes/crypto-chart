import React from "react"
import {
  Paper,
  List,
  ListItem,
  ListItemText,
  makeStyles,
} from "@material-ui/core"

const useStyles = makeStyles({
  paper: {
    border: "1px solid #333333",
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
  },
  logo: {
    padding: "10px 0px",
  },
})

const SelectedCoin = ({ coin }) => {
  const classes = useStyles()
  const flatCoin = { ...coin, ...coin.market_data }

  return (
    <Paper className={classes.paper} elevation={0}>
      <a href={`https://coinmarketcap.com/currencies/${coin.id}`} target="_blank">
        <img className={classes.logo} src={coin.image.small || ""} alt="Logo" />
      </a>
      <List dense>
        {Object.keys(flatCoin).map((key) => {
          if (
            typeof coin[key] === "string" ||
            typeof flatCoin[key] === "number"
          ) {
            return (
              <ListItem key={key}>
                <ListItemText primary={key} secondary={flatCoin[key]} />
              </ListItem>
            )
          }
        })}
      </List>
    </Paper>
  )
}

export default SelectedCoin
