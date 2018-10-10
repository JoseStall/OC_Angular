import { Component, OnDestroy, OnInit } from '@angular/core';
import { AppareilService } from '../services/appareil.service';
import { Subscription } from 'rxjs';

@Component({
	selector: 'app-appareil-view',
	templateUrl: './appareil-view.component.html',
	styleUrls: ['./appareil-view.component.scss']
})
export class AppareilViewComponent implements OnInit, OnDestroy {
	appareils: any[];
	isAuth = false;
	lastUpdate = new Date();
	appareilSubscription: Subscription;


	constructor(private appareilService: AppareilService) { }

	ngOnInit() {
		this.appareilSubscription = this.appareilService.appareilsSubject.subscribe(
			(appareils: any[]) => {
				this.appareils = appareils;
			}
			);
		this.appareilService.emitAppareilSubject();
	}

	onAllumer() {
		this.appareilService.switchOnAll();
	}

	onEteindre() {
		if(confirm('Etes-vous sûr de vouloir éteindre tous vos appareils ?')) {
			this.appareilService.switchOffAll();
		} else {
			return null;
		}
	}

	ngOnDestroy() {
		this.appareilSubscription.unsubscribe();
	}
	onSave() {
		this.appareilService.saveAppareilsToServer();
	}
	onFetch() {
		this.appareilService.getAppareilsFromServer();
	}
}
