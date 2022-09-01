import { Subject } from 'rxjs';
import { linkObj } from './link.model';


export class LinkService {
 linksArrChanged = new Subject<linkObj[] | null>();
  linksArr: linkObj[] = [
    {
      oldLink: 'https://localhost:420100/',
      newLink: 'https://localhost:4200',
      counter: 30,
    },
    {
      oldLink: 'https://localhost:420200/',
      newLink: 'https://localhost:420',
      counter: 0,
    },
    {
      oldLink: 'https://localhost:420300/',
      newLink: 'https://localhost:42',
      counter: 0,
    },
  ];

  getLinks() {
    return this.linksArr.slice();
  }

  addLink(newLinkObj:linkObj) {
    this.linksArr.push(newLinkObj)
    this.linksArrChanged.next(this.linksArr.slice());
  }
}
