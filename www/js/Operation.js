class Operation extends Main {

    constructor(){
        super()
        this.tableHistoryLogs = null;
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
            if(list[index].DELETED_AT == null){
                let selected = "";

                if(id != undefined && list[index].RID == id){
                    selected = "selected";
                }
                options += '<option value="'+list[index].RID+'" '+selected+'>'+list[index].PURPOSE_DESC+'</option>';
            }
        }

        selectElem.html(options);
        selectElem.select2({});
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
            url: self.root + "php/controllers/Machine/CheckMachineLogv10003.php",
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
                callback({rid: 0, status: ""})
                alert("Access Denied: Kindly seek assistance from the MIS Department.");
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
                    remarks: operation.remarks,
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
                    alert("Access Denied: Kindly seek assistance from the MIS Department.");
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
                remarks: operation.remarks,
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
                alert("Access Denied: Kindly seek assistance from the MIS Department.");
            },
        });
    }

    DisplayMachineLogsRecordsByUser(tableElem, user){
        let self = this;

        $.ajax({
            url: self.root + "php/controllers/Machine/DisplayMachineLogsRecordsByUser.php",
            method: "POST",
            data: {
                user: user
            },
            datatype: "json",
            success: function(response){
                console.log(response);

                let newData = response.data.map(function(value){
                    return {
                        "RID": value['RID'],
                        "MACHINE_CODE": value['MACHINE_CODE'],
                        "IN_DATETIME": value['IN_DATETIME'],
                        "OUT_DATETIME": (value['OUT_DATETIME'] != null) ? value['OUT_DATETIME'] : "",
                        "IN_BY": main.SetEmployeeName(value['IN_BY']),
                        "OUT_BY": main.SetEmployeeName(value['OUT_BY']),
                        "PURPOSE": main.SetPurpose(value['PURPOSE']),
                        "STATUS": (value['OUT_DATETIME'] == null) ? "ON-GOING":"DONE",
                    }
                });

                self.tableHistoryLogs = new Tabulator(tableElem, {
                    data: newData,
                    pagination: "local",
                    paginationSize: 50,
                    paginationSizeSelector: [ 50, 100, 150],
                    page: 1,
                    ajaxURL: "your_data_endpoint_here.json",
                    layout: "fitDataFill",
                    groupBy: function(data){
    
                        return data.STATUS
                    },
                    groupValues:[
                        ["ON-GOING","DONE"]
                    ],
                    columns: [
                        {title: "ID", field: "RID", headerFilter: "input", visible: false, },
                        {title: "MACHINE", field: "MACHINE_CODE",  headerFilter: "input", resizable: false, },
                        {title: "PURPOSE", field: "PURPOSE",  headerFilter: "input", resizable: false,},
                        {title: "TIME IN", field: "IN_DATETIME", headerFilter: "input", resizable: false,},
                        {title: "TIME OUT", field: "OUT_DATETIME", headerFilter: "input", resizable: false,},
                        {title: "IN", field: "IN_BY",  headerFilter: "input", resizable: false, formatter: function(cell){
                            let value = cell.getValue();
                            
                            return (value != "") ? value : "-";
                        }, },
                        
                        {title: "OUT", field: "OUT_BY", headerFilter: "input", resizable: false, formatter: function(cell){
                            let value = cell.getValue();
                            
                            return (value != "") ? value : "-";
                        }, },
                        
                        // {title: "ACTION", field:"RID", width: 300, hozAlign: "left", frozen: true, headerSort: false, frozen:true, visible: false, formatter:function(cell){}},
                    ],
                });
    
                $("#spinner").hide();
                
            },
            error: function(err){
                console.log("Error:"+JSON.stringify(err));
                alert("Access Denied: Kindly seek assistance from the MIS Department.");
            },
        });
    }
    EmptyHistoryLogs(){

        this.tableHistoryLogs.clearData();
    }
}

