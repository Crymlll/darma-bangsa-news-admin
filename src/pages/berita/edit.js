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
    id: '',
    judul: '',
    konten: '',
});

const clickHandler = (textInput) => {
    return (value) => {
        onChangeText({ ...text, [textInput]: value });
    }
}

  const [newName, setNewName] = useState("");

  const [users, setUsers] = useState([]);
  const usersCollectionRef = collection(db, "berita");


  const deleteUser = async (id) => {
    const userDoc = doc(db, "berita", id);
    await deleteDoc(userDoc);
  };

  useEffect(() => {
    const getUsers = async () => {
      let fetchdata = doc(db, 'berita', dataQuery.id)
      const dataAll = await getDoc(fetchdata);
      console.log(dataAll.data())

      formik.setValues({
        id: dataAll.data().urutan,
        judul: dataAll.data().judul,
        konten: dataAll.data().konten,
      })
      // console.log(users.kelas)
      // const data = await getDocs(usersCollectionRef);
      // setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    getUsers();
    
  }, []);


  const formik = useFormik({
    initialValues: {
      id: '',
      judul: '',
      konten: '',
      policy: false,
    },
    validationSchema: Yup.object({
      id: Yup
      .string()
      .max(255)
      .required(
        'ID is required'),
      judul: Yup
        .string()
        .max(255)
        .required(
          'Judul is required'),
      konten: Yup
        .string()
        .max(255)
        .required(
          'Konten is required'),
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
          urutan: formik.values.id,
          judul: formik.values.judul,
          konten: formik.values.konten,
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
            href="/berita"
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
              label="ID"
              margin="normal"
              name="id"
              onBlur={formik.handleBlur}
              value={formik.values.id}
              variant="outlined"
            />
            <TextField
              error={Boolean(formik.touched.nama && formik.errors.nama)}
              fullWidth
              helperText={formik.touched.nama && formik.errors.nama}
              label="Judul"
              margin="normal"
              name="judul"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.judul}
              variant="outlined"
            />
            <TextField
              error={Boolean(formik.touched.no_induk && formik.errors.no_induk)}
              fullWidth
              helperText={formik.touched.no_induk && formik.errors.no_induk}
              label="Konten"
              margin="normal"
              name="konten"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.konten}
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
