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
// import { getAuth } from "../../firebase/auth"
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  query,
  where
} from 'firebase/firestore';



const Register = () => {

  const [text, onChangeText] = useState({
    email: '',
    kelas: '',
    nama: '',
    no_induk: '',
    role: '',
});

const clickHandler = (textInput) => {
    return (value) => {
        onChangeText({ ...text, [textInput]: value });
    }
}

  const [newName, setNewName] = useState("");

  const [users, setUsers] = useState([]);
  const [users2, setUsers2] = useState([]);
  const usersCollectionRef = collection(db, "users");
  const usersCollectionRef2 = collection(db, "users");
  const addedDoc = collection(db, "konseling")

  const updateUser = async (id, age) => {
    const userDoc = doc(db, "users", id);
    const newFields = { age: age + 1 };
    await updateDoc(userDoc, newFields);
  };

  const deleteUser = async (id) => {
    const userDoc = doc(db, "users", id);
    await deleteDoc(userDoc);
  };

  useEffect(() => {
    const cobaTes = async () => {
  
      // const q = query(usersCollectionRef, where('role', 'in', ['wali kelas', 'guru', 'guru konseling']));
      const q = query(usersCollectionRef2, where("role", "==", "guru konseling"));
      const q2 = query(usersCollectionRef, where("role", "==", "siswa") )
      const hasil = await getDocs(q);
      const hasil2 = await getDocs(q2);
      const semuaMurid = hasil2.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      const semuaGuru = hasil.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      setUsers(semuaGuru)
      setUsers2(semuaMurid)
    }


    cobaTes();
    
  }, []);


  const router = useRouter();
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
      permasalahan: Yup
        .string()
        .max(255)
        .required(
          'Permasalahan is required'),
      guru: Yup
      .string()
      .max(255)
      .required(
        'Guru is required'),
      deskripsi: Yup
        .string()
        .max(255)
        .required(
          'Deskripsi is required'),
      nama: Yup
        .string()
        .max(255)
        .required(
          'Nama is required'),
      jam: Yup
      .string()
      .max(255)
      .required(
        'Jam is required'),
      status: Yup
        .string()
        .max(255)
        .required(
          'Status is required'),
      policy: Yup
        .boolean()
        .oneOf(
          [true],
          'This field must be checked'
        )
    }),
    onSubmit: () => {
      const createUser = async () => {
        await addDoc(addedDoc, {
          permsalahan: formik.values.permsalahan,
          guru: formik.values.guru,
          nama: formik.values.nama,
          deskripsi: formik.values.deskripsi,
          jam: formik.values.jam,
          status: formik.values.status,
        });
      };

      createUser()

      router.push('/konseling');
    }
  });

  return (
    <>
      <Head>
        <title>
          Konseling Register
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
                Membuat Data Konseling
              </Typography>
              <Typography
                color="textSecondary"
                gutterBottom
                variant="body2"
              >
                Silahkan lengkapi data user di bawah ini
              </Typography>
            </Box>
            <FormControl sx={{ m: 1, minWidth: 160 }}>
              <InputLabel id="demo-simple-select-autowidth-label">Permasalahan</InputLabel>
              <Select
                labelId="demo-simple-select-autowidth-label"
                id="demo-simple-select-autowidth"
                value={formik.values.permasalahan}
                onChange={formik.handleChange('permasalahan')}
                autoWidth
                label="Permasalahan"
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={'non akademik'}>Non Akademik</MenuItem>
                <MenuItem value={'akademik'}>Akademik</MenuItem>
              </Select>
            </FormControl>
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
            <FormControl sx={{ m: 1, minWidth: 100 }}>
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
                <MenuItem value={'9.30'}>9.30 - 10.15</MenuItem>
                <MenuItem value={'10.30'}>10.30 - 11.15</MenuItem>
                <MenuItem value={'11.30'}>11.30 - 12.15</MenuItem>
                <MenuItem value={'13.30'}>13.30 - 14.15</MenuItem>
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
                Register User Baru
              </Button>
            </Box>
          </form>
        </Container>
      </Box>
    </>
  );
};

export default Register;
