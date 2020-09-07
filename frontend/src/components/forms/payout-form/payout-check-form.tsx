import { Component, h, State } from "@stencil/core";
import serialize from "form-serialize";
import Isemail from "isemail";
import { LoadingService } from "../../../services/loading.service";
import { ToastService } from "../../../services/toast.service";
import { APIBookingService } from "../../../services/api/booking";
import { RouterService } from "../../../services/router.service";
@Component({
  tag: "payout-check-form",
  styleUrl: "payout-form.scss",
})
export class PayoutCheckForm {
  @State() submitted: boolean = false;
  @State() errors: string[] = [];
  @State() isVisible: boolean = false;
  form: HTMLFormElement;
  showForm() {
    this.isVisible = !this.isVisible;
  }
  async handleSubmit(e) {
    e.preventDefault();
    RouterService.forward("/referral/submit");
    const results = serialize(this.form, { hash: true, empty: true });
    this.checkErrors(results);
    console.log(this.errors);
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

    let required = ["payto", "email"];

    required.forEach((r) => {
      if (!results[r]) {
        errors.push(r);
      }
    });
    if (results.email && !Isemail.validate(results.email)) {
      errors.push("email");
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
          <div class="title" onClick={() => this.showForm()}>
            <span>Check</span>{" "}
            <img
              src="/assets/icon/arrowright.svg"
              class={this.isVisible ? "arrowdown" : "arrowup"}
            ></img>
          </div>
          {this.isVisible ? (
            <div>
              <div
                class={{
                  input: true,
                  error: this.errors.includes("payto"),
                }}
              >
                <div class="label white">Pay To</div>
                <input
                  id="payto"
                  type="text"
                  class="apt212-input block"
                  name="payto"
                />
              </div>

              <div
                class={{
                  input: true,
                  error: this.errors.includes("email"),
                }}
              >
                <div class="label">Email Address</div>

                <input
                  id="email"
                  type="email"
                  class="apt212-input block"
                  name="email"
                />
              </div>

              <div class="input">
                <input type="submit" class="button-dark block" value="Submit" />
              </div>
            </div>
          ) : null}
        </div>
        {/* {this.submitted ? (
          <div class="thank-you-msg flex-vertical-center text-center">
            <div>
              <p>
                Thank you. <br />
                Your referral has now been sent.
              </p>

              <ion-icon name="md-checkmark" />
            </div>
          </div>
        ) : null} */}
      </form>
    );
  }
}
