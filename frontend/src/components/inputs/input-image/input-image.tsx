import { Component, h, Prop, State, Element } from '@stencil/core';
import { APIFileUploadService } from '../../../services/api/file-upload';
import { ToastService } from '../../../services/toast.service';
import { AlertService } from '../../../services/alerts.service';

@Component({
  tag: 'input-image',
  styleUrl: 'input-image.scss'
})
export class InputImage {
  @Element() el: HTMLElement;

  @Prop() limit: number = 0;
  @Prop() name!: string;
  @Prop() value: any[] = [];
  @Prop() accept: string = 'image/*';
  @Prop() hasTitle: boolean = false;
  @Prop() hasDescription: boolean = false;

  @State() uploadInProgress: boolean = false;
  @State() internalValue: any[] = [];

  fileInput: HTMLInputElement;

  componentWillLoad() {
    this.internalValue = this.value;
  }

  async uploadHandler() {
    const fileList = this.fileInput.files;
    const descriptionInput: any = this.el.querySelector('.description');
    const titleInput: any = this.el.querySelector('.title');

    if (fileList.length && fileList[0] && fileList[0].size) {
      this.uploadInProgress = true;

      const formData = new FormData();
      formData.append('file', fileList[0]);
      formData.append('name', this.name);

      if (titleInput) {
        formData.append('title', titleInput.value);
      }

      if (descriptionInput) {
        formData.append('description', descriptionInput.value);
      }

      try {
        const result = await APIFileUploadService.imageUpload(formData);

        this.internalValue = [...this.internalValue, result];

        this.fileInput.value = '';

        if (titleInput) {
          titleInput.value = '';
        }

        if (descriptionInput) {
          descriptionInput.value = '';
        }

      } catch (err) {
        ToastService.error(err.message);
      }
    }

    this.uploadInProgress = false;
  }

  async delete(id) {

    if (!await AlertService.confirm('Are you sure?', 'Delete Image')) {
      return;
    }

    try {
      const result = await APIFileUploadService.imageDelete(id);

      if (result.success) {
        const newValue = this.internalValue.filter(v => v.id !== id);

        this.internalValue = newValue;
      }
    } catch (err) {
      ToastService.error(err.message);
    }
  }

  render() {
    return (
      <div class="input-image-component">
        {
          !this.limit || this.internalValue.length < this.limit ?
            <div class="">
              <input type="file"
                accept={this.accept}
                ref={el => this.fileInput = el as HTMLInputElement }
              />

              <div class="metadata">
                {
                  this.hasTitle ?
                    <div class="input">
                      <label htmlFor={`image-title-${this.name}`}>Title</label>
                      <input id={`image-title-${this.name}`} type="text" class="apt212-input block title" />
                    </div>
                  : null
                }

                {
                  this.hasDescription ?
                    <div class="input">
                      <label htmlFor={`image-description-${this.name}`}>Description</label>
                      <textarea id={`image-description-${this.name}`} class="apt212-input description" />
                    </div>
                  : null
                }

                <div class="flex-vertical-center">
                  <button type="button" class="button-dark" onClick={() => this.uploadHandler()}>Upload</button>

                  {
                    this.uploadInProgress ? <ion-spinner name="lines" /> : null
                  }
                </div>
              </div>
            </div>
          : <div>The maximum number of images has been reached.  Delete existing images to add new ones.</div>
        }

        <div class="value">
          {
            this.internalValue.map((f, i) =>
              <div class="image-value flex-vertical-center">
                <div class="image-preview">
                  <h4 style={{margin: '0'}}>({ i + 1 })</h4>
                  <img src={f.small} class="preview" />
                </div>

                <div class="metadata">
                  {
                    this.hasTitle ?
                      <div class="input">
                        <label htmlFor={`image-title-${f.id}`}>Title</label>
                        <input type="text" class="apt212-input block title" value={f.title} name={`${this.name}_titles[]`}/>
                        <input type="hidden" name={`${this.name}_titles_ids[]`} value={f.id} />
                      </div>
                    : null
                  }

                  {
                    this.hasDescription ?
                      <div class="input">
                        <label htmlFor={`image-description-${f.id}`}>Description</label>
                        <textarea class="apt212-input block description" name={`${this.name}_descriptions[]`}>{f.description}</textarea>
                      </div>
                    : null
                  }

                  <input type="hidden" name={`${this.name}[]`} value={f.id} />
                </div>

                <div class="action">
                  <button type="button" class="button-dark block" onClick={() => this.delete(f.id)}>Delete</button>
                </div>
              </div>
            )
          }
        </div>
      </div>
    )
  }
}
