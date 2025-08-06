class Main {

    constructor(){
        // this.systemIP = "http://172.16.102.15:8080/";
        this.systemIP = "http://172.16.1.13:8000/";
        this.systemLocalStorageTitle = "om";
        this.root = this.systemIP+"1_OM/";
        this.lsUser = this.systemLocalStorageTitle +"-user";
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
            url: self.root + "php/controllers/Employee/EmployeeRecords.php",
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
    LoginUser(rfid){
        let list = JSON.parse(localStorage.getItem(this.lsEmployeeList));
        let result = list.find(element => element.RFID === rfid);
        
        if(result){
            localStorage.setItem(this.lsUser, JSON.stringify(result));
            return true;
        } else {
            return false;
        }
    }
    CheckLoginUser(){
        let user = localStorage.getItem(this.lsUser);
        if(user){
            return JSON.parse(user);
        } else {
            return null;
        }
    }
    LogOutUser(){
        localStorage.removeItem(this.lsUser);
        // location.assign("login.html");
        return true;
    }

    SetLoginName(){
        let user = this.CheckLoginUser();
        if(user){
            return user.EMPLOYEE_NAME;
        } else {
            return "";
        }
    }
    SetLoginRFID(){
        let user = this.CheckLoginUser();
        if(user){
            return user.RFID;
        } else {
            return "";
        }
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
    SetPurpose(id){
        let list = JSON.parse(localStorage.getItem(this.lsPurposeList));
        let result = list.find(element => element.RID === id);
            
        return result ? result.PURPOSE_DESC: "";
    }

    CheckUpdate(){
        console.log("Device is ready");
        // var updateUrl = "http://172.16.1.13:8000/updates/TMS_UPDATE/version.xml";
        var updateUrl = this.systemIP+"updates/OM_UPDATE/version.xml";

        window.AppUpdate.checkAppUpdate(onSuccess, onFail, updateUrl);

        function onFail(error) {
            console.log("App update check failed:", error);
        }
        function onSuccess(response) {
        console.log("App update check successful");
        }
    }
    CheckConnection(callback){
        let self = this;
        $.ajax({
            url: self.root+'/config/connectionTest.php',
            type: 'POST',
            data:{},
            success: function(response) {

                callback('<span class="text-success">'+response+'</span>');
    
            },
            error: function(response){
                callback('<span class="text-danger">ERROR CONNECTION</span>');
            },
        });
    }
    SetIP(){
        return this.systemIP;
    }
}

let main = new Main();

main.GetMachineList();
main.GetEmployeeRecords();
main.GetPurposeRecords();

document.addEventListener('deviceready', function () {
    main.CheckUpdate();
}, false);


