const router = require('express').Router();
const { sequelize } = require('sequelize');

// Model
const  { user }  = require('../database/models'); 
router.post('/', async (req, res) => {
    let username = "Madara", password = "WeaknessIsDisgusting";
    console.log('lmao dis works');
    const userz = await user.create({
        username,
        password
    });

    console.log(userz);
})

module.exports = router;