const { Router } = require("express");

const uploader = require("../utils");

const router = Router();

router.post("/single", uploader.single("thumbnail"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({
      status: "error",
      error: "file not loaded",
    });
  }

  res.json({
    status: "success",
    data: req.file,
  });
});

module.exports = router;
