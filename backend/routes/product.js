// routes/products.js
const express = require('express');
const router = express.Router();
const pool = require('../config/db');
const auth = require('../middleware/authMiddleware');
const multer = require('multer');
const cloudinary = require('../config/cloudinary');
const storage = multer.memoryStorage();
const upload = multer({ storage });

router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.query(
      `SELECT p.*, u.name AS seller_name, u.phone AS seller_phone
       FROM products p JOIN users u ON p.user_id = u.id
       ORDER BY p.created_at DESC`
    );
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

router.post('/', auth, upload.single('image'), async (req, res) => {
    console.log("BODY:", req.body);
    console.log("FILE:", req.file);
    console.log("USER:", req.user);
  const { name, price, description } = req.body;
  if (!name || !price) return res.status(400).json({ message: 'Missing product fields' });

  try {
    let image_url = null;
    if (req.file) {
      const uploadResult = await cloudinary.uploader.upload_stream(
        { folder: 'mini_marketplace' },
        async (error, result) => {
          if (error) {
            console.error(error);
            return res.status(500).json({ message: 'Image upload failed' });
          } else {
            try {
              const [insertRes] = await pool.query(
                'INSERT INTO products (user_id, name, price, description, image_url) VALUES (?, ?, ?, ?, ?)',
                [req.user.id, name, price, description || null, result.secure_url]
              );
              const [rows] = await pool.query('SELECT * FROM products WHERE id = ?', [insertRes.insertId]);
              res.json(rows[0]);
            } catch (dbErr) {
              console.error(dbErr);
              res.status(500).json({ message: 'DB error' });
            }
          }
        }
      );
      uploadResult.end(req.file.buffer);
      return; 
    } else {
      const [insertRes] = await pool.query(
        'INSERT INTO products (user_id, name, price, description, image_url) VALUES (?, ?, ?, ?, ?)',
        [req.user.id, name, price, description || null, null]
      );
      const [rows] = await pool.query('SELECT * FROM products WHERE id = ?', [insertRes.insertId]);
      return res.json(rows[0]);
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
});
router.get('/:id', async (req, res) => {
  const productId = req.params.id;

  try {
    const [product] = await pool.query(
      `SELECT p.*, u.name AS seller_name, u.phone AS seller_phone
       FROM products p 
       JOIN users u ON p.user_id = u.id
       WHERE p.id = ?`,
      [productId]
    );

    if (!product.length) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json(product[0]);

  } catch (err) {
    console.error("GET SINGLE ERROR:", err);
    res.status(500).json({ message: "Server error" });
  }
});

router.delete('/:id', auth, async (req, res) => {
  const productId = req.params.id;

  try {
    const [product] = await pool.query(
      "SELECT * FROM products WHERE id = ?",
      [productId]
    );

    if (!product.length) {
      return res.status(404).json({ message: "Product not found" });
    }

    if (product[0].user_id !== req.user.id) {
      return res.status(403).json({ message: "Not authorized" });
    }

    await pool.query("DELETE FROM products WHERE id = ?", [productId]);

    res.json({ message: "Product deleted successfully" });

  } catch (err) {
    console.error("DELETE ERROR:", err);
    res.status(500).json({ message: "Server error" });
  }
});


module.exports = router;
