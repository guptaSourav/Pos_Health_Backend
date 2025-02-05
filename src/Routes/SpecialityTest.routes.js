const express = require('express');
const {
    createSpecialityTest,
    updateSpecialityTest,
    deleteSpecialityTest,
    getSpecialityTest,
} = require('../Controllers/SpecialityTestManagement/SpecialityTest.controller');
const accessControl = require('../Middleware/AccessControle.middleware');

const router = express.Router();

router.post('/add-new',createSpecialityTest);
router.patch('/update/:id', updateSpecialityTest);
router.delete('/delete/:id', deleteSpecialityTest);
router.get('/get-all', getSpecialityTest);


module.exports = router;
