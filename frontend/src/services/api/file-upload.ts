import { APIService } from './api.service';

class APIFileUploadInstance {

  /**
   * Get an individual apartment
   * @param id
   */
  public async imageUpload(formData) {
    try {
      const headers = APIService.getHeaders();
      delete headers['Content-Type'];

      let response = await fetch(APIService.getAPIUrl() + '/image-upload', {
        headers,
        method: 'POST',
        body: formData
      });
      if (!response.ok) {
        let message = response.statusText;

        const err = await response.json();
        if (err && err.message) {
          message = err.message;
        }

        if (err && err.errors && err.errors.file && err.errors.file.length) {
          message = err.errors.file[0];
        }

        throw new Error(message);
      }

      return await response.json();
    } catch (err) {
      throw new Error(err.message);
    }
  }

  public async imageDelete(id) {
    try {
      const headers = APIService.getHeaders();

      let response = await fetch(APIService.getAPIUrl() + '/image-upload/' + id, {
        headers,
        method: 'DELETE'
      });

      if (!response.ok) {
        let message = response.statusText;

        const err = await response.json();
        if (err && err.message) {
          message = err.message;
        }

        if (err && err.errors && err.errors.file && err.errors.file.length) {
          message = err.errors.file[0];
        }

        throw new Error(message);
      }

      return await response.json();
    } catch (err) {
      throw new Error(err.message);
    }
  }
}

export const APIFileUploadService = new APIFileUploadInstance();
