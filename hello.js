const tasks = [];

const canvas =
document.getElementById("taskCanvas");

const ctx = canvas.getContext("2d");

const clock =
document.getElementById("clockContainer");


function resizeCanvas(){

    canvas.width = clock.offsetWidth;

    canvas.height = clock.offsetHeight;

}

resizeCanvas();

window.addEventListener("resize", resizeCanvas);



setInterval(() => {

    let d = new Date();

    let htime = d.getHours();
    let mtime = d.getMinutes();
    let stime = d.getSeconds();

    let hrotation =
    30 * htime + mtime/2;

    let mrotation =
    6 * mtime;

    let srotation =
    6 * stime;

    hour.style.transform =
    `rotate(${hrotation}deg)`;

    minute.style.transform =
    `rotate(${mrotation}deg)`;

    second.style.transform =
    `rotate(${srotation}deg)`;


    // TASK COMPLETE CHECK

    for(let i=0; i<tasks.length; i++){

        let currentHour =
        new Date().getHours() % 12;

        if(currentHour >= tasks[i].end){

            alert(tasks[i].name + " completed");

            tasks.splice(i,1);

            drawTasks();

        }

    }

},1000);



function addTask(){

    let name =
    document.getElementById("taskName").value;

    let start =
    document.getElementById("startTime").value;

    let end =
    document.getElementById("endTime").value;


    if(name==="" || start==="" || end===""){

        alert("Fill all fields");

        return;

    }


    let startHour =
    parseInt(start.split(":")[0]) % 12;

    let endHour =
    parseInt(end.split(":")[0]) % 12;


    tasks.push({

        name : name,

        start : startHour,

        end : endHour

    });


    drawTasks();

}



function drawTasks(){

    ctx.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
    );


    let centerX = canvas.width / 2;

    let centerY = canvas.height / 2;

    let radius = canvas.width * 0.42;


    tasks.forEach(task => {

        let startAngle =
        (task.start * 30 - 90)
        * Math.PI / 180;

        let endAngle =
        (task.end * 30 - 90)
        * Math.PI / 180;


        ctx.beginPath();

        ctx.arc(
            centerX,
            centerY,
            radius,
            startAngle,
            endAngle
        );


        ctx.strokeStyle =
        "rgba(255,0,0,0.5)";

        ctx.lineWidth = 40;

        ctx.stroke();

    });

}