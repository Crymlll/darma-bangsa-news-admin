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

  useEffect(() => {
    const getUsers = async () => {  
      console.log("data")
      onValue(usersCollectionRef, (snapshot) => {
        const data = snapshot.val();
        console.log(data)
        setUsers(data);
        console.log(users)
      })
    };

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
                  Action
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((customer) => (
                <TableRow
                  hover
                  key={customer.id}
                  selected={selectedCustomerIds.indexOf(customer.id) !== -1}
                  >
                  <TableCell>
                    {customer.id}
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
                        href = "/users"
                        onClick={ () => {
                          deleteUser(customer.id)
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
    </Card>
  );
};

BeritaCard2.propTypes = {
  customers: PropTypes.array.isRequired
};
