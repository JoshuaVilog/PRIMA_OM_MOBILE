class Operation extends Main {

    constructor(){
        super()
    }

    CheckMachineCodeQR(qr){
        let list = JSON.parse(localStorage.getItem(this.lsMachineList));
        let result = list.find(element => element.MACHINE_NAME === qr);
            
        return result ? true: false;
    }
    CheckUserQR(qr){
        let list = JSON.parse(localStorage.getItem(this.lsEmployeeList));
        let result = list.find(element => element.RFID === qr);
            
        return result ? true: false;
    }

    PopulatePurpose(selectElem, id){
        let list = JSON.parse(localStorage.getItem(this.lsPurposeList));
        let options = '<option value="">-SELECT-</option>';

        for(let index = 0; index < list.length; index++){
            let selected = "";
            if(id != undefined && list[index].RID == id){
                selected = "selected";
            }
            options += '<option value="'+list[index].RID+'">'+list[index].PURPOSE_DESC+'</option>';

        }

        selectElem.html(options);
    }
    PopulateMachine(selectElem, id){
        let list = JSON.parse(localStorage.getItem(this.lsMachineList));
        let options = '<option value="">-SELECT-</option>';

        for(let index = 0; index < list.length; index++){
            let selected = "";
            if(id != undefined && list[index].RID == id){
                selected = "selected";
            }
            options += '<option value="'+list[index].MACHINE_NAME+'">'+list[index].MACHINE_NAME+'</option>';

        }

        selectElem.html(options);

    }

    CheckMachineLogs(operation, callback){
        let self = this;

        $.ajax({
            url: self.root + "php/controllers/Machine/CheckMachineLogs.php",
            method: "POST",
            data: {
                machine: operation.machineCode,
                user: operation.user,
            },
            datatype: "json",
            success: function(response){
                console.log(response);
                callback(response)
            },
            error: function(err){
                console.log("Error:"+JSON.stringify(err));
                alert("Access Denied: You are not connected to the company Wi-Fi.");
            },
        });
    }

    InMachineLog(operation, callback){
        let self = this;

        if(operation.machine == "" || operation.user == "" || operation.purpose == ""){
            Swal.fire({
                title: 'Incomplete Form.',
                text: 'Please complete the login form.',
                icon: 'warning'
            })
            callback(false);
        } else {
            $.ajax({
                url: self.root + "php/controllers/Machine/InMachineLogs.php",
                method: "POST",
                data: {
                    machine: operation.machine,
                    user: operation.user,
                    purpose: operation.purpose,
                },
                datatype: "json",
                success: function(response){
                    console.log(response);
    
                    Swal.fire({
                        title: 'IN Status Success!',
                        text: '',
                        icon: 'success',
                        confirmButtonColor: '#3085d6',
                        confirmButtonText: 'Proceed!',
                        timer: 2000,
                        willClose: () => {
                            // window.location.href = "dashboard";
                            // self.DisplayRecords(attendance.date, attendance.table);
                        },
                    })

                    callback(true)
                },
                error: function(err){
                    console.log("Error:"+JSON.stringify(err));
                    alert("Access Denied: You are not connected to the company Wi-Fi.");
                    callback(false)
                },
            });
        }
        

    }

    OutMachineLog(operation, callback){
        let self = this;

        $.ajax({
            url: self.root + "php/controllers/Machine/OutMachineLogs.php",
            method: "POST",
            data: {
                user: operation.user,
                rid: operation.rid,
            },
            datatype: "json",
            success: function(response){
                console.log(response);

                Swal.fire({
                    title: 'OUT Status Success!',
                    text: '',
                    icon: 'success',
                    confirmButtonColor: '#3085d6',
                    confirmButtonText: 'Proceed!',
                    timer: 2000,
                    willClose: () => {
                        // window.location.href = "dashboard";
                        // self.DisplayRecords(attendance.date, attendance.table);
                        
                    },
                })
            },
            error: function(err){
                console.log("Error:"+JSON.stringify(err));
                alert("Access Denied: You are not connected to the company Wi-Fi.");
            },
        });
    }


}

