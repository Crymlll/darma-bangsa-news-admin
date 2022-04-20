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
  query,
  where
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
  const usersCollectionRef2 = collection(db, "users");


  const deleteUser = async (id) => {
    const userDoc = doc(db, "konseling", id);
    await deleteDoc(userDoc);
  };


  useEffect(() => {
    const getUsers = async () => {
      let fetchdata = doc(db, 'konseling', dataQuery.id)
      // const q = await usersCollectionRef.where('role', 'in', ['wali kelas', 'guru', 'guru konseling']).get();
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
      // console.log(q)
      console.log("tes")
      // console.log(users.kelas)
      // const data = await getDocs(usersCollectionRef);
      // setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    const cobaTes = async () => {
  
      // const q = query(usersCollectionRef, where('role', 'in', ['wali kelas', 'guru', 'guru konseling']));
      const q = query(usersCollectionRef2, where("role", "!=", "siswa"));
      const hasil = await getDocs(q);
      const semuaGuru = hasil.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      console.log(semuaGuru[0].nama)
      setUsers(semuaGuru)
    }

    getUsers();

    cobaTes();
    
  }, []);

  const formik = useFormik({
    initialValues: {
      permasalahan: '',
      guru: '',
      nama: '',
      deskripsi: '',
      jam: '',
      status: '',
      policy: false,
    },
    validationSchema: Yup.object({
      permasalahan: Yup
        .string()
        .email(
          'Must be a valid email')
        .max(255)
        .required(
          'Email is required'),
      status: Yup
      .string()
      .max(255)
      .required(
        'No Induk is required'),
      nama: Yup
        .string()
        .max(255)
        .required(
          'Nama is required'),
      guru: Yup
        .string()
        .max(255)
        .required(
          'Kelas is required'),
      deskripsi: Yup
        .string()
        .max(255)
        .required(
          'Deskripsi is required'),
      role: Yup
      .string()
      .max(255)
      .required(
        'Role is required'),
      jam: Yup
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
              label="Deskripsi"
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
                value={formik.values.guru}
                onChange={formik.handleChange('guru')}
                autoWidth
                label="Guru"
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {users.map(item => (
                  <MenuItem value={item.nama}>{item.nama}</MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl sx={{ m: 1, minWidth: 80 }}>
              <InputLabel id="demo-simple-select-autowidth-label">Jam</InputLabel>
              <Select
                labelId="demo-simple-select-autowidth-label"
                id="demo-simple-select-autowidth"
                value={formik.values.jam}
                onChange={formik.handleChange('jam')}
                autoWidth
                label="Jam"
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={'9.30 - 10.15'}>9.30 - 10.15</MenuItem>
                <MenuItem value={'10.30 - 11.15'}>10.30 - 11.15</MenuItem>
                <MenuItem value={'11.30 - 12.15'}>11.30 - 12.15</MenuItem>
                <MenuItem value={'13.30 - 14.15'}>13.30 - 14.15</MenuItem>
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
