import { Component, h, Prop, State, Event, EventEmitter  } from '@stencil/core';
import { Store } from '@stencil/redux';
import authSelectors from '../../../../store/selectors/auth';
import { APIAdminService } from '../../../../services/api/admin';
import { RouterService } from '../../../../services/router.service';
import serialize from 'form-serialize';
import { ToastService } from '../../../../services/toast.service';

@Component({
  tag: 'page-admin-agent-edit',
  styleUrl: 'page-admin-agent-edit.scss'
})
export class PageAdminAgentEdit {
  @Prop({ context: "store" }) store: Store;
  @Prop() agentId!: number;

  @State() isLoggedIn: boolean = false;
  @State() isAdmin: boolean = false;
  @State() item: any;
  @State() loaded: boolean = false;
  @State() submitting: boolean = false;
  @State() agents: any[] = [];

  @Event() success: EventEmitter;

  form: HTMLFormElement;

  async componentWillLoad() {
    this.store.mapStateToProps(this, state => {
      return {
        isLoggedIn: authSelectors.isLoggedIn(state),
        isAdmin: authSelectors.isAdmin(state)
      }
    });

    if (!this.isLoggedIn) {
      RouterService.forward('/login');
    }
    else {
      // we're logged in, but as admin?
      if (!this.isAdmin) {
        RouterService.forward('/');
      }
    }

    try {

      if (this.agentId) {
        const agent = await APIAdminService.getAgent(this.agentId);

        if (agent.id === this.agentId) {
          this.item = agent;
          this.loaded = true;
        }
      }
    }
    catch (e) {
      this.loaded = true; // just show the 404
    }
  }

  async onSubmit(e) {

    e.preventDefault();

    this.submitting = true;

    const formValues = serialize(this.form, { hash: true, empty: true });

    try {
      const agent: any = await APIAdminService.updateAgent(formValues);

      this.submitting = false;

      ToastService.success('Agent has been saved');
      this.success.emit(agent);

      RouterService.reload('/admin/agents');

      //window.open("/admin/agents","_self")

    } catch(err) {
      ToastService.error(err.message);

      this.submitting = false;
    }
  }


  render() {
    
    return [
      <div class="agent-wrapper">
        <div class="agent-edit-form-component">
          <form onSubmit={e => this.onSubmit(e)} ref={el => this.form = el as HTMLFormElement }>
            <fieldset>
              <h3>Agent Information</h3>

              <div class="fieldset-inputs address">
                <input type="hidden" name="id" value={this.item ? this.item.id : ''} />

                <div class="input">
                  <label htmlFor="owner-name">Agent Name</label>
                  <input id="owner-name" name="name" class="apt212-input block" value={this.item ? this.item.name : ''}/>
                </div>

                <div class="input">
                  <label htmlFor="address">Agent Email</label>
                  <input id="address" name="email" class="apt212-input block" value={this.item ? this.item.email : ''}/>
                </div>
              </div>

            </fieldset>

            <input type="submit" class="button-dark" value="Save" disabled={this.submitting} />
          </form>
        </div>
      </div>
    ]
  }
}