var timeout;
//for smooth scroll


const scroll = new LocomotiveScroll({
    el: document.querySelector('#main'),
    smooth: true
});

function firstPageAnim() {
    var tl = gsap.timeline();

    tl.from("#nav", {
        y: '-10',
        opacity: 0,
        duration: 1.5,
        ease: Expo.easeInOut
    });

    tl.to(".boundingElem", {
        y: 0,
        stagger: .2,//its means it gives a delay in every line with 0.2sec
        duration: 2,
        delay: -1,
        ease: Expo.easeInOut
    });

    tl.to(".boundingElem2", {
        y: 0,
        stagger: .1,//its means it gives a delay in every line with 0.2sec
        duration: 1.5,
        delay: -1,
        ease: Expo.easeInOut
    });

    tl.from("#heroFooter", {
        // y: -10,
        opacity: 0,
        stagger: .01,
        duration: 2,
        delay: -1,
        ease: Expo.fadeInOut
    });
}
// mouse ko move karte wqut circle ka squzee function 
function circleSqz() {
    //default scale value
    var xscale = 1;
    var yscale = 1;

    var xprev = 0;
    var yprev = 0;

    window.addEventListener("mousemove", function (details) {
        clearTimeout(timeout);

        xscale = gsap.utils.clamp(0.8, 1.2, details.clientX - xprev);
        yscale = gsap.utils.clamp(0.8, 1.2, details.clientY - yprev);


        xprev = details.clientX;
        yprev = details.clientY;

        mouseFollower(xscale, yscale);

        //squeeze effect
        timeout = setTimeout(function () {
            document.querySelector("#miniCircle").style.transform = `translate(${details.clientX}px, ${details.clientY}px) scale(1, 1)`;
        }, 100);

    });

}

function mouseFollower(xscale, yscale) {
    window.addEventListener("mousemove", function (details) {
        document.querySelector("#miniCircle").style.transform = `translate(${details.clientX}px, ${details.clientY}px) scale(${xscale}, ${yscale})`;

    });
}

circleSqz();
firstPageAnim();
mouseFollower();

//3no element ko select  kro
/*document.querySelectorAll(".elem").forEach(function (elem) {
    var rotate = 0;
    var diffrot = 0;

    // for mouse leave to remove img
    elem.addEventListener("mouseleave", function (details) {

        gsap.to(elem.querySelector("img"), {
            opacity: 0,
            ease: power3,

        });
    });

    // for mouse move function to show the img
    elem.addEventListener("mousemove", function (details) {
        var diff = details.clientY - elem.getBoundingClientRect().top;
        diffrot = details.clientX - rotate;
        rotate = details.clientX;

        gsap.to(elem.querySelector("img"), {
            opacity: 1,
            ease: Power3,
            top: diff,
            left: details.clientX,
            rotate: gsap.utils.clamp(-20, 20, diffrot * 0.5),

        });
    });
});  
*/

document.querySelectorAll(".elem").forEach(function (elem) {
    let rotate = 0;
    let diffrot = 0;
    let img = elem.querySelector("img");

    // Make GSAP quickTo setters (super smooth updates)
    let setX = gsap.quickTo(img, "left", { duration: 0.4, ease: "power3.out" });
    let setY = gsap.quickTo(img, "top", { duration: 0.4, ease: "power3.out" });
    let setRot = gsap.quickTo(img, "rotate", { duration: 0.4, ease: "power3.out" });

    // Mouse enter -> fade in image
    elem.addEventListener("mouseenter", function () {
        gsap.to(img, {
            opacity: 1,
            duration: 0.4,
            ease: "power3.out"
        });
    });

    // Mouse move -> update position & rotation
    elem.addEventListener("mousemove", function (details) {
        let diff = details.clientY - elem.getBoundingClientRect().top;
        diffrot = details.clientX - rotate;
        rotate = details.clientX;

        setX(details.clientX);
        setY(diff);
        setRot(gsap.utils.clamp(-20, 20, diffrot * 0.2));
    });

    // Mouse leave -> fade out image
    elem.addEventListener("mouseleave", function () {
        gsap.to(img, {
            opacity: 0,
            duration: 0.4,
            ease: "power3.out"
        });
    });
});
