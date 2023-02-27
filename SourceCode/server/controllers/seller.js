import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import SellerModal from "../models/seller.js";

const secret = 'test';

export const s_register = async (req, res) => {
    const { name, gallery_name, email, phone, password } = req.body;
  
    try {
      const oldSeller = await SellerModal.findOne({ email });
      console.log("Seller注册，正在数据库找数据"+oldSeller);
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
      console.log("Seller登录，正在数据库找数据"+oldSeller);
      if (!oldSeller) return res.status(404).json({ message: "Seller doesn't exist, please register a seller account" });
  
      const isPasswordCorrect = await bcrypt.compare(password, oldSeller.password);
  
      if (!isPasswordCorrect) return res.status(400).json({ message: "Invalid credentials - Incorrect Password" });
  
      const token = jwt.sign({ email: oldSeller.email, id: oldSeller._id }, secret, { expiresIn: "1h" });
  
      res.status(200).json({ result: oldSeller, token });
    } catch (err) {
      res.status(500).json({ message: "Something went wrong" });
    }
  };