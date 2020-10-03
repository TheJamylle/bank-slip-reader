const reader = require('line-reader');

const Slip = function({ id = 0, bankCode = "000", dueDate = "", paymentDate = "",
                          cpfCustomer = "", value = 0, mulct = 0, interest = 0, 
                          agency = "", bankAccount = ""})
{
    this.id = id;
    this.bankCode = bankCode;
    this.dueDate = dueDate;
    this.paymentDate = paymentDate;
    this.cpfCustomer = cpfCustomer;
    this.value = value;
    this.mulct = mulct;
    this.interest = interest;
    this.agency = agency;
    this.bankAccount = bankAccount;
};

const readBancoBrasil = (fileName) => {
    console.log("Processing slip from Banco do Brasil: " + fileName + "\n");
    reader.eachLine(fileName, line => {
        const array = line.split(";");
        const slip = new Slip({
            id: array[0],
            bankCode: array[1],
            dueDate: array[2],
            paymentDate: array[3],
            cpfCustomer: array[4],
            value: array[5],
            mulct: array[6],
            interest: array[7]
        });

        console.log(slip);
        console.log("");
    });    
};

const readBradesco = (fileName) => {
    console.log("Processing slip from Bradesco: " + fileName + "\n");
    reader.eachLine(fileName, line => {
        const array = line.split(";");
        const slip = new Slip({
            id: array[0],
            bankCode: array[1],
            agency: array[2],
            bankAccount: array[3],
            dueDate: array[4],
            paymentDate: array[5],
            cpfCustomer: array[6],
            value: array[7],
            mulct: array[8],
            interest: array[9]
        });

        console.log(slip);
        console.log("");
    });
};

const ProcessSlip = function(read){
    this.read = read;
    this.process = (fileName) => {
        console.log("\nInitialization processing of file " + fileName);
        
        this.read(fileName);
    };
};


const processador = new ProcessSlip(readBancoBrasil);
processador.process("banco-brasil-1.csv");

processador.read = readBradesco;
processador.process("bradesco-1.csv");