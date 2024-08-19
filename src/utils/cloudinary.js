
import {v2 as cloudinary} from "cloudinary"

import fs from fs;



cloudinary.config({ 
    cloud_name:process.env.CLOUDINARY_CLOUD_NAME, 
    api_key:process.env.CLOUDINARY_API_KEY , 
    api_secret: process.env.API_SECRET
});



const uploadOnCloudinary= async (LocalPath)=>{

try{

if(!LocalPath) return null;

const response =await cloudinary.uploader.upload(LocalPath,{resource_type:'auto'})



console.log('File is uploaded on cloudinary',response.url);
return url

}


catch(error){
fs.unlinkSync(LocalPath)

return null;



}
}


export {uploadOnCloudinary}


