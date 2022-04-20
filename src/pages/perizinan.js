import Head from 'next/head';
import { Box, Container } from '@mui/material';
import { DashboardLayout } from '../components/dashboard-layout';
import { customers } from '../__mocks__/customers';
import { KonselingListResults } from 'src/components/konseling/konseling-list-results';
import { KonselingListToolbar } from 'src/components/konseling/konseling-list-toolbar';
import { PerizinanListResults } from 'src/components/perizinan/perizinan-list-results';
import { PerizinanListToolbar } from 'src/components/perizinan/perizinan-list-toolbar';

const Perizinan = () => (
  <>
    <Head>
      <title>
        Perizinan
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
        <PerizinanListToolbar />
        <Box sx={{ mt: 3 }}>
          <PerizinanListResults />
        </Box>
      </Container>
    </Box>
  </>
);
Perizinan.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Perizinan;
