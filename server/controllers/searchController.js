const SearchEntry = require('../models/SearchEntry');
const unsplashClient = require('../utils/unsplashClient');

// POST /api/search
exports.searchPhotos = async (req, res) => {
  try {
    const { term } = req.body;
    if (!term) return res.status(400).json({ error: 'term required' });

    // Save search term in DB
    await SearchEntry.create({ userId: req.user._id, term });

    // Fetch from Unsplash API
    const results = await unsplashClient.searchPhotos(term, 20);

    res.json({ term, count: results.length, results });
  } catch (err) {
    console.error('Search error:', err);
    res.status(500).json({ error: 'search failed' });
  }
};

// GET /api/history
exports.getHistory = async (req, res) => {
  try {
    const entries = await SearchEntry.find({ userId: req.user._id })
      .sort({ timestamp: -1 })
      .limit(100);
    res.json(entries);
  } catch (err) {
    console.error('History fetch error:', err);
    res.status(500).json({ error: 'could not fetch history' });
  }
};

// GET /api/top-searches
exports.getTopSearches = async (req, res) => {
  try {
    const agg = await SearchEntry.aggregate([
      { $group: { _id: "$term", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 5 }
    ]);
    res.json(agg.map(a => ({ term: a._id, count: a.count })));
  } catch (err) {
    console.error('Top searches error:', err);
    res.status(500).json({ error: 'could not fetch top searches' });
  }
};
