const fs = require('fs');

let root = __dirname + '/node_modules/';

fs.readdir(root, function(err, list){
    // list node modules
    for (let el in list) {
        let path = root + list[el];

        fs.readdir(path, function(err, sublist) {

            for ( let file in sublist ) {

                if ('.bin' == sublist['file']) return;

                let subpath = path + '/' + sublist[file];

                if(fs.lstatSync(subpath).isDirectory()) {
                    fs.readdir(subpath, function(err, module) {
                        for( let f of module ) {
                            if (f.indexOf('.metadata.json') > -1) {
                                alterFile(subpath + '/' + f);
                            }
                        }
                    })
                } else {
                    if (sublist[file].indexOf('.metadata.json') > -1) {
                        alterFile(subpath);
                    }
                }
            }
        })
    }
})

function alterFile(file) {
    let raw = fs.readFileSync(file).toString();
    try {
        var obj = JSON.parse(raw);
    } catch (e) {
        console.log(e);
        return;
    }

    if (obj.version == 4) {
        obj.version = 3;
        console.log("Updating", file)
    } else if(obj[0] && obj[0].version == 4) {
        obj[0].version = 3;
        obj.version = 3;console.log("Updating", file)
    }

    fs.writeFileSync(file, JSON.stringify(obj));
}
