const runbutton=document.getElementById("runButton");
const area=document.getElementById("consoleArea");
const editorarea=document.getElementById("editArea");
runbutton.addEventListener("click",function(event){
const code =editorarea.value;
area.textContent = "Running...\n";
try {
const result=eval(code);
if(result!==undefined){
    area.textContent+=result;
}
if(result===undefined){
   area.textContent += "Code ran (no return value)";
}
} 
catch (error) {
 area.textContent+="Error"+error.message;
}
});



