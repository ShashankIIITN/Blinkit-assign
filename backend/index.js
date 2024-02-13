import express, { json } from 'express';
import mongoose from 'mongoose';
import bodyparser from 'body-parser';
import multer, { diskStorage } from 'multer';
import bcryptjs from 'bcryptjs';
import js from 'jsonwebtoken';
import { extname } from 'path';
import cors from 'cors';
import { GetUser } from './middlewares/getuser.js';



const app = express();

app.use(bodyparser.json());
app.use(cors());


mongoose.connect('mongodb://0.0.0.0:27017/mern_image_upload', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));


import User from './models/User.js';
import Image from './models/Image.js';


// const storage = diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, 'uploads');
//     },
//     filename: (req, file, cb) => {
//         cb(null, file.fieldname + '-' + Date.now() + extname(file.originalname));
//     }
// });
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// const upload = multer({ storage });


app.post('/api/signup', async (req, res) => {
    try {
        const { username, password } = req.body;
        const hashedPassword = await bcryptjs.hash(password, 10);
        const newUser = new User({ username, password: hashedPassword });
        await newUser.save();
        res.status(201).send('User created successfully');
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
});

app.get("/api/", async (req, res) => {
    res.send("working!");
})

app.post('/api/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });
        if (!user) return res.status(400).send('Invalid credentials');
        const isMatch = await bcryptjs.compare(password, user.password);
        if (!isMatch) return res.status(400).send('Invalid credentials');
        const token = js.sign({ id: user._id }, 'jwt_secret');
        res.json({ token });
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
});

app.post('/api/upload', upload.single('image'), GetUser, async (req, res) => {
    try {
        const { originalname, buffer, mimetype } = req.file;
        console.log(buffer)
        const image = new Image({
            userId: req.user.id,
            name: originalname,
            data: buffer,
            contentType: mimetype
        });
        await image.save();
        res.send('Image uploaded successfully');
    } catch (error) {
        res.status(500).send('Error uploading image');
    }
});
app.get('/api/fetch-images', GetUser, async (req, res) => {
    try {
        
        const data = await Image.find({userId: req.user.id});
        
        res.send(JSON.stringify(data));
    } catch (error) {
        res.status(500).send('Error uploading image');
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
