import { Router } from "express";
import { generateShortUrl, redirectToLongURL } from "../controllers/shortUrlController.js";
import { protect } from "../middlewares/authMiddleware.js";


const shortURLRouter = Router();


shortURLRouter.post("", protect,generateShortUrl);
shortURLRouter.get("/:shortcode",redirectToLongURL );


export default shortURLRouter;