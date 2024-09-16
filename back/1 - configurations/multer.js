const multer = require('multer');
const fs = require('fs');
const d = '1 - configurations/photos';

const storg = multer.diskStorage({destination: (req,file,callback)=>{ fs.mkdirSync(d, {recursive:true});
                                                                      callback(null, d);
                                                                    }, 
                                  filename: (req,file,callback)=>{ 
                                                                  callback(null, file.originalname+Date.now()); //what to parse in req.file.filename
                                                                }
                                });

const midleware = multer({
                          storage: storg ,
                          limits: {fileSize:1024*1024*10} , //req.file is undifined if 'limits' and 'fileFilter' are not met
                          fileFilter: (req, file, callback)=>{
                                        if(file.mimetype.split("/")[0]!=="image")
                                          callback("Error: Only Images!", false);
                                        else {return callback(null, true);}
                                    }
                        });

module.exports = midleware.single("photo"); //the parser midleware