import express from 'express';
import { registerUser } from '../controllers/registerUser';
import { verifyUser } from '../controllers/verifyUser';
import { loginUser } from '../controllers/loginUser';

const users_routes = express.Router();

users_routes.post('/register', registerUser);
users_routes.post('/verify', verifyUser);
users_routes.post('/login', loginUser);

export default users_routes;

