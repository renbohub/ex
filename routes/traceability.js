var express = require('express');
var router = express.Router();

var { verifyToken } = require('../middleware/jwtMiddleware');
const dataController = require('../controllers/traceability/dataController');




// RoutePermissions Routes
router.get('/time', [verifyToken], dataController.GetByTime);
router.get('/number', [verifyToken], dataController.GetByNumber);



module.exports = router;
