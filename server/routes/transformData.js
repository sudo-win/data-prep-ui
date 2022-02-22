var express = require('express')
var router = express.Router()
const spawn = require('child_process').spawn

router.post('/', function (req, res, next) {
    console.log(req.body)
    pyParameter = req.body
    console.log(global.g_filepath)
    const pythonProcess = spawn('python', [
        '../python/transform.py',
        pyParameter,
        global.g_filepath,
    ])
    pythonProcess.stderr.pipe(process.stderr)
    pythonProcess.stdout.pipe(process.stdout)
    return new Promise((resolve, reject) => {
        pythonProcess.stdout.on('data', (data) => {
            console.log(typeof data)
            resolve(data.toString())
            res.send(data.toString())

            pythonProcess.stderr.on('data', reject)
        })
    })
})

module.exports = router
