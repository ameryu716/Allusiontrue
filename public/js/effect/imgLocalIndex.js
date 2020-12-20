export const imgSave = async function(canvas,filename){
    return new Promise((resolve,reject)=> {
        canvas.toBlob((blob)=>{
            const db = new Dexie("IMGDB");
            db.version(1)
                .stores({
                    files: "name"
                });
            // IndexedDBへ保存
            db.files.put({name: filename, data:blob});
            resolve(filename);
        });
    })
}

export const imgLoad = async function(key){
    // IndexedDBから取り出す
    const db = new Dexie("IMGDB");
    db.version(1)
        .stores({
            files: "name"
        });
    const buff = await db.files.get(key);
    console.log(buff);

    // blobをObjectURLへ変換
    const objecturl = URL.createObjectURL(buff.data);
    return objecturl;
}