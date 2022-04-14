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
    permasalahan: '',
    guru: '',
    nama: '',
    kelas: '',
    jam: '',
    status: '',
});

const clickHandler = (textInput) => {
    return (value) => {
        onChangeText({ ...text, [textInput]: value });
    }
}

  const [newName, setNewName] = useState("");

  const [users, setUsers] = useState([]);
  const usersCollectionRef = collection(db, "konseling");


  const deleteUser = async (id) => {
    const userDoc = doc(db, "konseling", id);
    await deleteDoc(userDoc);
  };

  useEffect(() => {
    const getUsers = async () => {
      let fetchdata = doc(db, 'konseling', dataQuery.id)
      const dataAll = await getDoc(fetchdata);
      console.log(dataAll.data())

      formik.setValues({
        permasalahan: dataAll.data().permasalahan,
        nama: dataAll.data().nama,
        guru: dataAll.data().guru,
        deskripsi: dataAll.data().deskripsi,
        jam: dataAll.data().jam,
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
      permasalahan: '',
      guru: '',
      nama: '',
      kelas: '',
      jam: '',
      status: '',
      policy: false,
    },
    validationSchema: Yup.object({
      email: Yup
        .string()
        .email(
          'Must be a valid email')
        .max(255)
        .required(
          'Email is required'),
      no_induk: Yup
      .string()
      .max(255)
      .required(
        'No Induk is required'),
      nama: Yup
        .string()
        .max(255)
        .required(
          'Nama is required'),
      kelas: Yup
        .string()
        .max(255)
        .required(
          'Kelas is required'),
      role: Yup
      .string()
      .max(255)
      .required(
        'Role is required'),
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
        const userDoc = doc(db, "konseling", dataQuery.id);
        const newFields = { 
          permsalahan: formik.values.permsalahan,
          guru: formik.values.guru,
          nama: formik.values.nama,
          deskripsi: formik.values.deskripsi,
          jam: formik.values.jam,
          status: formik.values.status,
        };
        await updateDoc(userDoc, newFields);
      };

      updateUser()

      router.push('/konseling');
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
            href="/konseling"
            passHref
          >
            <Button
              component="a"
              startIcon={<ArrowBackIcon fontSize="small" />}
            >
              Konseling
            </Button>
          </NextLink>
          <form onSubmit={formik.handleSubmit}>
            <Box sx={{ my: 3 }}>
              <Typography
                color="textPrimary"
                variant="h4"
              > 
                Edit Data Konseling
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
              error={Boolean(formik.touched.permasalahan && formik.errors.permasalahan)}
              fullWidth
              helperText={formik.touched.permasalahan && formik.errors.permasalahan}
              label="Permasalahan"
              margin="normal"
              name="permasalahan"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.permasalahan}
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
              onChange={formik.handleChange}
              value={formik.values.nama}
              variant="outlined"
            />
            <TextField
              error={Boolean(formik.touched.deskripsi && formik.errors.deskripsi)}
              fullWidth
              helperText={formik.touched.deskripsi && formik.errors.deskripsi}
              label="Nama"
              margin="normal"
              name="deskripsi"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.deskripsi}
              variant="outlined"
            />
            <FormControl sx={{ m: 1, minWidth: 80 }}>
              <InputLabel id="demo-simple-select-autowidth-label">Status</InputLabel>
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
                <MenuItem value={'on pending'}>On Pending</MenuItem>
                <MenuItem value={'declined'}>Declined</MenuItem>
                <MenuItem value={'scheduled'}>Scheduled</MenuItem>
                <MenuItem value={'done'}>Done</MenuItem>
              </Select>
            </FormControl>
            <FormControl sx={{ m: 1, minWidth: 80 }}>
              <InputLabel id="demo-simple-select-autowidth-label">Guru</InputLabel>
              <Select
                labelId="demo-simple-select-autowidth-label"
                id="demo-simple-select-autowidth"
                value={formik.values.status}
                onChange={formik.handleChange('guru')}
                autoWidth
                label="Guru"
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={'on pending'}>On Pending</MenuItem>
                <MenuItem value={'declined'}>Declined</MenuItem>
                <MenuItem value={'scheduled'}>Scheduled</MenuItem>
                <MenuItem value={'done'}>Done</MenuItem>
              </Select>
            </FormControl>
            <TextField
              error={Boolean(formik.touched.jam && formik.errors.jam)}
              fullWidth
              helperText={formik.touched.jam && formik.errors.jam}
              label="Jam Pelaksanaan"
              margin="normal"
              name="jam"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              type="jam"
              value={formik.values.jam}
              variant="outlined"
            />
            <TextField
              error={Boolean(formik.touched.password && formik.errors.password)}
              fullWidth
              helperText={formik.touched.password && formik.errors.password}
              label="Password"
              margin="normal"
              name="password"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              type="password"
              value={formik.values.password}
              variant="outlined"
            />
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
