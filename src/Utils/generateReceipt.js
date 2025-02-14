const fs = require("fs");
const PDFDocument = require("pdfkit");
const path = require("path");
const Patient = require("../Models/Users/Patient.models");

const generateReceipt = async (order) => {
    return new Promise(async (resolve, reject) => {
        try {
          
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

            const doc = new PDFDocument({ margin: 50 });
            doc.pipe(receiptStream);

           
            const logoCenter = path.join(__dirname, "../../public/logoCenter.png");
  
            if (fs.existsSync(logoCenter)) {
                const logoWidth = 300; // Set large width
                const logoHeight = 300; // Set large height
                const centerX = (doc.page.width - logoWidth) / 2; // Center horizontally
                const centerY = (doc.page.height - logoHeight) / 2.5; // Center vertically (adjust as needed)
            
                doc.fillOpacity(0.2); // Set transparency (20% opacity)
                doc.image(logoCenter, centerX, centerY, { width: logoWidth, height: logoHeight });
                doc.fillOpacity(1); // Reset opacity after placing the image
            } else {
                console.error("Logo file not found at:", logoPath);
            }

            const logoCorner = path.join(__dirname, "../../public/logoCorner.png");

            if (fs.existsSync(logoCorner)) {
                const smallWidth = 80;
                const smallHeight = 50;
                const rightX = doc.page.width - smallWidth - 20;
                const rightY = 20;
            
                doc.image(logoCorner, rightX, rightY, { width: smallWidth, height: smallHeight });
            }

            // Header
            doc.moveDown(3);
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

            // Table Header
            doc.fontSize(14).text("Items Purchased:", { underline: true });
            doc.moveDown();
            
            const startX = 50; // Start position for the table
            const startY = doc.y; // Current Y position

            const columnWidths = [40, 200, 60, 80, 80]; // Column width for each column
            const rowHeight = 25; // Row height

            doc.fontSize(12).text("S.No", startX, startY);
            doc.text("Item Name", startX + columnWidths[0], startY);
            doc.text("Qty", startX + columnWidths[0] + columnWidths[1], startY);
            doc.text("Unit Price", startX + columnWidths[0] + columnWidths[1] + columnWidths[2], startY);
            doc.text("Total", startX + columnWidths[0] + columnWidths[1] + columnWidths[2] + columnWidths[3], startY);
            doc.moveDown();
            doc.moveDown();

            let yPos = startY + rowHeight; // Move to next row

            order.items.forEach((item, index) => {
                doc.text(`${index + 1}`, startX, yPos);
                doc.text(`${item.name}`, startX + columnWidths[0], yPos);
                doc.text(`${item.quantity}`, startX + columnWidths[0] + columnWidths[1], yPos);
                doc.text(`₹${item.price}`, startX + columnWidths[0] + columnWidths[1] + columnWidths[2], yPos);
                doc.text(`₹${item.price * item.quantity}`, startX + columnWidths[0] + columnWidths[1] + columnWidths[2] + columnWidths[3], yPos);
                yPos += rowHeight; // Move to the next row
            });

            // Total Amount
            doc.moveDown();
            doc.fontSize(14).text(`Total Amount: ₹${order.totalAmount}`, { align: "right" });

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
