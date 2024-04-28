let table = document.querySelector("#container>#innerContainer>.tableDiv>table")

console.log(table)

let getData = async(URL) =>{
    let res = await fetch(URL);
    let res2 = await res.json();
    
    let data = res2.data
    
    function displayData(data){
        let tbody = document.querySelector("#container>#innerContainer>.tableDiv>table>tbody")
        tbody.innerHTML = "";
        let sNo = 1;
        data.forEach(function(ele){
            console.log(ele)
            let tr=document.createElement("tr");
            for(let i=0; i<5; i++){
                let td = document.createElement("td");
                if(i==0){
                    td.innerText = sNo;
                    tr.append(td)
                }
                else if(i==1){
                    td.innerText = ele.name;
                    tr.append(td)
                }
                else if(i==2){
                    td.innerText = ele.gender;
                    tr.append(td)
                }
                else if(i==3){
                    td.innerText = ele.department;
                    tr.append(td)
                }
                else if(i==4){
                    td.innerText = ele.salary;
                    tr.append(td)
                }
                
            }
            sNo++
            tbody.append(tr)
        })
        // sNo = 1;
    }

    let next = document.querySelector("#nxt")
    next.addEventListener("click",function(){
        let set = 0;
        const limit = 10;

        function getNextData(){
            const nextData = data.slice(set,set+limit);
            set += limit;
            return nextData
        }
        const nextData = getNextData();
        displayData(nextData)
    })


    let department = document.querySelector("#Department")
    department.addEventListener("change",function(){
        let val1 = department.value
        let fliDepartDatta = data.filter(function(ele){
            if(ele.department==val1){
                return ele
            }
        })
        displayData(fliDepartDatta)
    })

    let gender = document.querySelector("#Gender")
    gender.addEventListener("change",function(){
        let val1 = gender.value
        let fliDepartDatta = data.filter(function(ele){
            if(ele.gender==val1){
                return ele
            }
        })
        displayData(fliDepartDatta)
    })

    let salary = document.querySelector("#Salary")
    salary.addEventListener("change",function(){
        let val3 = salary.value;
        let filterData
        if(val3=="Low to High"){
            filterData = data.sort(function(a,b){
                return a.salary - b.salary
            })
        }
        else if(val3 == "High to Low"){
            
            filterData = data.sort(function(a,b){
                return b.salary - a.salary
            })
            
        }
        else{
            filterData = data
        }
        displayData(filterData)
    })
    
    displayData(data)
    
}

getData("https://dbioz2ek0e.execute-api.ap-south-1.amazonaws.com/mockapi/get-employees")