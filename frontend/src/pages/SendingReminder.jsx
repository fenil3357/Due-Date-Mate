import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Checkbox,
  Container,
  FormControlLabel,
  Grid,
  TextField,
  Button,
} from '@material-ui/core';
import "../styles/SendingReminder.css"
const SendingReminder = () => {
  const [groups, setGroups] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGroups, setSelectedGroups] = useState([]);

  useEffect(() => {
    
    const fetchGroups = async () => {
      try {
        const response = await axios.get('/api/groups');
        setGroups(response.data);
      } catch (error) {
        console.error('Error fetching groups:', error);
      }
    };

    fetchGroups();
  }, []);

  const handleCheckboxChange = (event, group) => {
    if (event.target.checked) {
      setSelectedGroups([...selectedGroups, group]);
    } else {
      setSelectedGroups(selectedGroups.filter((g) => g.id !== group.id));
    }
  };

  const handleSendButtonClick = () => {

    console.log('Selected groups:', selectedGroups);
   
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };


  const filteredGroups = groups.filter((group) =>
    group.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Container maxWidth="md">
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Search Groups"
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </Grid>
        {filteredGroups.map((group) => (
          <Grid item xs={12} key={group.id}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={selectedGroups.some((g) => g.id === group.id)}
                  onChange={(event) => handleCheckboxChange(event, group)}
                />
              }
              label={group.name}
            />
          </Grid>
        ))}
        <Grid item xs={12}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSendButtonClick}
            disabled={selectedGroups.length === 0}
          >
            Send
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};

export default SendingReminder;
