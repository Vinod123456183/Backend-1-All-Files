import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

// Resolve directory name in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const port = process.env.PORT || 3000;
const app = express();

// Define the static folder path
const staticPath = path.join(__dirname, 'PUBLICFOLDER');
app.use(express.static(staticPath));

// Serve an HTML file on the root route
app.get('/', (req, res) => {
    const filePathHtml = path.join(staticPath, 'ind.html'); // Adjusted path
    res.sendFile(filePathHtml); // Send the HTML file
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
