import Head from 'next/head';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
  Box,
  Button,
  Checkbox,
  Container,
  FormHelperText,
  Link,
  TextField,
  Typography,
  MenuItem,
  FormControl,
  Select,
  InputLabel,
  
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';


import { useState, useEffect } from "react";
import { db } from "../../firebase/firebase";
import {
  collection,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";



const Edit = () => {
  const router = useRouter();
  const dataQuery = router.query
  // console.log(dataQuery.id)
  
  const [text, onChangeText] = useState({
    nama: '',
    kelas: '',
    alasan: '',
    kegiatan: '',
    tanggal: '',
    status: '',
});

const clickHandler = (textInput) => {
    return (value) => {
        onChangeText({ ...text, [textInput]: value });
    }
}

  const [newName, setNewName] = useState("");

  const [users, setUsers] = useState([]);
  const usersCollectionRef = collection(db, "perizinan");


  const deleteUser = async (id) => {
    const userDoc = doc(db, "perizinan", id);
    await deleteDoc(userDoc);
  };

  useEffect(() => {
    const getUsers = async () => {
      let fetchdata = doc(db, 'perizinan', dataQuery.id)
      const dataAll = await getDoc(fetchdata);
      console.log(dataAll.data())

      formik.setValues({
        alasan: dataAll.data().alasan,
        kegiatan: dataAll.data().kegiatan,
        kelas: dataAll.data().kelas,
        nama: dataAll.data().nama,
        tanggal: dataAll.data().tanggal,
        status: dataAll.data().status,
      })
      // console.log(users.kelas)
      // const data = await getDocs(usersCollectionRef);
      // setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    getUsers();
    
  }, []);


  const formik = useFormik({
    initialValues: {
      alasan: '',
      kegiatan: '',
      nama: '',
      kelas: '',
      tanggal: '',
      status: '',
      policy: false,
    },
    validationSchema: Yup.object({
      alasan: Yup
      .string()
      .max(255)
      .required(
        'Alasan is required'),
      status: Yup
        .string()
        .max(255)
        .required(
          'Status is required'),
      kelas: Yup
        .string()
        .max(255)
        .required(
          'Kelas is required'),
      tanggal: Yup
        .string()
        .max(255)
        .required(
          'Tanggal is required'),
      kegiatan: Yup
      .string()
      .max(255)
      .required(
        'Kegiatan is required'),
      password: Yup
        .string()
        .max(255)
        .required(
          'Password is required')
    }),
    onSubmit: () => {
      // const createUser = async () => {
      //   await addDoc(usersCollectionRef, {
      //     email: formik.values.email,
      //     kelas: formik.values.kelas,
      //     nama: formik.values.nama,
      //     no_induk: formik.values.no_induk,
      //     role: formik.values.role,
      //   });
      // };

      const updateUser = async () => {
        const userDoc = doc(db, "perizinan", dataQuery.id);
        const newFields = { 
          alasan: formik.values.alasan,
          kelas: formik.values.kelas,
          nama: formik.values.nama,
          kegiatan: formik.values.kegiatan,
          tanggal: formik.values.tanggal,
        };
        await updateDoc(userDoc, newFields);
      };

      updateUser()

      router.push('/users');
    }
  });

  return (
    <>
      <Head>
        <title>
          User Edit
        </title>
      </Head>
      <Box
        component="main"
        sx={{
          alignItems: 'center',
          display: 'flex',
          flexGrow: 1,
          minHeight: '100%'
        }}
      >
        <Container maxWidth="sm">
          <NextLink
            href="/perizinan"
            passHref
          >
            <Button
              component="a"
              startIcon={<ArrowBackIcon fontSize="small" />}
            >
              Users
            </Button>
          </NextLink>
          <form onSubmit={formik.handleSubmit}>
            <Box sx={{ my: 3 }}>
              <Typography
                color="textPrimary"
                variant="h4"
              >
                Edit User
              </Typography>
              <Typography
                color="textSecondary"
                gutterBottom
                variant="body2"
              >
                Silahkan lengkapi data user di bawah ini
              </Typography>
            </Box>
            <TextField
              error={Boolean(formik.touched.kelas && formik.errors.kelas)}
              fullWidth
              helperText={formik.touched.kelas && formik.errors.kelas}
              label="Kelas"
              margin="normal"
              name="kelas"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.kelas}
              variant="outlined"
            />
            <TextField
              error={Boolean(formik.touched.nama && formik.errors.nama)}
              fullWidth
              helperText={formik.touched.nama && formik.errors.nama}
              label="Nama"
              margin="normal"
              name="nama"
              onBlur={formik.handleBlur}
              value={formik.values.nama}
              variant="outlined"
            />
            <TextField
              error={Boolean(formik.touched.no_induk && formik.errors.no_induk)}
              fullWidth
              helperText={formik.touched.no_induk && formik.errors.no_induk}
              label="Alasan"
              margin="normal"
              name="alasan"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.alasan}
              variant="outlined"
            />
            <TextField
              error={Boolean(formik.touched.no_induk && formik.errors.no_induk)}
              fullWidth
              helperText={formik.touched.no_induk && formik.errors.no_induk}
              label="Kegiatan"
              margin="normal"
              name="kegiatan"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.kegiatan}
              variant="outlined"
            />
            <TextField
              error={Boolean(formik.touched.no_induk && formik.errors.no_induk)}
              fullWidth
              helperText={formik.touched.no_induk && formik.errors.no_induk}
              label="Tanggal"
              margin="normal"
              name="tanggal"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.tanggal}
              variant="outlined"
            />
            <FormControl sx={{ m: 1, minWidth: 80 }}>
              <InputLabel id="demo-simple-select-autowidth-label">Role</InputLabel>
              <Select
                labelId="demo-simple-select-autowidth-label"
                id="demo-simple-select-autowidth"
                value={formik.values.status}
                onChange={formik.handleChange('status')}
                autoWidth
                label="Status"
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={'menunggu'}>Menunggu</MenuItem>
                <MenuItem value={'disetujui'}>Disetujui</MenuItem>
                <MenuItem value={'ditolak'}>Ditolak</MenuItem>
              </Select>
            </FormControl>
            <Box
              sx={{
                alignItems: 'center',
                display: 'flex',
                ml: -1
              }}
            >
              <Checkbox
                checked={formik.values.policy}
                name="policy"
                onChange={formik.handleChange}
              />
              <Typography
                color="textSecondary"
                variant="body2"
              >
                Saya Menyatakan Bertanggung Jawab Atas Data Yang Saya Masukkan
                
              </Typography>
            </Box>
            {Boolean(formik.touched.policy && formik.errors.policy) && (
              <FormHelperText error>
                {formik.errors.policy}
              </FormHelperText>
            )}
            <Box sx={{ py: 2 }}>
              <Button
                color="primary"
                disabled={formik.isSubmitting}
                fullWidth
                size="large"
                type="submit"
                variant="contained"
              >
                Edit User Baru
              </Button>
            </Box>
          </form>
        </Container>
      </Box>
    </>
  );
};

export default Edit;
