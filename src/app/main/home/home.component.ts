import { linkObj } from '../link.model';
import { NgForm } from '@angular/forms';
import {  Component } from '@angular/core';
import { Clipboard } from '@angular/cdk/clipboard';
import { LinkService } from '../link.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  linkArr: linkObj[] = [];
  newLink: string = '';
  linkStr: string = '';

  constructor(private clipboard: Clipboard, private lService: LinkService) {}

  // ngDoCheck(): void {
  //   this.dataSource.data = this.lService.getLinks();
  //   console.log ('checked')
  // }

  onTransform(form: NgForm) {
    this.lService.transformLink(form).subscribe(
      res => {
        console.log (res)
      }
    );

  }

  onClear() {
    this.newLink = '';
    this.linkStr = '';
  }
}


//  const longLink = form.value.longLink;
//  this.newLink = longLink.substring(0, 12);
//  const newLinkObj = {
//    oldLink: longLink,
//    newLink: this.newLink,
//    counter: 0,
//  };
//  this.lService.addLink(newLinkObj);
