import {nanoid} from "nanoid";
import { ShortURL } from "../models/shorturl.model.js";

export const generateShortUrl = async (req, res)=>{
    try{
        const originalUrl = req.body.originalUrl;
        if(!originalUrl){
            return res.status(400).json({status:"BAD_REQUEST",message:"Long URL not found in the request body"});
        }

        const userId = req.user.id;

        const customCode = req.body.customUrl;
        
        let shortCode ;
        if(customCode){
            shortCode = customCode;
            // To do check if already exists
        }
        else{
            shortCode = nanoid(7);
            let existRecord = await ShortURL.findOne({shortCode}); // {longUrl, shortCode} or null

            while(existRecord){
                shortCode = nanoid(7);
                existRecord = await ShortURL.findOne({shortCode});
                if(!existRecord){
                    break;
                }
            }

        }

        const shortURLObj = new ShortURL({
            originalUrl,
            shortCode,
            userId
        });

        await shortURLObj.save();

        return res.status(201).json(shortURLObj);

    }
    catch(error){
        return res.status(500).json({status:"INTERNAL_SERVER_ERROR",message:error.message});
    }
}

export const redirectToLongURL = async (req,res) =>{
    try{
        const shortCode = req.params.shortcode;

        const existRecord = await ShortURL.findOne({shortCode});

        if(!existRecord){
            return res.status(404).json({status:"NOT_FOUND"});
        }

        return res.redirect(existRecord.originalUrl);

    }
    catch(error){
        return res.status(500).json({status:"INTERNAL_SERVER_ERROR",message:"Something went wrong while generating short URL"});
    }
}

//http://localhost:3000/api/s/xwPlotj
