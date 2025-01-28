const express = require('express');
const AdminRouter = require('./Routes/Admin.routes');
const PatientRouter = require('./Routes/Patient.routes');
const BloodTestRouter = require('./Routes/BloodTest.routes');
const SpecialityTestRouter = require('./Routes/SpecialityTest.routes');
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(cors());




app.use("/pos-health/api/admin", AdminRouter);
app.use("/pos-health/api/patient", PatientRouter);
app.use("/pos-health/api/blood-test", BloodTestRouter);
app.use("/pos-health/api/speciality-test", SpecialityTestRouter);


module.exports = app;