import * as ChildProcess from "child_process";

export default async function PythonPipeLine(){
    ChildProcess.exec("python3 ./src/python/main.py",
    (error : ChildProcess.ExecException | null, stdout: string, stderr: string) =>{
        if(error){
            console.error("stderr", stderr);
            throw error;
        }
        console.log(stdout)
        if(stdout === "Done"){
            return 0;
        }
    });
}