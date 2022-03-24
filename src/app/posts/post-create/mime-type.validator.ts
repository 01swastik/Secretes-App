import { AbstractControl } from "@angular/forms";
import { Observable, Observer } from "rxjs";

export const mimeType =(control :AbstractControl):
Promise<{[key: string]: any}> | Observable<{[key: string]: any}> =>{
  const file = control.value as File;
  const fileReader = new FileReader();
  const frObs = new Observable((observer: Observer<{[key: string]: any}>) =>{
     fileReader.addEventListener("loadend", ()=>{
        const arr = new Uint8Array(fileReader.result as ArrayBuffer).subarray(0,4);
        let header ='';
        let isValid= false;
        for (let i=0; i<arr.length; i++){
          header += arr[i].toString(16);
        }
        switch(header){
          case "89504e47":
          isValid =true;
          break;
          case "ffd8dde0":
          case "ffd8dde1":
          case "ffd8dde2":
          case "ffd8dde3":
          case "ffd8dde8":
            isValid =true;
            break;
            default:false;
            break;
        }

        if(isValid){
          observer.next(null);
        }else{
          observer.next({invalidMimeType:true});
        }
        observer.complete();
     });
     fileReader.readAsArrayBuffer(file);
  });
  return frObs;
};
