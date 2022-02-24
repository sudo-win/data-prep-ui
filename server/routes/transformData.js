var express = require('express')
var router = express.Router()
const spawn = require('child_process').spawn

router.post('/', function (req, res, next) {
    
    pyParameter = JSON.stringify(req.body)
    

    console.log(pyParameter)
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
            
            resolve(data.toString())
            res.send(data.toString())

            pythonProcess.stderr.on('data', reject)
        })
    })
})

module.exports = router
