// Starts the server: loads the Express app, chooses a port (env PORT or 3000), 
// and listens for incoming requests.

const app = require('./app');

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
}); 