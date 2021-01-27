import {imgSave} from "../effect/imgLocalIndex.js";

export function imgOptimization(){

const profileimg = document.getElementById("profileimg");
const artimgsrc = document.getElementById("artimgsrc");

const preview = document.getElementsByClassName("anime-img");
const uploadlabel = document.getElementById("uploadlabel");
const imguploads = document.getElementById("imguploads");
const imageicon = document.getElementsByClassName("imageicon");
const imageplusicon = document.getElementsByClassName("imageplus-icon");
const cbtn = document.getElementById("c-btn");
const ubtn = document.getElementById("u-btn");
const createen = document.getElementsByClassName("createcardew");

if(profileimg.naturalHeight === 0){
    console.log("srcが空");
    profileimg.style.display = "none";
    uploadlabel.style.display = "block";
    preview[0].style.height = "190px";
    preview[0].style.width = "90vw";
    
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
                    alert(img.naturalHeight);
                    alert(img.naturalWidth);
                    alert(img.height);
                    alert(img.width);
                    const canvas = document.createElement("canvas");
                    canvas.width = img.width;
                    canvas.height = img.height;
                    let ctx = canvas.getContext('2d');
                    // ctx.clearRect(0, 0, 450,285);
                    // 画像をコピーします (このメソッドで画像をカットすることができます)
                    if(img.naturalWidth >= img.naturalHeight){
                        alert("横長ですね")
                        const tateyoko = img.naturalWidth/img.naturalHeight;
                        if(190*tateyoko < window.outerWidth){
                            ctx.drawImage(img, 0, 0,img.naturalWidth,img.naturalHeight,0,0,window.outerWidth,window.outerWidth/tateyoko);
                        }else{
                            // ctx.drawImage(img, 0, 0,img.naturalWidth,img.naturalHeight,0,0,285*tateyoko,285);
                            ctx.drawImage(img, 0, 0,img.naturalWidth,img.naturalHeight,0,0,window.outerWidth,window.outerWidth/tateyoko);
                        }
                    }else{
                        alert("縦長ですね");
                        const prevheight = 0.48*window.outerWidth;
                        // const tateyoko = img.naturalHeight/img.naturalWidth;

                        const trimstartY = (img.naturalHeight-prevheight)/2;
                        const trimendY = trimstartY + prevheight;

                        alert("prevheight:"+prevheight);
                        alert("trimstartY"+trimstartY);
                        alert("trimendY:"+trimendY);
                        alert("window.outerWidth*0.9:"+window.outerWidth*0.9);

                        ctx.drawImage(img, 0, trimstartY,img.naturalWidth,trimendY-(prevheight/2),0,0,window.outerWidth*0.9,prevheight);
                        document.body.appendChild(canvas);
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
    if(createen[0] == undefined){
        imguploads.style.display = "none";
        profileimg.style.width = "90vw";
        profileimg.style.height = "190px";
    }else if(createen[0] !== undefined){
        profileimg.style.width = "70vw";
        profileimg.style.height = "180px";
    }
    profileimg.style.objectFit = "cover";
}

}