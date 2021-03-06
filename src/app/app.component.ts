import { Component, OnInit, OnDestroy } from '@angular/core';
import { interval } from 'rxjs';
import { Subscription } from 'rxjs';



@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
	constructor() {

	}
	secondes: number;
	counterSubscription: Subscription;

	ngOnInit() {
		const counter = interval(1000);
		this.counterSubscription = counter.subscribe(
			(value) => {
				this.secondes = value;
			},
		);
	}

	ngOnDestroy() {
		this.counterSubscription.unsubscribe();
	}

}
