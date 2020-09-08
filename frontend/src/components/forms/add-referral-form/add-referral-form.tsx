import { Component, h, State } from "@stencil/core";
import serialize from "form-serialize";
import Isemail from "isemail";
import { LoadingService } from "../../../services/loading.service";
import { ToastService } from "../../../services/toast.service";
import { APIBookingService } from "../../../services/api/booking";

@Component({
  tag: "add-referral-form",
  styleUrl: "add-referral-form.scss",
})
export class AddReferralForm {
  @State() submitted: boolean = false;
  @State() errors: string[] = [];

  form: HTMLFormElement;

  async handleSubmit(e) {
    e.preventDefault();

    const results = serialize(this.form, { hash: true, empty: true });
    this.checkErrors(results);

    if (this.errors.length) {
      return;
    }

    await LoadingService.showLoading();

    try {
      await APIBookingService.signupReferer(results);

      this.submitted = true;
    } catch (err) {
      ToastService.error(err.message);
    }

    await LoadingService.hideLoading();
  }

  checkErrors(results) {
    const errors = [];

    let required = [
      "referral_name",
      "referral_phone",
      "referral_email",
      "referral_details",
      "referral_agent",
    ];

    required.forEach((r) => {
      if (!results[r]) {
        errors.push(r);
      }
    });
    if (results.referral_email && !Isemail.validate(results.referral_email)) {
      errors.push("referral_email");
    }
  }

  render() {
    return (
      <form
        onSubmit={(e) => this.handleSubmit(e)}
        class="referral-form-component"
        ref={(el) => (this.form = el as HTMLFormElement)}
      >
        <div class={{ "form-content": true, submitted: this.submitted }}>
          <div class="title">Add New Referrral</div>
          
          <div
            class={{
              input: true,
              error: this.errors.includes("referral_name"),
            }}
          >
            <div class="label">Referral Name</div>

            <input
              id="referral_name"
              type="text"
              class="apt212-input block"
              name="referral_name"
            />
          </div>

          <div
            class={{
              input: true,
              error: this.errors.includes("referral_phone"),
            }}
          >
            <div class="label">Referral Phone Number</div>

            <input
              id="referral-phone"
              type="text"
              class="apt212-input block"
              name="referral_phone"
            />
          </div>

          <div
            class={{
              input: true,
              error: this.errors.includes("referral_email"),
            }}
          >
            <div class="label">Referral Email Address</div>

            <input
              id="referrer-email"
              type="email"
              class="apt212-input block"
              name="referrer_email"
            />
          </div>

          <div
            class={{
              input: true,
              error: this.errors.includes("referral_agent"),
            }}
          >
            <div class="label">Referral by Agent</div>

            <input
              id="referral_agent"
              type="text"
              class="apt212-input block"
              name="referral_agent"
            />
          </div>

          <div
            class={{
              input: true,
              error: this.errors.includes("referral_details"),
            }}
          >
            <div class="label">Referral Details</div>

            <textarea
              id="referral-details"
              class="apt212-input block"
              name="referral_details"
            />
          </div>

          <div class="input">
            <input type="submit" class="button-dark block" value="Submit" />
          </div>
        </div>
 
      </form>
    );
  }
}
