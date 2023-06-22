import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DocumentsService } from 'src/app/services/documents.service';

@Component({
  selector: 'app-form-upload',
  templateUrl: './form-upload.component.html',
  styleUrls: ['./form-upload.component.css']
})
export class FormUploadComponent implements OnInit {
  uploadForm: FormGroup;
  constructor(private documentService: DocumentsService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.uploadForm = this.formBuilder.group({
      name:[""],
      project:[""],
      lot:[""],
      time:[""],
      description :[""],
      doc:[""],
    })
  }
  submit() {
    console.log("document information", this.uploadForm.value);


  }
  onFileSelected(event) {
    const files: FileList = event.target.files;

    for (let i = 0; i < files.length; i++) {
      const file: File = files[i];

      // Vérifier le type de fichier
      if (files) {
        this.documentService.uploadFiles(Array.from(files)).subscribe((response) => {
          // Traiter la réponse ou effectuer d'autres actions après le téléchargement
          console.log("xxxxx", file);

        });
      }
    }

    console.log("files", files);
  }

}