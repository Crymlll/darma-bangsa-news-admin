import Head from 'next/head';
import { Box, Container } from '@mui/material';
import { UserListResults } from '../components/users/user-list-results';
import { UserListToolbar } from '../components/users/user-list-toolbar';
import { DashboardLayout } from '../components/dashboard-layout';
import { customers } from '../__mocks__/customers';

const Customers = () => (
  <>
    <Head>
      <title>
        Users
      </title>
    </Head>
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 8
      }}
    >
      <Container maxWidth={false}>
        <UserListToolbar />
        <Box sx={{ mt: 3 }}>
          <UserListResults customers={customers} />
        </Box>
      </Container>
    </Box>
  </>
);
Customers.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Customers;
