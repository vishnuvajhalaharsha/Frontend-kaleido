import React, { useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography
} from '@mui/material';
import { useNavigate } from 'react-router-dom';


const accounts = [
  {
    "address": "0x0a636479c0a9bc1941387ecdf4790be036152caa",
    "privateKey": "2b3377a4ab2b7b24e788b8c747bd057a1bbd11986e43b929fefd541fb7deaea4"
  },
  {
    "address": "0x17d596f367e3f6a6fba8d0ae4f4bbad2fc07c0cc",
    "privateKey": "2ebe1fb29b6c92dc60b4b30a1c10b0e045919d9e3850388fe81171bf42c644fd"
  },
  {
    "address": "0x39bee71c9a085fa9936984eb925c43f331e38779",
    "privateKey": "fdc5606544ede6addae79745c95c2ef8f075120ecfabeaa08e9fc67660e81d9f"
  }
]


const AccountSelector = ({  }) => {
  const [selectedAccount, setSelectedAccount] = useState('');
  const navigate=useNavigate()



  const handleSelect = (e) => {
    setSelectedAccount(e.target.value);
  };
  console.log(selectedAccount,"account")

  const handleProceed = () => {
    if (selectedAccount) {
      setSelectedAccount(selectedAccount);
      navigate(`/movies/${selectedAccount}`)
     
    
    } else {
      alert('Please select an account');
    }
  };

  return (
    <Box sx={{ p: 3, maxWidth: 400, mx: 'auto', textAlign: 'center' }}>
      <Typography variant="h6" gutterBottom>
        Select an Ethereum Address
      </Typography>
      <FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel id="select-account-label">Select an address</InputLabel>
        <Select
          labelId="select-account-label"
          value={selectedAccount}
          label="Select an address"
          onChange={handleSelect}
        >
          <MenuItem value="">
            <em>Select an address</em>
          </MenuItem>
          {accounts.map((account, index) => (
            <MenuItem key={index} value={account.address}>
              {account.address}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Button variant="contained" color="primary" onClick={handleProceed}>
        Proceed
      </Button>
    </Box>
  );
};

export default AccountSelector;
