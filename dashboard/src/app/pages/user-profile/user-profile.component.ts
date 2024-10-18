import { Component, OnInit } from '@angular/core';
import axios from 'axios';

import { utils } from 'src/app/services/utils';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
})
export class UserProfileComponent implements OnInit  {

  username:string='';
  photo:string='';
  email:string='';
  firstname:string='';
  lastname:string='';
  templatecolor = 'bg-gradient-info';
  
  ngOnInit() {
    document.getElementById('exists').style.display = 'none'
    document.getElementById('length').style.display = 'none'
    
    axios.post('http://localhost:5000/user/profile?username='+localStorage.getItem('username'), {'token':localStorage.getItem('token')})
    .then((response)=>{
        this.username = response.data.username
        this.photo = response.data.photo
        this.email = response.data.email
        this.firstname = response.data.firstname
        this.lastname = response.data.lastname
    })
    .catch((err)=>{
      if(err.response && err.response.status == 401){
        utils.logOut()
      }
    })

    this.templatecolor = localStorage.getItem('templatecolor');
    document.querySelector<HTMLInputElement>('input[name="templatecolor"][value="'+this.templatecolor+'"]').checked = true
  }

  update(e:HTMLInputElement){
    if(!this.username || this.username.trim().length>10 || this.username.trim().length<5)
    {document.getElementById('length').style.display = 'block'}
    else
    {
      const payload = new FormData(document.getElementById("frmid") as HTMLFormElement);
      payload.append('photo', e.files[0])
      payload.append('selectedPhotoName', this.photo)
      payload.append('templatecolor', document.querySelector<HTMLInputElement>('input[name="templatecolor"]:checked').value)
      payload.append('oldusername', localStorage.getItem('username'))
      payload.append('token', localStorage.getItem('token'))
      axios.put('http://localhost:5000/user', payload)
      .then((response) => { 
        if(response.data=='exists'){document.getElementById('exists').style.display = 'block'}
        else{
            localStorage.setItem('username', response.data.username);
            localStorage.setItem('photo', response.data.photo);
            localStorage.setItem('templatecolor', response.data.templatecolor);
            this.templatecolor = response.data.templatecolor;
            document.getElementById('exists').style.display = 'none';
            window.location.href = 'http://localhost:4200/#/dashboard';
          }
      })
    }
  }

  nouvelphoto(){
    document.getElementById('photo').click();
  }
  changephoto(photoInput:HTMLInputElement, img:HTMLImageElement){
    img.setAttribute("src",URL.createObjectURL(photoInput.files[0]));
  }

  removePhoto(photoInput:HTMLInputElement, img:HTMLImageElement){
    this.photo = 'profile.jpg'
    photoInput.value = "";
    img.setAttribute("src", 'http://localhost:5000/staticRoute/profile.jpg');
  }

  changecolor(){
    this.templatecolor = document.querySelector<HTMLInputElement>('input[name="templatecolor"]:checked').value
  }
}
