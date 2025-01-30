const express = require("express");
const AdminRouter = require("./Routes/Admin.routes");
const PatientRouter = require("./Routes/Patient.routes");
const DoctorRouter = require("./Routes/Doctor.routes");
const BloodTestRouter = require("./Routes/BloodTest.routes");
const SpecialityTestRouter = require("./Routes/SpecialityTest.routes");
const HealthPackageRouter = require("./Routes/HealthPackage.routes");
const BlogRouter = require("./Routes/Blog.routes");
const HealthCollectionRequestRouter = require("./Routes/HomeCollectionRequest.routes");

const CartRouter = require("./Routes/Cart.routes");
const OrderRouter = require("./Routes/Order.routes");
const AppointmentRouter = require("./Routes/Appointment.routes");

const cors = require("cors");
const app = express();

app.use(express.json());
app.use(cors());

app.use("/pos-health/api/admin", AdminRouter);
app.use("/pos-health/api/patient", PatientRouter);
app.use("/pos-health/api/doctor", DoctorRouter);
app.use("/pos-health/api/blood-test", BloodTestRouter);
app.use("/pos-health/api/speciality-test", SpecialityTestRouter);
app.use("/pos-health/api/health-package", HealthPackageRouter);
app.use("/pos-health/api/blog", BlogRouter);
app.use("/pos-health/api/health-collection", HealthCollectionRequestRouter);

app.use("/pos-health/api/cart", CartRouter);
app.use("/pos-health/api/order", OrderRouter);
app.use("/pos-health/api/appointment", AppointmentRouter);




module.exports = app;
