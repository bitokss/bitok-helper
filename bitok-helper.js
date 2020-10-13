setTimeout(() => {
    let table = document.getElementById("courseTable");
    // console.log(table.rows.length);
    for (let i = 1; i < table.rows.length; i++) {
        let row = table.rows[i];
        let button = row.cells[0].firstChild;
        let onclickStr = button.getAttribute("onclick");
        let dest = onclickStr.slice(onclickStr.indexOf('(') + 2,
                                        onclickStr.indexOf(')') - 1);
        
        let a = document.createElement("a");
        a.setAttribute("href", "http://" + dest);
        a.innerHTML = "برای ورود کلیک کنید";
        let newCell = row.insertCell(0);
        newCell.appendChild(a);
        
        if (dest.search("_2224") >= 0) {
            row.style.backgroundColor = "#4CAF50";
        }
    }
}, 3000);
    
