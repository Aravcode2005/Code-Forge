

document.addEventListener("DOMContentLoaded", function (event) {
  const grid = GridStack.init();
  console.log("Gridstack initialized");
  const runbutton = document.getElementById("runButton");
  const area = document.getElementById("consoleArea");
  const editorarea = document.getElementById("editArea");
  const value = editorarea.value;

  const ename = editorarea.name;
  const placeholder = editorarea.placeholder;
  const isDisabled = editorarea.disabled;
  const isReadOnly = editorarea.readOnly;

  const dataAttributes = {};

  for (let attr of editorarea.attributes) {
    if (attr.name.startsWith("data-")) {
      dataAttributes[attr.name] = attr.value;
    }
  }

  const wrapper = document.createElement("div");
  wrapper.className = "code-mirror";
  const styles = window.getComputedStyle(editorarea);

  wrapper.style.width = styles.width;
  wrapper.style.height = styles.height;
  wrapper.style.margin = styles.margin;
  wrapper.style.padding = styles.padding;
  wrapper.style.border = styles.border;
  wrapper.style.fontFamily = styles.fontFamily;
  wrapper.style.fontSize = styles.fontSize;
  wrapper.style.color = styles.color;
  wrapper.style.background = styles.background;
  wrapper.style.borderRadius = styles.borderRadius;
  wrapper.style.fontWeight = styles.fontWeight;
  wrapper.className = editorarea.className + "code-mirror-wrapper";
  editorarea.parentNode.insertBefore(wrapper, editorarea);
  editorarea.style.display = "none";

  const editor = CodeMirror(wrapper, {
    value: value,
    mode: "javascript",
    theme: "dracula",
    lineNumbers: true,
    lineWrapping: true,
    indentUnit: 4,
    tabSize: 4,
    matchBrackets: true,
    autoCloseBrackets: true,
  });

  window.codeEditor = editor;
  const savex = document.getElementById("saveLayout");
  savex.addEventListener("click", function (event) {
    localStorage.setItem("editorLayout", JSON.stringify(grid.save()));
    console.log(JSON.stringify(grid.save()));
  });
  const saved = localStorage.getItem("editorLayout");
  if (saved) {
    const layout = JSON.parse(saved);
    grid.load(layout);
    console.log("Loaded saved layout!");
  }
  const resetButton = document.getElementById("resetButton");
  resetButton.addEventListener("click", function (event) {
    localStorage.removeItem("editorLayout");
    location.reload();
  });

  const form = editorarea.closest("form");

  if (form) {
    form.addEventListener("submit", function (event) {
      editorarea.value = editor.getValue();
      form.submit();
    });
  }

  runbutton.addEventListener("click", function (event) {
    const code = editor.getValue();
    area.textContent = "Running...\n";
    try {
      const result = eval(code);
      if (result !== undefined) {
        area.textContent += result;
      }
      if (result === undefined) {
        area.textContent += "Code ran (no return value)";
      }
    } catch (error) {
      area.textContent += "Error" + error.message;
    }
  });
  editor.on("change", function () {
    editorarea.value = editor.getValue();
    editorarea.dispatchEvent(new Event('change'));
  });

  editor.on("keydown", function (cm, event) {
    if (event.key === "Tab") {
      event.preventDefault();

      const cursor = cm.getCursor();

      if (event.shiftKey) {
        cm.execCommand("indentLess");
      } else {
        cm.execCommand("indentMore");
      }
      return true;
    }
    editorarea.dispatchEvent(new Event('keydown'));
  });

  editor.getWrapperElement().addEventListener("focus", function () {
    editorarea.dispatchEvent(new Event('focus'));
  });

  const islower=(x)=>{


    if(x>='a' && x<='z'){

      return true;
    }

    return false;
  }

    const isnum=(x)=>{


    if(x>='0' && x<='9'){

      return true;
    }

    return false;
  }

    const isupper=(x)=>{


    if(x>='A' && x<='Z'){

      return true;
    }

    return false;
  }

    const isspecial=(x)=>{


    const arr=['!','@','#','$','%','&','*','^','/'];

    for(let i=0 ;i<arr.length;i++){

      if(arr[i]===x){

        return true;
      }
    }

    return false;
  }
 const removewhitespaces=(s)=>{
   let strin="";

   for(let i=0;i<s.length;i++){

     if(islower(s[i]) || isupper(s[i]) || isnum(s[i]) || isspecial(s[i])){

        strin+=s[i];
     }
   }
  return strin;
 }
 const f=(s)=>{
   s=s.toLowerCase();
   
   return s;
 }
 const language=editorarea.dataset.language;
 const filex=editorarea.dataset.filename;
 const lower=f(value);
 if(language){

 try {
        editor.setOption("mode",language);
      } catch (error) {
        console.log(error);
      }
   
    }
    let stri="";
   for(let i=0;i<lower.length;i++){
   stri+=lower[i];
   if(stri==="#!"){
     let t="";
     for(let j=i;j<lower.length;j++){
      t+=lower[j];
     if(t==="/opt/homebrew/bin/php"){
      try {
        editor.setOption("mode","php");
      } catch (error) {
        console.log(error);
      }
     }

     if(t==="/usr/bin/"){
      
        if(t==="php"|| t==="php7.4"||t==="php8.2"||t==="php5"|| t==="php7"||t==="php8"){
          try {
        editor.setOption("mode","php");
      } catch (error) {
        console.log(error);
      }
       }

          if(t==="python"||t==="python2"||t==="python3"){
          try {
        editor.setOption("mode","python");
      } catch (error) {
        console.log(error);
      }
       }
      

        if(t==="bash"||t==="sh"||t==="zsh"||t==="fish"||t==="dash"){
          try {
        editor.setOption("mode","shell");
      } catch (error) {
        console.log(error);
      }
       }
        if(t==="node"||t==="node16"){
          try {
        editor.setOption("mode","javascript");
      } catch (error) {
        console.log(error);
      }
       }
         if(t==="perl"){
          try {
        editor.setOption("mode","perl");
      } catch (error) {
        console.log(error);
      }
       }
         if(t==="ruby"){
          try {
        editor.setOption("mode","ruby");
      } catch (error) {
        console.log(error);
      }
       }

         if(t==="php"|| t==="php7.4"||t==="php8.2"||t==="php5"|| t==="php7"||t==="php8"){
          try {
        editor.setOption("mode","php");
      } catch (error) {
        console.log(error);
      }
       }

         if(t==="lua"){
          try {
        editor.setOption("mode","lua");
      } catch (error) {
        console.log(error);
      }
       }

         if(t==="awk"){
          try {
        editor.setOption("mode","awk");
      } catch (error) {
        console.log(error);
      }
       }

         if(t==="sed"){
          try {
        editor.setOption("mode","php");
      } catch (error) {
        console.log(error);
      }
       }
         if(t==="php"|| t==="php7.4"||t==="php8.2"||t==="php5"|| t==="php7"||t==="php8"){
          try {
        editor.setOption("mode","php");
      } catch (error) {
        console.log(error);
      }
       }
       
  }

  else if(t==="/usr/bin/env"){
      let p=removewhitespaces(t);
    if(p===" php"){
  try {
        editor.setOption("mode","php");
      } catch (error) {
        console.log(error);
      }

    }

      
    if(p===" python"){
  try {
        editor.setOption("mode","python");
      } catch (error) {
        console.log(error);
      }

    }

       
    if(p===" node"){
  try {
        editor.setOption("mode","javascript");
      } catch (error) {
        console.log(error);
      }

    }
       
    if(p===" ruby"){
  try {
        editor.setOption("mode","ruby");
      } catch (error) {
        console.log(error);
      }

    }
 
    if(p===" bash"){
  try {
        editor.setOption("mode","shell");
      } catch (error) {
        console.log(error);
      }

    }

  }

  
 else if(t==="/bin/"){
  if(t==="bash" || t==="dash"|| t==="zsh" || t==="fish"){
  try {
        editor.setOption("mode","shell");
      } catch (error) {
        console.log(error);
      }

    }
       
 }


 else if(t==="/usr/local/bin/"){

   if(t==="php"){

    try {

      editor.setOption("mode","php")
      
    } catch (error) {
      
    }
   }

    if(t==="python3"){

    try {

      editor.setOption("mode","pyhton")
      
    } catch (error) {
      
    }
   }
 }
  
 
  
 }


}
  
 else if(stri==="C:/"){
    let x=" ";
   for(let j=i;j<lower.size();j++){
    x+=lower[i];
     if(x==="Python39/python.exe"){


      try {

        editor.setOption("mode","python")
        
      } catch (error) {
        console.log(error);
      }
     }


      if(x==="Python39/python.exe"){


      try {

        editor.setOption("mode","python")
        
      } catch (error) {
        console.log(error);
      }
     }

     else if(x==="php/php.exe"){

      try {

        editor.setOption("mode","php")
        
      } catch (error) {
        console.log(error);
      }

     }

   }


  }

  

  
  }

 
  

});

