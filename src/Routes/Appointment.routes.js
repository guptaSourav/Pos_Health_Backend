const {
    createAppointment,
    updateAppointmentStatus,
    getAllAppointments
} = require('../Controllers/Appointment/Appointment.controller');
const express = require('express');
const accessControl = require('../Middleware/AccessControle.middleware');

const router = express.Router();


router.post('/create', accessControl(['Patient','admin']),createAppointment);
router.patch('/update-status', accessControl(['admin']), updateAppointmentStatus);
router.get('/get-all', accessControl(['admin']), getAllAppointments);


module.exports = router;