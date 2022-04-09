import Head from 'next/head';
import { Box, Container } from '@mui/material';
import { DashboardLayout } from '../components/dashboard-layout';
import { customers } from '../__mocks__/customers';
import { KonselingListResults } from 'src/components/konseling/konseling-list-results';
import { KonselingListToolbar } from 'src/components/konseling/konseling-list-toolbar';

const Konseling = () => (
  <>
    <Head>
      <title>
        Konseling
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
        <KonselingListToolbar />
        <Box sx={{ mt: 3 }}>
          <KonselingListResults />
        </Box>
      </Container>
    </Box>
  </>
);
Konseling.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Konseling;
