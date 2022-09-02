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
  successTr = false;
  copied = false;
  error = false;

  constructor(private clipboard: Clipboard,
    private lService: LinkService,
    ) {}

  onTransform(form: NgForm) {
    this.lService.transformLink(form).subscribe(() => {
      this.newLink = this.lService.newLink;
      this.successTr = true;
      setTimeout(() => {
        this.successTr = false;
      }, 4500);
    });
  }
  copyToClipboard() {
    this.clipboard.copy('http://79.143.31.216/s/'+this.newLink);
    this.copied=true;
  };

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
