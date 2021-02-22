import http from "./http-common";

class UploadFilesService {
  upload(file, onUploadProgress) {
    const formData = new FormData();

    formData.append("file", file, { type: 'text/csv' });

    return http.post("/users/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        "Access-Control-Allow-Origin" : "*",
      },
      onUploadProgress,
    });
  }
}

export default new UploadFilesService();