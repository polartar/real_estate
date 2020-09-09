import { Component, h, State } from "@stencil/core";
import serialize from "form-serialize";
import Isemail from "isemail";
import { LoadingService } from "../../../services/loading.service";
import { ToastService } from "../../../services/toast.service";
import { APIBookingService } from "../../../services/api/booking";
 
@Component({
  tag: "general-information-form",
  styleUrl: "general-information-form.scss",
})
export class GeneralForm {
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

    let required = ["email", "name", "password", "confPassword"];

    required.forEach((r) => {
      if (!results[r]) {
        errors.push(r);
      }
    });

    if (results.email && !Isemail.validate(results.email)) {
      errors.push("email");
    }

    if (results.password !== results.confPassword){
      errors.push("confPassword");
    } 

    this.errors = errors;
  }

  render() {
    return (
      <form
        onSubmit={(e) => this.handleSubmit(e)}
        class="referral-form-component"
        ref={(el) => (this.form = el as HTMLFormElement)}
      >
        <div class={{ "form-content": true, submitted: this.submitted }}>
          <div class="title">General Information</div>

          <div
            class={{
              input: true,
              error: this.errors.includes("name"),
            }}
          >
            <div class="label white">Name</div>

            <input
              id="name"
              type="text"
              class="apt212-input block"
              name="name"
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

          <div
            class={{
              input: true,
              error: this.errors.includes("password"),
            }}
          >
            <div class="label">Update Password</div>

            <input
              id="password"
              type="password"
              class="apt212-input block"
              name="password"
            />
          </div>
          
          <div
            class={{
              input: true,
              error: this.errors.includes("confPassword"),
            }}
          >
            <div class="label">Confirm Password</div>

            <input
              id="confPassword"
              type="password"
              class="apt212-input block"
              name="confPassword"
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
