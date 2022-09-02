import { LinkService } from './../link.service';
import { linkObj } from './../link.model';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';



@Injectable({providedIn:'root'})
export class StatisticsResolverService implements Resolve <linkObj[]> {
    constructor(
        private lService:LinkService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const links = this.lService.linksArr;

        if (links.length === 0) {
          this.lService.fetchLinks();
        } else {
          return links;
        }
        return links
    }
}
