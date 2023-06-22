import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DocumentsService {
dctUrl:string="http://localhost:3000/dct";

  constructor( private http:HttpClient) { }

uploadFiles(files: File[]){
  console.log(" here files",files);
  let formData = new FormData();
  files.forEach(file => {
    formData.append('files', file, file.name);
    
  });
return this.http.post<{}>(this.dctUrl,formData);

}
}
