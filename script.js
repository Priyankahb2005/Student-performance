// ===================== DARK MODE =====================

const themeBtn = document.getElementById("themeBtn");

themeBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark");
    themeBtn.innerHTML =
        document.body.classList.contains("dark") ? "☀️" : "🌙";
});

// ===================== PREDICT =====================

let marksChart;

function predictMarks() {

    const name = document.getElementById("studentName").value;
    const reading = Number(document.getElementById("reading").value);
    const writing = Number(document.getElementById("writing").value);

    if(name===""){
        alert("Enter Student Name");
        return;
    }

    if(isNaN(reading) || isNaN(writing)){
        alert("Enter Reading and Writing Score");
        return;
    }

    // Prediction Formula

    const predicted =
    Math.round((reading*0.48)+(writing*0.52));

    let grade="";
    let status="";

    if(predicted>=90){
        grade="A+";
        status="Excellent";
    }
    else if(predicted>=80){
        grade="A";
        status="Very Good";
    }
    else if(predicted>=70){
        grade="B";
        status="Good";
    }
    else if(predicted>=60){
        grade="C";
        status="Average";
    }
    else{
        grade="D";
        status="Needs Improvement";
    }

    document.getElementById("resultCard").style.display="block";

    document.getElementById("predictedMarks").innerHTML =
    predicted+"/100";

    document.getElementById("grade").innerHTML =
    "Grade : "+grade;

    document.getElementById("status").innerHTML =
    status;

    document.getElementById("progressBar").style.width =
    predicted+"%";

    document.getElementById("progressBar").innerHTML =
    predicted+"%";

    saveHistory(name,predicted,grade,status);

    drawChart(predicted);

}

// ===================== BAR CHART =====================

function drawChart(score){

const ctx=document.getElementById("marksChart");

if(marksChart){
marksChart.destroy();
}

marksChart=new Chart(ctx,{

type:"bar",

data:{
labels:["Predicted Marks"],
datasets:[{
label:"Marks",
data:[score],
backgroundColor:["#4f46e5"]
}]
},

options:{
responsive:true,
scales:{
y:{
beginAtZero:true,
max:100
}
}
}

});

}

// ===================== HISTORY =====================

function saveHistory(name,marks,grade,status){

let history=
JSON.parse(localStorage.getItem("students"))||[];

history.push({
name,
marks,
grade,
status
});

localStorage.setItem(
"students",
JSON.stringify(history)
);

loadHistory();

}

function loadHistory(){

const table=
document.getElementById("historyTable");

table.innerHTML="";

const history=
JSON.parse(localStorage.getItem("students"))||[];

history.forEach(student=>{

table.innerHTML+=`

<tr>

<td>${student.name}</td>

<td>${student.marks}</td>

<td>${student.grade}</td>

<td>${student.status}</td>

</tr>

`;

});

}

// ===================== PDF =====================

function downloadPDF(){

const {jsPDF}=window.jspdf;

const pdf=new jsPDF();

pdf.setFontSize(22);

pdf.text(
"Student Performance Report",
20,
20
);

pdf.setFontSize(15);

pdf.text(
document.getElementById("predictedMarks").innerText,
20,
50
);

pdf.text(
document.getElementById("grade").innerText,
20,
70
);

pdf.text(
document.getElementById("status").innerText,
20,
90
);

pdf.save("Student_Report.pdf");

}

loadHistory();