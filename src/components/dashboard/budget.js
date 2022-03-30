import { Avatar, Box, Card, CardContent, Grid, Typography, Button } from '@mui/material';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import MoneyIcon from '@mui/icons-material/Money';
import { set } from 'nprogress';

export const Budget = (props) => (
  <Card
    sx={{ height: '100%' }}
    {...props}
    >
    <Button
      href='/products'
    >
    <CardContent>
      <Grid
        container
        spacing={3}
        sx={{ justifyContent: 'space-between' }}
      >
        <Grid item>
          <Typography
            color="textSecondary"
            gutterBottom
            variant="overline"
          >
            TOTAL POST
          </Typography>
          <Typography
            color="textPrimary"
            variant="h4"
          >
            215
          </Typography>
        </Grid>
        <Grid item>
          <Avatar
            sx={{
              backgroundColor: 'error.main',
              height: 56,
              width: 56
            }}
          >
            <MoneyIcon />
          </Avatar>
        </Grid>
      </Grid>
      <Box
        sx={{
          pt: 2,
          display: 'flex',
          alignItems: 'center'
        }}
      >
        <ArrowDownwardIcon color="error" />
        <Typography
          color="error"
          sx={{
            mr: 1
          }}
          variant="body2"
        >
          2 Post
        </Typography>
        <Typography
          color="textSecondary"
          variant="caption"
        >
          Dari bulan lalu
        </Typography>
      </Box>
    </CardContent>
    </Button>
  </Card>
);
