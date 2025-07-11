// routes/status.js
const express = require('express');
const router = express.Router();
const { getOwnershipStatus } = require('../algorand/ownership');

// For now we return a dummy static response
// Later you can fetch from Algorand indexer or DB
router.get('/:productId', async (req, res) => {
  try {
    const status = await getOwnershipStatus(req.params.productId);
    res.json(status);
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Failed to get status' });
  }
  //const { productId } = req.params;
  // 
  // try {
  //   // You can integrate Algorand indexer here
  //   res.json({
  //     productId,
  //     currentOwner: 'Rishi Agarwal',
  //     phone: '+91XXXXXXXXXX',
  //     status: 'Owned',
      
  //   });
  // } catch (err) {
  //   console.error(err);
  //   res.status(500).json({ success: false, message: 'Failed to fetch status' });
  // }
});

module.exports = router;
