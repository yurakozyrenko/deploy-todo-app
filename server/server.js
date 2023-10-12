const PORT = process.env.PORT ?? 8000;
const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());
app.use('/api', require('./routes/index'));

console.log("Hello")

app.listen(PORT, () => console.log(`Server running on PORT ${PORT}`));
