import { Avatar, Box, Card, Button, CardContent, Grid, LinearProgress, Typography } from '@mui/material';
import PeopleIcon from '@mui/icons-material/PeopleOutlined';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

export const TasksProgress = (props) => (
  <Card {...props}>
    <Button
      href='/users'
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
            TOTAL GURU
          </Typography>
          <Typography
            color="textPrimary"
            variant="h4"
          >
            32
          </Typography>
        </Grid>
        <Grid item>
          <Avatar
            sx={{
              backgroundColor: 'success.main',
              height: 56,
              width: 56
            }}
          >
            <PeopleIcon />
          </Avatar>
        </Grid>
      </Grid>
      <Box
        sx={{
          alignItems: 'center',
          display: 'flex',
          pt: 2
        }}
      >
        <ArrowDownwardIcon color="error" />
        <Typography
          variant="body2"
          sx={{
            mr: 1
          }}
        >
          6%
        </Typography>
        <Typography
          color="textSecondary"
          variant="caption"
        >
          dari tahun ajaran lalu
        </Typography>
      </Box>
    </CardContent>
    </Button>
  </Card>
);
