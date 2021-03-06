import {imgSave} from "../effect/imgLocalIndex.js";

export function imgOptimization(){

const profileimg = document.getElementById("profileimg");
const artimgsrc = document.getElementById("artimgsrc");
//test
//profileimg.setAttribute('src','./src/images/coffee.jpg');
//test

// console.log(profileimg);
// console.log(profileimg.currentSrc.length);
// console.log(profileimg);
// console.log(profileimg.src.length);
const preview = document.getElementsByClassName("anime-img");
const uploadlabel = document.getElementById("uploadlabel");
const imguploads = document.getElementById("imguploads");
const imageicon = document.getElementsByClassName("imageicon");
const imageplusicon = document.getElementsByClassName("imageplus-icon");
const cbtn = document.getElementById("c-btn");
const ubtn = document.getElementById("u-btn");

if(profileimg.naturalHeight === 0){
    console.log("srcが空");
    profileimg.style.display = "none";
    uploadlabel.style.display = "block";
    preview[0].style.height = "285px";
    preview[0].style.width = "450px";
    
    imguploads.addEventListener('change',()=>{
        if(cbtn == !undefined){
            cbtn.style.opacity = "0.5";
            cbtn.type="button";
        }
        if(ubtn == !undefined){
            ubtn.style.opacity = "0.5";
            ubtn.type="button";
        }
        const prevzone = document.getElementById("imgprev");
        const sizelimit = 3000000;
        function previewFile(file) {
            const reader = new FileReader();
            // URLとして読み込まれたときに実行する処理
            reader.onload = function (e) {
                const imageUrl = e.target.result; // URLはevent.target.resultで呼び出せる
                const img = new Image(); // img要素を作成
                img.src = imageUrl; // URLをimg要素にセット
                console.log(img.width);
                img.style.objectFit = "cover";
                img.style.height = "inherit";
                img.style.width = "100%";
                if(prevzone.hasChildNodes()){
                    prevzone.removeChild(prevzone.firstChild);
                }
                prevzone.appendChild(img); // #previewの中に追加

                setTimeout(() => {
                    const canvas = document.createElement("canvas");
                    canvas.width = img.width;
                    canvas.height = img.height;
                    let ctx = canvas.getContext('2d');
                    // ctx.clearRect(0, 0, 450,285);
                    // 画像をコピーします (このメソッドで画像をカットすることができます)
                    if(img.naturalWidth >= img.naturalHeight){
                        const tateyoko = img.naturalWidth/img.naturalHeight;
                        // ctx.drawImage(img, 0, 0,img.naturalWidth,img.naturalHeight,0,0,450,450/tateyoko);
                        if(285*tateyoko < 450){
                            ctx.drawImage(img, 0, 0,img.naturalWidth,img.naturalHeight,0,0,450,450/tateyoko);
                        }else{
                            ctx.drawImage(img, 0, 0,img.naturalWidth,img.naturalHeight,0,0,285*tateyoko,285);
                        }
                    }else{
                        const tateyoko = img.naturalHeight/img.naturalWidth;
                        ctx.drawImage(img, 0, 0,img.naturalWidth,img.naturalHeight,0,0,285*tateyoko,285);
                    }
                    //ctx.drawImage(img, 0, 0,img.naturalWidth,img.naturalHeight,0,0,450,285);
                    imgSave(canvas,imguploads.files[0].name)
                    .then(r =>{
                         artimgsrc.value=r;
                         if(cbtn == !undefined){
                            cbtn.type="submit";
                            cbtn.style.opacity = "1";
                        }
                        if(ubtn == !undefined){
                            ubtn.type="submit";
                            ubtn.style.opacity = "1";
                        }
                    });
                }, 500);
                    //=>>canvas化+保存
            }

            // いざファイルをURLとして読み込む
            reader.readAsDataURL(file);
        }
        // changeイベントで呼び出す関数
        const handleImageSelect = ()=>{
            const im = imguploads.files[0];
            if(im.size>sizelimit){
                alert("ファイルが大きすぎます");
            }else if(im.size<=sizelimit){
                console.log(im);
                previewFile(im);
            }
        }

        handleImageSelect();
        imageicon[0].style.opacity = "0";
        imageplusicon[0].style.opacity = "0";
        uploadlabel.addEventListener("mouseover",()=>{
            imageicon[0].style.opacity = "1";
            imageplusicon[0].style.opacity = "1";
        })
        uploadlabel.addEventListener("mouseleave",()=>{
            imageicon[0].style.opacity = "0";
            imageplusicon[0].style.opacity = "0";
        })
        // ファイル選択時にhandleFileSelectを発火
        //https://code-kitchen.dev/html/input-file/ 
    });
    
} else if(profileimg.naturalHeight >= 1){
    console.log("srcが空じゃない");
    imguploads.style.display = "none";
    profileimg.style.width = "450px";
    profileimg.style.height = "285px";
    profileimg.style.objectFit = "cover";
}

}