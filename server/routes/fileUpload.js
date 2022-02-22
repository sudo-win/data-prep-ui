var express = require('express')
var multer = require('multer')
var router = express.Router()
const spawn = require('child_process').spawn

var storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, '../uploads/')
    },
    filename: function (req, file, callback) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9)
        global.g_filepath =
            '../uploads/' + uniqueSuffix + '-' + file.originalname
        callback(null, uniqueSuffix + '-' + file.originalname)
    },
})

function csvFileFilter(req, file, cb) {
    if (file.mimetype === 'text/csv') {
        cb(null, true)
    } else {
        console.log('Error in File type')
        cb(new Error('Not a csv file'), false)
    }
}

const upload = multer({ storage: storage, fileFilter: csvFileFilter })

router.post('/', upload.single('csvfile'), function (req, res, next) {
    const file = req.file
    if (!file) {
        const error = new Error('Please upload a file')
        error.httpStatusCode = 400
        return next(error)
    }
    filepath = '../uploads/' + file.filename

    const pythonProcess = spawn('python', ['../python/main.py', filepath])
    pythonProcess.stderr.pipe(process.stderr)
    pythonProcess.stdout.pipe(process.stdout)
    return new Promise((resolve, reject) => {
        pythonProcess.stdout.on('data', (data) => {
            resolve(data.toString())
            res.send(data.toString())

            pythonProcess.stderr.on('data', reject)
        })
    })
})

module.exports = router
