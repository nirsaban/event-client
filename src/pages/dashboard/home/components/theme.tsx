import React from 'react';
import { Card } from '@mui/material';
import { CardMedia } from '@mui/material';
import { CountdownTimer } from './CountdownTimer';
import { makeStyles } from '@mui/styles';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import './theme.css';
const useStyles = makeStyles({
  root: {
    maxWidth: '100%'
  },
  media: {
    maxHeight: '20vh',
    width: '100%'
  }
});

export const ThemeEvent: React.FC<any> = (props) => {
  const duiDate = parseInt(props.date);
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <div style={{ position: 'relative' }}>
        <CardMedia
          className={classes.media}
          style={{ height: '350px' }}
          component="img"
          image={props.image}
          title="event"
          alt="event"
        />
        <div style={{ position: 'absolute', color: 'white', top: 10, left: '50%', transform: 'translateX(-50%)' }}>
          <Typography gutterBottom variant="h5" component="h2">
            Save The Date
          </Typography>
          <CountdownTimer targetDate={duiDate} />
        </div>
      </div>
    </Card>
  );
};
