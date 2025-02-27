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
  TextareaAutosize,
  Typography,
  MenuItem,
  FormControl,
  Select,
  InputLabel,

} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';


import { useState, useEffect } from "react";
import { db } from "../../firebase/firebase";
import { auth } from "../../firebase/firebase";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  query,
  orderBy
} from "firebase/firestore";


import { dbrealtime } from "../../firebase/firebase";
import { set, ref, onValue, child, get } from "firebase/database";


const PostBerita = () => {

  const [text, onChangeText] = useState({
    email: '',
    kelas: '',
    judul: '',
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
  const [panjang, setPanjang] = useState([]);

  const usersCollectionRef = collection(db, "berita");
  const q = query(usersCollectionRef, orderBy("urutan"));

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
      const data = await getDocs(q);
      setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      setPanjang(data.docs.length)
      console.log(panjang)
    };

    getUsers();
  }, []);



  const router = useRouter();
  const formik = useFormik({
    initialValues: {
      judul: '',
      konten: '',
      policy: false,
    },
    validationSchema: Yup.object({
      judul: Yup
        .string()
        .max(255)
        .required(
          'judul is required'),
      konten: Yup
        .string()
        .max(255)
        .required(
          'Isi Berita is required'),
      policy: Yup
        .boolean()
        .oneOf(
          [true],
          'This field must be checked'
        )
    }),
    onSubmit: () => {
      const createUser = async () => {
        let id_berita = panjang+1;
        await addDoc(usersCollectionRef, {
          judul: formik.values.judul,
          konten: formik.values.konten,
          urutan: id_berita
        });
      };

      createUser()

      router.push('/berita');
    }
  });

  return (
    <>
      <Head>
        <title>
          User Berita
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
            href="/"
            passHref
          >
            <Button
              component="a"
              startIcon={<ArrowBackIcon fontSize="small" />}
            >
              Berita
            </Button>
          </NextLink>
          <form onSubmit={formik.handleSubmit}>
            <Box sx={{ my: 3 }}>
              <Typography
                color="textPrimary"
                variant="h4"
              >
                Membuat Berita
              </Typography>
              <Typography
                color="textSecondary"
                gutterBottom
                variant="body2"
              >
                Silahkan isi data berita di bawah ini
              </Typography>
            </Box>
            <TextField
              error={Boolean(formik.touched.judul && formik.errors.judul)}
              fullWidth
              helperText={formik.touched.judul && formik.errors.judul}
              label="Judul"
              margin="normal"
              name="judul"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.judul}
              variant="outlined"
            />
            <TextareaAutosize
              error="false"
              label = "Isi Berita"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.konten}
              variant="outlined"
              name="konten"
              minRows={37}
              aria-label="maximum height"
              placeholder="Isi berita... :)"
              style={{ width: '100%'}}
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
                Membuat Berita Baru
              </Button>
            </Box>
          </form>
        </Container>
      </Box>
    </>
  );
};

export default PostBerita;
