const fs = require("fs");
const PDFDocument = require("pdfkit");
const path = require("path");
const Patient = require("../Models/Users/Patient.models"); // Import Patient model

const generateReceipt = async (order) => {
    return new Promise(async (resolve, reject) => {
        try {
            // Fetch patient details
            const patient = await Patient.findById(order.userId);
            if (!patient) {
                return reject(new Error("Patient not found"));
            }

            // Define the receipts directory
            const receiptsDir = path.join(__dirname, "../../receipts");

            // Check if the directory exists, if not, create it
            if (!fs.existsSync(receiptsDir)) {
                fs.mkdirSync(receiptsDir, { recursive: true });
            }

            // Define the receipt file path
            const receiptPath = path.join(receiptsDir, `receipt_${order._id}.pdf`);
            const receiptStream = fs.createWriteStream(receiptPath);

            const doc = new PDFDocument();
            doc.pipe(receiptStream);

            // Header
            doc.fontSize(20).text("Order Receipt", { align: "center" });
            doc.moveDown();

            // Order Info
            doc.fontSize(14).text(`Order ID: ${order._id}`);
            doc.text(`Patient Name: ${patient.name}`);
            doc.text(`Phone Number: ${patient.phone}`);
            doc.text(`Date: ${new Date(order.createdAt).toLocaleString()}`);
            doc.text(`Payment Method: ${order.paymentMethod}`);
            doc.text(`Status: ${order.status}`);
            doc.moveDown();

            // Items List
            doc.fontSize(16).text("Items Purchased:");
            doc.moveDown();
            order.items.forEach((item, index) => {
                doc
                    .fontSize(12)
                    .text(`${index + 1}. ${item.name} (x${item.quantity}) - ₹${item.price * item.quantity}`);
            });

            // Total Amount
            doc.moveDown();
            doc.fontSize(16).text(`Total Amount: Rs.${order.totalAmount}`, { align: "right" });

            doc.end();

            receiptStream.on("finish", () => {
                resolve(`/receipts/receipt_${order._id}.pdf`);
            });
        } catch (error) {
            reject(error);
        }
    });
};

module.exports = { generateReceipt };
