const express = require('express');
const newman = require('newman'); // Newman allows us to run Postman collections

const app = express();

// Endpoint to run Postman collection
app.get('/failed-scenario', (req, res) => {
  newman.run({
    collection: require('./Failed Scenario.postman_collection.json'), // Path to the exported Postman collection
  }, (err, summary) => {
    if (err) {
      return res.status(500).send('Error running collection');
    }
    // Send the summary or result of the Postman collection run
    res.json({
      status: 'Collection run complete',
      run: summary.run.stats,
    });
  });
});
app.get('/success-scenario', (req, res) => {
    newman.run({
      collection: require('./Successful Scenario.postman_collection.json'), // Path to the exported Postman collection
    }, (err, summary) => {
      if (err) {
        return res.status(500).send('Error running collection');
      }
      // Send the summary or result of the Postman collection run
      res.json({
        status: 'Collection run complete',
        run: summary.run.stats,
      });
    });
  });

// Basic server setup
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});