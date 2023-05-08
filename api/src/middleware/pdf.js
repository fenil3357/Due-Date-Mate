const path = require('path')
const upload = (req, res, next) => {
    // console.log(req.files.ImportFileName);

    if (!req.files) {
        res.send("Excel field can't be blank");
    }

    const filess = req.files.ImportFileName;
    const uploadPath = path.join(__dirname, "..", '/uploads/', filess.name);
    const fileName = /upload/+filess.name; 
    res.filepath = fileName 
    /* mv used for moving file */
    filess.mv(uploadPath, function (err) {    

        if (err)
            return res.status(500).send(err);
        next()
    })
}


module.exports = upload;


// const multer=require("multer")

// var storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//        cb(null, 'uploads');
//     },
//     filename: (req, file, cb)=> {
//        cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
//     }
//  });
  
//  var upload = multer({ storage: storage });
 
//  var type = upload.single('avatar');

//  module.exports = type;
