import { Component, h, State } from '@stencil/core';
import serialize from 'form-serialize';
import { LoadingService } from '../../../../services/loading.service';
import { ToastService } from '../../../../services/toast.service';
import { APIBookingService } from '../../../../services/api/booking';

@Component({
    tag: 'page-admin-booking-settings',
    styleUrl: 'page-admin-booking-settings.scss'
})
export class PageAdminBookingSettings {
    @State() submitted: boolean = false;
    @State() errors: string[] = [];

    form: HTMLFormElement;

    async formSubmit(e) {
        e.preventDefault();

        const results = serialize(this.form, { hash: true, empty: true });

        this.checkErrors(results);

        if (this.errors.length) {
            return;
        }

        await LoadingService.showLoading();

        try {
            await APIBookingService.updatePassword(results);

            ToastService.success('Booking password has been updated');
        } catch (err) {
            ToastService.error(err.message);
        }

        await LoadingService.hideLoading();
    }

    checkErrors(results) {
        const errors = [];
    
        let required = ['password', 'password2'];
    
        required.forEach(r => {
          if (!results[r]) {
            errors.push(r);
          }
        });
    
        if (results.password !== results.password2) {
            errors.push('passwords-match');
        }
    
        this.errors = errors;
      }

    render() {
        return [
            <admin-header />,
            <ion-content class="page-admin-booking-settings">

                <h2 class="text-center">Booking Settings</h2>

                <section class="section">

                    <form onSubmit={e => this.formSubmit(e)} ref={el => this.form = el as HTMLFormElement }>
                        <div class={{ input: true, error: this.errors.includes('password')}}>
                            <label htmlFor="booking-password-change">Password</label>

                            <input id="booking-password-change" type="password" class="apt212-input block" name="password" />
                        </div>

                        <div class={{ input: true, error: this.errors.includes('password2')}}>
                            <label htmlFor="booking-password2-change">Password Again</label>

                            <input id="booking-password2-change" type="password" class="apt212-input block" name="password2" />
                        </div>

                        {
                            this.errors.includes('passwords-match') ?
                            <div class="error">
                                Passwords must match
                            </div>
                            : null
                        }
                        

                        <div class="input">
                            <input type="submit" class="button-dark block" value="SUBMIT" />
                        </div>
                    </form>
                </section>
            </ion-content>
        ];
    }
}