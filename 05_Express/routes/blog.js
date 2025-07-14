import express from "express";

// to create a new instance of a router object in an Express.js application.
const router = express.Router();

// middleware that is specific to this router
// const timeLog = (req, res, next) => {
//     console.log('Time: ', Date.now())
//     next()
// }
// router.use(timeLog)

// define the home page route
router.get('/', (req, res) => {
    res.send('Blog home page')
})
// define the about route
router.get('/about', (req, res) => {
    res.send('About Blog')
})

router.get("/blogpost/:slug", (req, res) => {
    res.send(`fetch the blogpost for ${req.params.slug}`);
})

export default router;