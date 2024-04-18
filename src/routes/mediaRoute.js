let express = require("express")
const router = express.Router();
router.use(express.json());


let  {postMedia,deleteMedia } =require("../controllers/mediaContoller")


// Importing JWT authentication middleware
let {jwtAuth} = require("../middlewares/auth")

// Applying JWT authentication middleware to all routes in this router
router.use(jwtAuth)

// Defining routes for adding new media and deleting media by ID
router.post("/addmedia", postMedia)
router.delete("/delete/:id", deleteMedia)


module.exports = router;