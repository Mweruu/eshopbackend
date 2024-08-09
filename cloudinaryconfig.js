const cloudinary = require('cloudinary').v2;
        
cloudinary.config({ 
  cloud_name: 'dcuwwdobx', 
  api_key: '739567484877982', 
  api_secret: 'E8ojGGAfdi6_nxTEmpUKCGELhzU' 
});

module.exports = cloudinary;