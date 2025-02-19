const express = require('express');
const {
    createSpecialityTest,
    updateSpecialityTest,
    deleteSpecialityTest,
    getSpecialityTest,
    toggleSpecialityTestPublished
} = require('../Controllers/SpecialityTestManagement/SpecialityTest.controller');
const accessControl = require('../Middleware/AccessControle.middleware');

const router = express.Router();

router.post('/add-new',accessControl(["admin"]),createSpecialityTest);
router.patch('/update/:id',accessControl(["admin"]), updateSpecialityTest);
router.delete('/delete/:id',accessControl(["admin"]), deleteSpecialityTest);
router.patch("/toggle-publish/:id",accessControl(["admin"]),toggleSpecialityTestPublished);
router.get('/get-all', getSpecialityTest);


module.exports = router;
