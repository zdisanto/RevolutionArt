import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import express from 'express';
import mongoose from 'mongoose';

import { stripe } from "../utils/stripe.js";
import UserModal from "../models/user.js";
import user from "../models/user.js";
const secret = 'test';

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const oldUser = await UserModal.findOne({ email });
    if (!oldUser) return res.status(404).json({ message: "User doesn't exist, please register an account" });

    const isPasswordCorrect = await bcrypt.compare(password, oldUser.password);
    if (!isPasswordCorrect) return res.status(400).json({ message: "Invalid credentials - Incorrect Password" });

    const token = jwt.sign({ email: oldUser.email, id: oldUser._id }, secret, { expiresIn: "1h" });
    // res.status(200).json({ result: oldUser, token });
    res.status(200).json({ result: oldUser, token , stripeCustomerId: oldUser.stripeCustomerId});
  } catch (err) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const register = async (req, res) => {
  const { email, password, phone, username } = req.body;

  try {
    const oldUser = await UserModal.findOne({ email });
    if (oldUser) return res.status(400).json({ message: "User already exists" });
    
    const hashedPassword = await bcrypt.hash(password, 12);

    //create new stripe member here
    const customer = await stripe.customers.create({
      email,
    },
    {
      apiKey: "sk_test_51MmLUyAaUjfR3qEUoqPd1W0YVIqe3vzt356fGQfJTT0X8KJZG0NXHIhJ8yQb6nSER5sZCmaknO13bRAbDx1Dirjb006ExhI7LX"
    });

    const result = await UserModal.create({ email, password: hashedPassword, phone, username, stripeCustomerId: customer.id });

    const token = jwt.sign( { email: result.email, id: result._id, phone: result.phone, username: result.username }, secret, { expiresIn: "1h" } );

    // res.status(200).json({ result, token });
    res.status(200).json({ result: { ...result, stripeCustomerId: customer.id }, token });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
    console.log(error);
  }
};

export const deleteUser = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No User with id: ${id}`);

  await UserModal.findByIdAndRemove(id);

  res.json({ message: "User deleted successfully." });
}

export const getInfo = async (req, res) => {
  const {id} = req.params;
  try {
    const oldUser = await UserModal.findOne({_id: id});
    
    if (oldUser){
      res.status(200).json(oldUser);
    } else {
      res.status(404).json({ message: "User not found" });
    } 
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
}

export const updateUserInfo = async (req, res) => {
  const { id } = req.params;
  const newInfo = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No User with id: ${id}`);
  const updatedInfo = await UserModal.findByIdAndUpdate(id, newInfo, { new: true});

  console.log(updatedInfo);
  res.status(200).json(updatedInfo);
}

export const resetPwd = async (req, res) => {
  const { id } =req.params;
  const { oldPassword, password, confirmPassword} = req.body;

  try {
    //step 1
    const oldUser = await UserModal.findOne({ _id: id });
    const isSame = await bcrypt.compare(oldPassword, oldUser.password);
    if(!isSame) return res.status(400).json({message:"The old password is not correct, please re-enter it!"});

    //step 2
    const isPasswordCorrect = await bcrypt.compare(password, oldUser.password);
    if (isPasswordCorrect) return res.status(400).json({ message: "Sorry, cannot re-use any old password" });
    
    const hashedPassword = await bcrypt.hash(password, 12);

    const result = await UserModal.updateOne({ _id: id}, {password: hashedPassword });

    const token = jwt.sign( { id: result._id }, secret, { expiresIn: "1h" } );

    res.status(200).json({ message: "Password updated sucessfully", token });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
    console.log(error);
  }
};
