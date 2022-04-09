import Head from 'next/head';
import { Box, Container, Grid, Pagination } from '@mui/material';
import { products } from '../__mocks__/products';
import { BeritaListToolbar } from '../components/berita/berita-list-toolbar';
import { BeritaCard } from '../components/berita/berita-card';
import { BeritaCard2 } from '../components/berita/berita-card2';
import { DashboardLayout } from '../components/dashboard-layout';

const Products = () => (
  <>
    <Head>
      <title>
        Berita Sekolah
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
        <BeritaListToolbar />
        <Box sx={{ mt: 3 }}>
          <BeritaCard2 />
        </Box>
        
        
      </Container>
    </Box>
  </>
);

Products.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Products;
