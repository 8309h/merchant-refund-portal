const Merchant = require("../models/Merchant");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


exports.register = async (req, res) => {
      const { email, password, name } = req.body;
      try {
            let merchantExists = await Merchant.findOne({ email });
            if (merchantExists) {
                  return res.status(400).json({ message: "Merchant already exists" });
            }
            const hashedPassword = await bcrypt.hash(password, 10);
            const merchant = await Merchant.create({
                  name,
                  email,
                  password: hashedPassword
            });

            res.status(201).json({
                  message: "Merchant registered successfully",
                  merchant: {
                        id: merchant._id,
                        name: merchant.name,
                        email: merchant.email
                  }
            });
      } catch (error) {
            console.error(error);
            res.status(500).json({ message: error.message });
      }
};

exports.login = async (req, res) => {
      const { email, password } = req.body;
      try {
            let merchant = await Merchant.findOne({ email });
            if (!merchant) {
                  return res.status(400).json({ message: "Invalid credentials-Email not found" });
            }
            const isMatch = await bcrypt.compare(password, merchant.password);
            if (!isMatch) {
                  return res.status(400).json({ message: "Invalid credentials-Password incorrect" });
            }
            const token = jwt.sign(
                  { id: merchant._id },
                  process.env.JWT_SECRET,
                  { expiresIn: '1h' }
            )
            res.json({ token : token, _id: merchant._id })
      } catch (error) {
            console.error(error);
            res.status(500).json({ message: error.message });
      }


}