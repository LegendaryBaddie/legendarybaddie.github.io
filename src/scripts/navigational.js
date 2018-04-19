import { data } from './projectsHtml.js';

//end of drawing beginning of onclick animation swap
    const setNavBar = () =>{
            document.querySelector('#name').style.display = "none";
            document.querySelector('#content').classList.remove('unstyledContent');
            document.querySelector('#content').classList.add('styledContent');
            document.querySelector('#navContainer').id = "styledNavContainer";
    }
    export const navClickEvents = () =>{
        
        let aboutMe = document.querySelector('#aboutMe');
        let projects = document.querySelector('#projects');
        let otherStuff = document.querySelector('#otherStuff');
        let currentPageEnum = null;//0=aboutme 1=projects 2=otherstuff
        let pageRef = [document.querySelector('#contentAbout'),
                document.querySelector('#contentProject'),
                document.querySelector('#contentOther')];
        aboutMe.onclick = () =>{
            
            //change ul id
            //this also gives us the first time any button is clicked so hide the name header in here
            if(currentPageEnum===null){
                setNavBar();
                currentPageEnum=0;
                aboutMe.classList.add("currentPage");
                pageRef[0].style.display = "block";
            }
            //if this link isnt the current page
            if(currentPageEnum!=0){
                //remove the class from the other two
                projects.classList.remove("currentPage");
                otherStuff.classList.remove("currentPage");
                //add it to aboutme
                aboutMe.classList.add("currentPage");

                slideContent(false,pageRef[currentPageEnum],pageRef[0]);
                 currentPageEnum=0;
            }
        }
        projects.onclick = () =>{
            //change ul id
            if(currentPageEnum===null){
                setNavBar();
                currentPageEnum=1;
                projects.classList.add("currentPage");
                pageRef[1].style.display = "block";
            }
            //change projects css
             if(currentPageEnum!=1){
                //remove the class from the other two
                aboutMe.classList.remove("currentPage");
                otherStuff.classList.remove("currentPage");
                //add it to aboutme
                projects.classList.add("currentPage");
                //decide direction with math
                let destepBool = currentPageEnum<1;
                slideContent(destepBool,pageRef[currentPageEnum],pageRef[1]);
                 currentPageEnum=1;
            }
        }
        otherStuff.onclick = () =>{
            //change ul id
            if(currentPageEnum===null){
                setNavBar();
                currentPageEnum= 2;
                otherStuff.classList.add("currentPage");
                pageRef[2].style.display = "block";
            }
            //change aboutMe css
             if(currentPageEnum!=2){
                //remove the class from the other two
                projects.classList.remove("currentPage");
                aboutMe.classList.remove("currentPage");
                //add it to aboutme
                otherStuff.classList.add("currentPage");
                //will always slide to the right
                slideContent(true,pageRef[currentPageEnum],pageRef[2]);
                currentPageEnum=2;
            }
        }
    }
    // direction true= left, false= right
    //direction to slide
    // old content dom refrence
    // incoming new content dom reference
    
    const slideContent = (direction, old, incoming) =>{
        let scrollBar = document.querySelector("body");
        scrollBar.style.overflowX ="hidden";
        if(direction){
            //left
            old.style.animationFillMode = "forwards";
            old.style.animation = "0.3s linear slideOutToLeft";
            setTimeout(()=>{old.style.display="none"},300);
            setTimeout(()=>{incoming.style.display = "block";},300);
            incoming.style.animationFillMode = "forwards";
            incoming.style.animation = "0.2s linear slideInFromRight";
        }else{
           //right 
            old.style.animationFillMode = "forwards";
            old.style.animation = "0.3s linear slideOutToRight";
            setTimeout(()=>{old.style.display="none"},300);
            setTimeout(()=>{incoming.style.display = "block";},300);
            incoming.style.animationFillMode = "forwards";
            incoming.style.animation = "0.3s linear slideInFromLeft";
        }
        setTimeout(()=>{scrollBar.style.overflowX ="visible";},600);
    }

    let modalTarget;
    let modalActive=false;
    export const projectClickEvents = () =>{
        let doc = document.querySelectorAll('.projectMiniBox');
        doc.forEach((e) =>{
                e.onmouseover=()=>{
                    //access the h3 element;
                    if(!modalActive){
                        e.children[1].style.display="block";
                    }
                }
                e.onmouseout=()=>{
                    if(!modalActive){
                        e.children[1].style.display="none";
                    }
                }
                e.onclick=()=>{
                     e.id = "mainModal";
                    
                     document.querySelector("#content").style.zIndex="10001";
                     document.querySelector("#content").style.boxShadow="none";
                     document.querySelector("#fancyBox").style = "transition:all 0.5s;z-index:10002;width:100%;height:100%;position:absolute;opacity:.8;background:#DEDFDF;";
                   //toggle on modal
                   document.querySelector('#modal').style.zIndex = "10000";
                   document.querySelector('#modal').style.opacity = ".8";
                   document.querySelector('body').style.cursor = "pointer";
                   //pull from modalHTMLhash where e.dataset.type is the key
                   modalTarget=e;
                    switch(e.dataset.type){
                        case "pong":
                                modalTarget.innerHTML = data.pongHTML;
                                break;
                        case "putton":
                                modalTarget.innerHTML = data.puttonHTML;
                                break;
                        case "audio":
                                modalTarget.innerHTML = data.audioHTML;
                                break;
                        case"unnamed":
                                modalTarget.innerHTML = data.unnamedHTML;
                                break;
                    }
                    modalActive=true;
                }
        });
        //modal hovering
    
            document.querySelector("#fancyBox").onmouseover = () =>{
                if(modalActive){
                document.querySelector("#fancyBox").style.opacity="0";
                document.querySelector("#modal").style.opacity="0";
                modalTarget.style.background="#DEDFDF";
                }
            }
            document.querySelector("#fancyBox").onmouseout = () =>{
                if(modalActive){
                document.querySelector("#fancyBox").style.opacity=".8";
                document.querySelector("#modal").style.opacity=".8";
                modalTarget.style.background="#000";
                }
            }
            document.querySelector("#modal").onmouseover = () =>{
                if(modalActive){
                document.querySelector("#fancyBox").style.opacity="0";
                document.querySelector("#modal").style.opacity="0";
                modalTarget.style.background="#DEDFDF";
                }
            }
            document.querySelector("#modal").onmouseout = () =>{
                if(modalActive){
                document.querySelector("#fancyBox").style.opacity=".8";
                document.querySelector("#modal").style.opacity=".8";
                modalTarget.style.background="#000";
                }
            }
        
        document.onclick=(e)=>{
            if(e.target.id == "modal" || e.target.id=="fancyBox"){
                //reset everthing back
                modalTarget.style.background="#000";
                switch(modalTarget.dataset.type){
                        case "pong":
                                modalTarget.innerHTML = data.pongHTMLShort;
                                break;
                        case "putton":
                                modalTarget.innerHTML = data.puttonHTMLShort;
                                break;
                        case "audio":
                                modalTarget.innerHTML = data.audioHTMLShort;
                                break;
                        case "unnamed":
                                modalTarget.innerHTML = data.unnamedHTMLShort;
                                break;
                    }
                modalTarget.id = "";

                document.querySelector("#content").style.zIndex="10001";
                document.querySelector("#content").style.boxShadow="none";
                document.querySelector("#fancyBox").style="";
                document.querySelector('body').style.cursor = "default";
                modalActive=false;
            document.querySelector('#modal').style.zIndex = "-1";
            document.querySelector('#modal').style.opacity = "0";
            }
            }
    }