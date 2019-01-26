'use strict';
const express = require('express');
const { sendEmail } = require('../utils');

const router = express.Router();

router.post('/', async (req, res, next) => {
  const { recipient, message } = req.body;
  try {
    let result = await sendEmail(recipient, message);
    res.status(200);
    res.json({
      id: result.messageId,
      accepted: result.accepted,
      rejected: result.rejected,
      message,
    });
    await next();
  } catch (e) {
    await next(e);
  }
});

module.exports = router;
