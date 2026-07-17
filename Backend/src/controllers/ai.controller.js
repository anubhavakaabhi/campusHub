import {main} from "../config/ai.js";

async function generateNotes(req, res){
    const {id} = req.params;
    const notes = await main(id);
    return res.status(200).json({
        message:"Notes generated successfully",
        notes,
    });
}

export {generateNotes};