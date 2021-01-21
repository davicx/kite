const express = require('express')
const router = express.Router();
const mysql = require('mysql')

router.get('/messages', (req, res) => {
    console.log("my messages");
    res.end();
  })
  
  module.exports = router;
  