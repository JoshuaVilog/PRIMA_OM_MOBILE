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

    PopulatePurpose(){


    }

    CheckMachineLogs(operation){



    }

}