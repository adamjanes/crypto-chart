import React from 'react'
import { Paper, List, ListItem, ListItemText, makeStyles } from '@material-ui/core'

const useStyles = makeStyles({
  paper: {
    border: '1px solid #333333',
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
  },
  logo: {
    padding: '10px 0px',
  },
})

const SelectedCoin = ({ coin }) => {
  const classes = useStyles()
  const flatCoin = { ...coin, ...coin.market_data }

  const listItems = Object.keys(flatCoin).map(
    key =>
      typeof coin[key] === 'string' ||
      (typeof flatCoin[key] === 'number' && (
        <ListItem key={key}>
          <ListItemText primary={key} secondary={flatCoin[key]} />
        </ListItem>
      ))
  )

  return (
    <Paper className={classes.paper} elevation={0}>
      <a href={`https://coinmarketcap.com/currencies/${coin.id}`} target="_blank" rel="noreferrer">
        <img className={classes.logo} src={coin.image.small || ''} alt="Coin logo" />
      </a>
      <List dense>{listItems}</List>
    </Paper>
  )
}

export default SelectedCoin
