// let b=document.getElementById("blue");
// b.addEventListener("click",()=>{
//     setInterval(()=>{
//         let poe=0;
//         b.style.top=poe+"px"
//     },5)
// })

run = () => {
    let b = document.getElementById("blue");
    let poe = 0;
    let anim = setInterval(() => {
        if (poe == 410) {
            setInterval.clear(anim)
        }
        else {

            b.style.top = poe +"px"
            b.style.left = poe +"px"
            poe++;
        }
    }, 1)
}
