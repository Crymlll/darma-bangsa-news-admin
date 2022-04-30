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

  const updateUser = async (id, age) => {
    const userDoc = doc(db, "users", id);
    const newFields = { age: age + 1 };
    await updateDoc(userDoc, newFields);
  };

  const deleteUser = async (id) => {
    const userDoc = doc(db, "users", id);
    await deleteDoc(userDoc);
  };

  function getUsers2(kelas) {
    formik.values.kelas = kelas;
    const getUsers = async (kelas) => {
      if(kelas==""){
        const q2 = query(usersCollectionRef, where("role", "==", "siswa") )
        const hasil2 = await getDocs(q2);
        const semuaMurid = hasil2.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
        setUsers(semuaMurid);
      }
      else{
        const q2 = query(usersCollectionRef, where("kelas", "==", kelas), where("role", "==", "siswa") )
        const hasil2 = await getDocs(q2);
        const semuaMurid = hasil2.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
        setUsers(semuaMurid);
      }
    }
    getUsers(kelas);
  }

  useEffect(() => {
    const cobaTes = async () => {
  
      // const q = query(usersCollectionRef, where('role', 'in', ['wali kelas', 'guru', 'guru konseling']));
      const q = query(usersCollectionRef2, where("role", "==", "guru konseling"));
      const q2 = query(usersCollectionRef, where("role", "==", "siswa") )
      const hasil = await getDocs(q);
      const hasil2 = await getDocs(q2);
      const semuaMurid = hasil2.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      const semuaGuru = hasil.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      setUsers(semuaMurid)
      setUsers2(semuaGuru)
      console.log(users2)
    }


    cobaTes();
    
  }, []);


  const router = useRouter();
  const formik = useFormik({
    initialValues: {
      alasan: '',
      nama: '',
      kelas: '',
      kegiatan: '',
      tanggal: '',
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
      kegiatan: Yup
        .string()
        .max(255)
        .required(
          'Kegiatan is required'),
      nama: Yup
        .string()
        .max(255)
        .required(
          'Nama is required'),
      tanggal: Yup
      .string()
      .max(255)
      .required(
        'Tanggal is required'),
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
        await addDoc(usersCollectionRef, {
          alasan: formik.values.alasan,
          kelas: formik.values.kelas,
          nama: formik.values.nama,
          kegiatan: formik.values.kegiatan,
          tanggal: formik.values.tanggal,
          status: formik.values.status
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
          Perizinan Register
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
              Perizinan
            </Button>
          </NextLink>
          <form onSubmit={formik.handleSubmit}>
          <Box sx={{ my: 3 }}>
              <Typography
                color="textPrimary"
                variant="h4"
              > 
                Membuat Data Perizinan
              </Typography>
              <Typography
                color="textSecondary"
                gutterBottom
                variant="body2"
              >
                Silahkan lengkapi data user di bawah ini
              </Typography>
            </Box>
            <FormControl sx={{ m: 1, minWidth: 80 }}>
              <InputLabel id="demo-simple-select-autowidth-label">Kelas</InputLabel>
              <Select
                labelId="demo-simple-select-autowidth-label"
                id="demo-simple-select-autowidth"
                value={formik.values.kelas}
                onChange={
                  e => {  formik.handleChange('kelas'); getUsers2(e.target.value); 
                
                    }
                // ; 
              }
                autoWidth
                label="Kelas"
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={'10-A'}>10-A</MenuItem>
                <MenuItem value={'10-B'}>10-B</MenuItem>
                <MenuItem value={'11-A'}>11-A</MenuItem>
                <MenuItem value={'11-B'}>11-B</MenuItem>
                <MenuItem value={'12-A'}>12-A</MenuItem>
                <MenuItem value={'12-B'}>12-B</MenuItem>
              </Select>
            </FormControl>
            <FormControl sx={{ m: 1, minWidth: 80 }}>
              <InputLabel id="demo-simple-select-autowidth-label">Siswa</InputLabel>
              <Select
                labelId="demo-simple-select-autowidth-label"
                id="demo-simple-select-autowidth"
                value={formik.values.siswa}
                onChange={formik.handleChange('siswa')}
                autoWidth
                label="Siswa"
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {users.map(item => (
                  <MenuItem value={item.nama}>{item.nama}</MenuItem>
                ))}
              </Select>
            </FormControl>
            {/* <TextField
              error={Boolean(formik.touched.nama && formik.errors.nama)}
              fullWidth
              helperText={formik.touched.nama && formik.errors.nama}
              label="Nama"
              margin="normal"
              name="nama"
              onBlur={formik.handleBlur}
              value={formik.values.nama}
              variant="outlined"
            /> */}
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
