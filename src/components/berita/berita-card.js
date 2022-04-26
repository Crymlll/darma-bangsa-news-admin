import { useState, useEffect } from "react";
import PerfectScrollbar from 'react-perfect-scrollbar';
import PropTypes from 'prop-types';
import Link from 'next/link'
import { format } from 'date-fns';
import {
  Avatar,
  Box,
  Button,
  Card,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography
} from '@mui/material';
import { getInitials } from '../../utils/get-initials';


import { db } from "../../firebase/firebase";
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





export const BeritaCard = ({...rest }) => {
  const [newName, setNewName] = useState("");
  const [newAge, setNewAge] = useState(0);

  const [users, setUsers] = useState([]);
  const usersCollectionRef = collection(db, "berita");
  const q = query(usersCollectionRef, orderBy("urutan"));
  // const logData = async () => {
  //   const data = await getDocs(usersCollectionRef);
  //   console.log(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
  // };
  // logData()

  const createUser = async () => {
    await addDoc(q, { name: newName, age: Number(newAge) });
  };

  const updateUser = async (id, age) => {
    const userDoc = doc(db, "berita", id);
    const newFields = { age: age + 1 };
    await updateDoc(userDoc, newFields);
  };

  const deleteUser = async (id) => {
    const userDoc = doc(db, "berita", id);
    await deleteDoc(userDoc);
  };

  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);

  const handleLimitChange = (event) => {
    console.log(event.target.value)
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const getUsers = async () => {
    const data = await getDocs(q);
    setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  useEffect(() => {

    getUsers();
  }, []);

  const [selectedCustomerIds, setSelectedCustomerIds] = useState([]);


  return (
    <Card {...rest}>
      <PerfectScrollbar>
        <Box sx={{ minWidth: 1050 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  ID 
                </TableCell>
                <TableCell>
                  Judul
                </TableCell>
                <TableCell>
                  Konten
                </TableCell>
                <TableCell>
                  Aksi
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.slice(limit*page, limit*(page+1)).map((customer) => (
                <TableRow
                  hover
                  key={customer.id}
                  selected={selectedCustomerIds.indexOf(customer.id) !== -1}
                  >
                  <TableCell>
                    {customer.urutan}
                  </TableCell>
                  <TableCell>
                    {customer.judul}
                  </TableCell>
                  <TableCell>
                    {customer.konten}
                  </TableCell>

                  <TableCell>
                    <Box
                      sx={{
                        display: 'flex'
                      }}
                    >
                      <Link href={`/berita/edit?id=${encodeURIComponent(customer.id)}`}>
                        <Button
                          color="warning"
                          variant="contained"
                        >
                          Edit
                        </Button>
                      </Link>
                      <Button
                        color="error"
                        variant="contained"
                        // href = "/berita"
                        onClick={ () => {
                          console.log(customer.id);
                          deleteUser(customer.id);
                          getUsers();
                        }}
                      >
                        Delete
                      </Button>
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
      <TablePagination
        component="div"
        count={users.length}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleLimitChange}
        page={page}
        rowsPerPage={limit}
        rowsPerPageOptions={[3, 5, 10, 25]}
      />
    </Card>
  );
};

// BeritaCard.propTypes = {
//   customers: PropTypes.array.isRequired
// };
