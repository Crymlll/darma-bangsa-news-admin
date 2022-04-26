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


import { dbrealtime } from "../../firebase/firebase";
import { ref, onValue, child, get } from "firebase/database";





export const BeritaCard2 = ({...rest }) => {
  const [newName, setNewName] = useState("");
  const [newAge, setNewAge] = useState(0);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);

  const handleLimitChange = (event) => {
    console.log(event.target.value)
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };
  

  const [users, setUsers] = useState([]);
  const usersCollectionRef = ref(dbrealtime, 'berita');
  
  const starCountRef = ref(dbrealtime, 'berita');
  onValue(starCountRef, (snapshot) => {
    const data = snapshot.val();
    console.log(data)
    console.log(data.length)
    // for(let i in data){
    //     console.log(i)
    //     console.log(data[i].judul)
    //     console.log(data[i].konten)
    // }
  })

  const createUser = async () => {
    await addDoc(usersCollectionRef, { name: newName, age: Number(newAge) });
  };

  const updateUser = async (id, age) => {
    const userDoc = doc(dbrealtime, "beritas", id);
    const newFields = { age: age + 1 };
    await updateDoc(userDoc, newFields);
  };

  const deleteUser = async (id) => {
    const userDoc = doc(dbrealtime, "beritas", id);
    await deleteDoc(userDoc);
  };

  const getUsers = async () => {  
    console.log("data")
    onValue(usersCollectionRef, (snapshot) => {
      const data = snapshot.val();
      console.log(data)
      setUsers(data);
      console.log(users)
    })
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
                  ID2 
                </TableCell>
                <TableCell>
                  Judul 
                </TableCell>
                <TableCell>
                  Konten
                </TableCell>
                <TableCell>
                  Action
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((customer, index) => (
                <TableRow
                  hover
                  key={customer.id}
                  selected={selectedCustomerIds.indexOf(index) !== -1}
                  >
                  <TableCell>
                    {index}
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
                      <Link href={`/users/edit?id=${encodeURIComponent(customer.id)}`}>
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
                        // href = "/users"
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
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
};

BeritaCard2.propTypes = {
  customers: PropTypes.array.isRequired
};
