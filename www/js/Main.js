class Main {

    constructor(){
        this.systemIP = "http://172.16.102.15:8080/";
        this.systemLocalStorageTitle = "om";
        this.root = this.systemIP+"1_OM/";
        this.lsMachineList = this.systemLocalStorageTitle +"-machine-list";
        this.lsEmployeeList = this.systemLocalStorageTitle +"-employee-list";
        this.lsPurposeList = this.systemLocalStorageTitle +"-purpose-list";
    }

    GetMachineList(){
        let self = this;
        $.ajax({
            url: self.root + "php/controllers/Machine/Records.php",
            method: "POST",
            data: {},
            datatype: "json",
            success: function(response){
                // console.log(response);
                let list = response.data;

                localStorage.setItem(self.lsMachineList, JSON.stringify(list))
                // alert(list);
                // console.log(list);
            },
            error: function(err){
                console.log("Error:"+JSON.stringify(err));
            },
        });
    }
    GetEmployeeRecords(){
        let self = this;
        $.ajax({
            url: self.root + "php/controllers/Allocation/EmployeeRecords.php",
            method: "POST",
            data: {},
            datatype: "json",
            success: function(response){
                // console.log(response);
                let list = response.data;

                localStorage.setItem(self.lsEmployeeList, JSON.stringify(list));
                // console.log(list);
            },
            error: function(err){
                console.log("Error:"+JSON.stringify(err));
            },
        });
    }
    GetPurposeRecords(){
        let self = this;
        $.ajax({
            url: self.root + "php/controllers/Purpose/Records.php",
            method: "POST",
            data: {},
            datatype: "json",
            success: function(response){
                // console.log(response);
                let list = response.data;

                localStorage.setItem(self.lsPurposeList, JSON.stringify(list));
            },
            error: function(err){
                console.log("Error:"+JSON.stringify(err));
            },
        });
    }



    SetEmployeeName(id){
        let list = JSON.parse(localStorage.getItem(this.lsEmployeeList));
        
        if(id == 1){
            return "SYSTEM ADMIN"
        } else {
            let result = list.find(element => element.RFID === id);

            return result ? result.EMPLOYEE_NAME: "";
        }
    }
}

let main = new Main();

main.GetMachineList();
main.GetEmployeeRecords();
main.GetPurposeRecords();