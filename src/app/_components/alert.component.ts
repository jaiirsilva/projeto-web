import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { Subscription } from 'rxjs';

import { Alert, AlertType } from '../_models';
import { AlertService } from '../_services';

@Component({ selector: 'alert', templateUrl: 'alert.component.html' })
export class AlertComponent implements OnInit, OnDestroy {
    @Input() id = 'default-alert';
    @Input() fade = true;

    alerts: Alert[] = [];
    alertSubscription: Subscription;
    routeSubscription: Subscription;

    constructor(private router: Router, private alertService: AlertService) { }

    ngOnInit() {
        // inscreva-se para receber novas notificações de alerta
        this.alertSubscription = this.alertService.onAlert(this.id)
            .subscribe(alert => {
                // Limpa os alertas quando um alerta vazio é recebido
                if (!alert.message) {
                    // Filtrar alertas sem 'keepAfterRouteChange'
                    this.alerts = this.alerts.filter(x => x.keepAfterRouteChange);

                    // Remove 'keepAfterRouteChange'
                    this.alerts.forEach(x => delete x.keepAfterRouteChange);
                    return;
                }

                // Adiciona alerta para o array
                this.alerts.push(alert);

                // Fechar automaticamente o alert
                if (alert.autoClose) {
                    setTimeout(() => this.removeAlert(alert), 3000);
                }
           });

        // Limpar os alertas
        this.routeSubscription = this.router.events.subscribe(event => {
            if (event instanceof NavigationStart) {
                this.alertService.clear(this.id);
            }
        });
    }

    ngOnDestroy() {
        // Cancela a inscrição para evitar vazamentos de memória
        this.alertSubscription.unsubscribe();
        this.routeSubscription.unsubscribe();
    }

    removeAlert(alert: Alert) {
        // Verifica se já foi removido para evitar erro no fechamento automático
        if (!this.alerts.includes(alert)) return;

        if (this.fade) {
            // Alerta de desaparecimento
            alert.fade = true;

            // Remover alerta depois de apagar
            setTimeout(() => {
                this.alerts = this.alerts.filter(x => x !== alert);
            }, 250);
        } else {
            // Remove o alerta
            this.alerts = this.alerts.filter(x => x !== alert);
        }
    }

    cssClass(alert: Alert) {
        if (!alert) return;

        const classes = ['alert', 'alert-dismissable', 'mt-4', 'container'];
                
        const alertTypeClass = {
            [AlertType.Success]: 'alert alert-success',
            [AlertType.Error]: 'alert alert-danger',
            [AlertType.Info]: 'alert alert-info',
            [AlertType.Warning]: 'alert alert-warning'
        }

        classes.push(alertTypeClass[alert.type]);

        if (alert.fade) {
            classes.push('fade');
        }

        return classes.join(' ');
    }
}