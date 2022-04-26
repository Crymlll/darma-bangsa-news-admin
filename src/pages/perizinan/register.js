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
  const usersCollectionRef = collection(db, "users");

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
    const getUsers = async () => {
      const data = await getDocs(usersCollectionRef);
      setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    getUsers();
  }, []);


  const router = useRouter();
  const formik = useFormik({
    initialValues: {
      no_induk: '',
      email: '',
      nama: '',
      kelas: '',
      password: '',
      role: '',
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
          'Password is required'),
      policy: Yup
        .boolean()
        .oneOf(
          [true],
          'This field must be checked'
        )
    }),
    onSubmit: () => {
      const createUser = async () => {
        await addDoc(usersCollectionRef, {
          email: formik.values.email,
          kelas: formik.values.kelas,
          nama: formik.values.nama,
          no_induk: formik.values.no_induk,
          role: formik.values.role,
        });
      };

      createUser()

      router.push('/users');
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
            href="/users"
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
                Membuat Jadwal Konseling
              </Typography>
              <Typography
                color="textSecondary"
                gutterBottom
                variant="body2"
              >
                Silahkan isi data user dan konsister di bawah ini
              </Typography>
            </Box>
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
              error={Boolean(formik.touched.no_induk && formik.errors.no_induk)}
              fullWidth
              helperText={formik.touched.no_induk && formik.errors.no_induk}
              label="No Induk"
              margin="normal"
              name="no_induk"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.no_induk}
              variant="outlined"
            />
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
            <FormControl sx={{ m: 1, minWidth: 80 }}>
              <InputLabel id="demo-simple-select-autowidth-label">Role</InputLabel>
              <Select
                labelId="demo-simple-select-autowidth-label"
                id="demo-simple-select-autowidth"
                value={formik.values.role}
                onChange={formik.handleChange('role')}
                autoWidth
                label="Role"
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={'siswa'}>Siswa</MenuItem>
                <MenuItem value={'guru'}>Guru</MenuItem>
                <MenuItem value={'guru konseling'}>Guru Konseling</MenuItem>
                <MenuItem value={'wali kelas'}>Wali Kelas</MenuItem>
              </Select>
            </FormControl>
            <TextField
              error={Boolean(formik.touched.email && formik.errors.email)}
              fullWidth
              helperText={formik.touched.email && formik.errors.email}
              label="Email Address"
              margin="normal"
              name="email"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              type="email"
              value={formik.values.email}
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
