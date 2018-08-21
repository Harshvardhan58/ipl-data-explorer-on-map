var mongoService = require('../services/mongo');
var fs = require('fs');
const formidable = require('formidable');
const csv = require('fast-csv');
module.exports = (app) =>{
    app.post("/upload", function(req, res) {
        var form = new formidable.IncomingForm();
        console.log(req.body);
        form.parse(req, function (err, fields, files) {
            var oldpath = files.filetoupload.path;
            var newpath = './uploads/' + files.filetoupload.name;
            fs.copyFile(oldpath, newpath, function (err) {
              if (err) throw err;
              else{
                  fs.createReadStream(newpath)
                  .pipe(csv())
                  .on('data',function(data){
                      mongoService.save(data);
                  })
                  .on('end',function(data){
                      console.log('read finished');
                  });
              }
            });

        res.send('ok');
    });
});
app.get('/get_all_seasons',async (req,res)=>{
    mongoService.get_all_seasons().then((data)=>{
        res.send(data);
    });
    
});
app.get('/get_all_dates_season',async (req,res)=>{
    await mongoService.get_all_dates_season(String(req.query.season)).then((data)=>{
         res.send(data);
    });
    
});
app.get('/get_map_data',async (req,res)=>{
    mongoService.get_map_data(String(req.query.date)).then((data)=>{
        res.send(data);
    });
});
}