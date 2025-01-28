require("dotenv").config();
const connect = require("./src/Connection/connect");
const app = require("./src/app");

connect()
.then(() => {
    try {
        app.listen(process.env.PORT, () => {
            console.log(`Server is running on port ${process.env.PORT}`);
        });
    } catch (error) {
        console.log("Error connecting to Server", error);
    }
})
.catch((error) => {
    console.log("Error connecting to MongoDB", error);
});