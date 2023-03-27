import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import express from 'express';
import mongoose from 'mongoose';
import nodemailer from 'nodemailer';

import SellerModal from "../models/seller.js";

const secret = 'test';

export const s_register = async (req, res) => {
    const { name, gallery_name, email, phone, password } = req.body;
  
    try {
      const oldSeller = await SellerModal.findOne({ email });
      
      if (oldSeller) return res.status(400).json({ message: "Seller already exists or change your email" });

      const hashedPassword = await bcrypt.hash(password, 12);
  
      const result = await SellerModal.create({ name, gallery_name, email, phone, password: hashedPassword });
  
      const token = jwt.sign( { email: result.email, id: result._id }, secret, { expiresIn: "1h" } );
  
      res.status(200).json({ result, token });
    } catch (error) {
      res.status(500).json({ message: "Something went wrong" });
      console.log(error);
    }
};

export const s_login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const oldSeller = await SellerModal.findOne({ email });
    
    if (!oldSeller) return res.status(404).json({ message: "Seller doesn't exist, please register a seller account" });

    const isPasswordCorrect = await bcrypt.compare(password, oldSeller.password);

    if (!isPasswordCorrect) return res.status(400).json({ message: "Invalid credentials - Incorrect Password" });

    const token = jwt.sign({ email: oldSeller.email, id: oldSeller._id }, secret, { expiresIn: "1h" });

    res.status(200).json({ result: oldSeller, token });
  } catch (err) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const deleteSeller = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No Seller with id: ${id}`);

  await SellerModal.findByIdAndRemove(id);

  res.json({ message: "Seller deleted successfully." });
}

export const forgotPwd = async (req, res) => {
  const {email} =req.body;
  try {
    const oldUser = await SellerModal.findOne({ email });
    if(!oldUser) return res.status(400).json({ message: "Sorry! Seller Not Exists!" });
    const token = jwt.sign({email: oldUser.email, id: oldUser._id}, secret, {expiresIn:"1h"});
    const link = `http://localhost:5000/seller/reset-Pwd/${oldUser._id}/${token}`;

    var transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'sslee666999@gmail.com',
        pass: 'dsdswzlrzkdecyrx'
      }
    });
    
    var mailOptions = {
      from: 'sslee666999@gmail.com',
      to: oldUser.email,
      subject: 'Password Reset - RevolutionArt.com',
      text: link,
    };
    
    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });

    console.log(link);
    res.status(400).json({ message: "link of reset password was sent to your email! The link expire in 1 hour!!" });
  } catch (error) {
    res.status(500).json({ message: "Something was wrong!" });
  }
}

export const forgotPwd_getLink = async (req, res) => {
  
  const {id, token} = req.params;

  const oldUser = await SellerModal.findOne({_id: id});
  if(!oldUser) return res.json({ status: "User Not Exists!!!"});
  try {
    const verify = jwt.verify(token, secret);
    res.render("resetHtml", {email:verify.email, status:"Not Verified"});
  } catch (error) {
    console.log(error);
    res.send("Not Verified");
  }
}

export const forgotPwd_resetPwd = async (req, res) => {
  const {id, token} = req.params;
  const { password } = req.body;

  const oldUser = await SellerModal.findOne({_id: id});
  if(!oldUser) return res.json({ status: "User Not Exists!!!"});
  try {
    const verify = jwt.verify(token, secret);
    const hashedPassword = await bcrypt.hash(password, 12);

    await SellerModal.updateOne({_id: id, password: hashedPassword});
    res.render("resetHtml", {email:verify.email, status:"verified"});
  } catch (error) {
    console.log(error);
    res.send({status:"Something went wrong!"});
  }
}

export const getInfo = async (req, res) => {
  const {id} = req.params;
  try {
    const oldSeller = await SellerModal.findOne({_id: id});
    
    if (oldSeller){
      res.status(200).json(oldSeller);
    } else {
      res.status(404).json({ message: "Seller not found" });
    } 
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
}

export const updateUserInfo = async (req, res) => {
  const { id } = req.params;
  const newInfo = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No Seller with id: ${id}`);
  const updatedInfo = await SellerModal.findByIdAndUpdate(id, newInfo, { new: true});

  console.log(updatedInfo);
  res.status(200).json(updatedInfo);
}