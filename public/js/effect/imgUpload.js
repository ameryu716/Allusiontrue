export function imgOptimization(){

const profileimg = document.getElementById("profileimg");
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

if(profileimg.naturalHeight === 0){
    console.log("srcが空です");
    console.log(profileimg);
    profileimg.style.display = "none";
    uploadlabel.style.display = "block";
    preview[0].style.height = "285px";
    preview[0].style.width = "450px";
    
    imguploads.addEventListener('change',()=>{
        const sizelimit = 3000000;
        function previewFile(file) {
            const reader = new FileReader();
            // URLとして読み込まれたときに実行する処理
            reader.onload = function (e) {
                const imageUrl = e.target.result; // URLはevent.target.resultで呼び出せる
                const img = document.createElement("img"); // img要素を作成
                img.src = imageUrl; // URLをimg要素にセット
                img.style.objectFit = "cover";
                img.style.height = "inherit";
                img.style.width = "100%";
                preview[0].appendChild(img); // #previewの中に追加
            }

            // いざファイルをURLとして読み込む
            reader.readAsDataURL(file);
        }
        // changeイベントで呼び出す関数
        const handleImageSelect = ()=>{
            const im = imguploads.files[0];
            console.log(im);
            if(im.size>sizelimit){
                alert("ファイルがでかいです。");
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
    console.log("srcが空じゃないよ");
    console.log(profileimg)
    imguploads.style.display = "none";
    profileimg.style.width = "450px";
    profileimg.style.height = "285px";
    profileimg.style.objectFit = "cover";
}

}