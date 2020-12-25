fs = require('fs');

module.exports.fileWrite = (filename,writedata,format) => {
    fs.exists(filename, function(exists) {
        if(exists){
            console.log('file exists');
            fs.readFile(filename,function readFileCallback(err,data){
                if (err) {
                    console.log(err);
                } else {
                    obj = JSON.parse(data);
                    obj.push(writedata);
                    let json = JSON.stringify(obj);
                    fs.writeFile(filename, json, format, (err)=>{
                        console.log(err);
                    });
                }
            })
        }
        else{
            console.log('sorry file not found');
        }
    })
}

module.exports.fileEdit =(filename,editdata,format,id) => {
    fs.exists(filename, function(exists) {
        if(exists){
            console.log('File exists');

            fs.readFile(filename,function readFileCallback(err,data){
                if(err){
                    console.log(err)
                }
                obj = JSON.parse(data);
                obj.find((p)=> {
                    if(p.id===id){
                        p.name = editdata.name;
                        p.description=editdata.description;
                        p.price=editdata.price;
                    }
                    
                });
                json = JSON.stringify(obj);
                fs.writeFile(filename, json, format, (error)=>{
                    console.log(error);
                })
            })
        }
        else{
            console.log('sorry file not found');
        }
    })
}

module.exports.fileDelete = (filename,data,format,id) => {
    fs.exists(filename, function(exists) {
        if(exists){
            console.log('File exists');

            fs.readFile(filename,function readFileCallback(err,data){
                if(err){
                    console.log(err)
                }
                obj = JSON.parse(data);
                let index = obj.indexOf(obj.find((p)=>p.id===id));
                obj.splice(index, 1);
                json = JSON.stringify(obj);
                fs.writeFile(filename, json, format, (error)=>{
                    console.log(error);
                })
            })
        }
        else{
            console.log('sorry file not found');
        }
    })
}