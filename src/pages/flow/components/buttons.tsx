import { Box, Button, Grid } from '@mui/material';
import { UsersEntity, flowOrder } from '../../../common/types/entites/user.entity';

export const ButtonsFooter = <ValidationSchemaGeneric,>({ back, state, step }) => {
  console.log(step);
  return (
    <Grid
      container
      sx={{
        display: 'flex',
        padding: 1,
        justifyContent: `${flowOrder.indexOf(step) > 1 ? 'space-between' : 'center'}`,
        margin: 'auto auto'
      }}
    >
      <Box>
        {flowOrder.indexOf(step) === flowOrder.length - 2 ? (
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
            סיים ושלח
          </Button>
        ) : (
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
            הבא
          </Button>
        )}
      </Box>
      <Box>
        {flowOrder.indexOf(step) > 1 ? (
          <Button
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={(e) => back<ValidationSchemaGeneric>(e, state)}
          >
            חזור
          </Button>
        ) : (
          ''
        )}
      </Box>
    </Grid>
  );
};
