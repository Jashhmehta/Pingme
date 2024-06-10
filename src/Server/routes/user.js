
import express from "express";
import { login, register } from "../controllers/user.js";
const app=express.Router();
app.post("/login",login);
app.post("/register",register);

export default app
