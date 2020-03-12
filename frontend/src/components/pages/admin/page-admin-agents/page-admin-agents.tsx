import { Component, h, State, Prop } from '@stencil/core';
import { Store } from '@stencil/redux';
import authSelectors from '../../../../store/selectors/auth';
import screenSizeSelectors from '../../../../store/selectors/screensize';
import { RouterService } from '../../../../services/router.service';
import { ToastService } from '../../../../services/toast.service';
import { APIAdminService } from '../../../../services/api/admin';
import { AlertService } from '../../../../services/alerts.service';

@Component({
  tag: 'page-admin-agents',
  styleUrl: 'page-admin-agents.scss'
})
export class PageAdminAgents {
  @Prop({ context: "store" }) store: Store;
  @State() isAdmin: boolean = false;
  @State() isLoggedIn: boolean = false;
  pageSize: number = 40;
  @State() loaded: boolean = false;
  @State() agents: any[] = [];

  @State() screenHeight: number;

  @State() resultCount: number = 0;

  agentsWrapper: HTMLElement;
  searchInput: HTMLInputElement;

  componentWillLoad() {
    
    this.store.mapStateToProps(this, state => {
      return {
        isLoggedIn: authSelectors.isLoggedIn(state),
        isAdmin: authSelectors.isAdmin(state),
        screenHeight: screenSizeSelectors.getHeight(state)
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
  }

  componentDidLoad() {
  
    this.renderAgents();
  }

  componentDidRender() {
    requestAnimationFrame(() => {
      if (this.agentsWrapper) {
        this.agentsWrapper.style.maxHeight = this.getTableHeight();
      }
    });
  }

  async renderAgents() {
    try {
      const result = await this.fetchAgents();

      this.agents = result;
      this.resultCount = result.total;

      this.loaded = true;
    } catch(err) {
      // alright...
      ToastService.error(err.message);
    }
  }
  
  async fetchAgents() {
    try {
      const result = await APIAdminService.getAgents();

      return result;

    } catch(err) {
      return ToastService.error(`Could not retrieve agents: ${err.message}`);
    }
  }

  getTableHeight() {
    if (!this.agentsWrapper) {
      return '500px';
    }

    // magic # 150 to account for admin header height
    return `${this.screenHeight - this.agentsWrapper.offsetTop - 150}px`;
  }

  goTo(path) {
    RouterService.forward(path);
  }

  async deleteAgent(id) {
    try {
      if (!await AlertService.confirm('Deleting this is a permanent action, are you sure you want to delete the agent?', 'Are you sure?')) {
        return;
      }

      const result: any = await APIAdminService.deleteAgent(id);

      if (result.success) {
        const agents = this.agents.filter(l => l.id !== id);

        this.agents = agents;

        ToastService.success('Agent has been deleted');
      }
      else {
        if (result.errors) {
          ToastService.error(result.errors.join('\n'));
          return;
        }

        if (result.message) {
          ToastService.error(result.message);
        }
      }
    } catch (err) {
      ToastService.error(err.message);
    }
  }

  render() {
    return [
      <admin-header />,
      <ion-content class="page-admin-agents">

        <h2 class="text-center">Agents</h2>

        <section class="section full">
        
            <div class="listings-totals text-right">
                <button type="button" class="button-dark add-new" aria-label="Add New" onClick={() => this.goTo('/admin/agent/')}><ion-icon name="add-circle" /></button>
            </div>
   
          { this.loaded ?
          <div
            class="listings"
            style={{ maxHeight: this.getTableHeight() }}
            ref={ el => this.agentsWrapper = el as HTMLElement }
          >
            <table class="data-table">
              <thead>
                <tr>
                  <th>
                    Agent Name
                  </th>
                  <th>
                    Agent Email
                  </th>
                 
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {
                  this.agents.map(a => {

                    return (
                      <tr>
                        <td>{ a.name }</td>
                        <td>{ a.email }</td>

                        <td>
                          <button class="button-dark" onClick={() => this.deleteAgent(a.id)}>
                            <ion-icon name="trash" />
                          </button>

                          <button class="button-dark" onClick={() => this.goTo(`/admin/agent/${a.id}`)}>
                            <ion-icon name="settings" />
                          </button>
                        </td>
                      </tr>
                    )
                  })
                }
              </tbody>
            </table>
          </div>
          : <div class="text-center"><ion-spinner name="lines" /></div>
        }
        </section>
      </ion-content>
    ]
  }
}
