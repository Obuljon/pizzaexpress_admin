export function filedelete(filepath, name) {
    if (filepath[name]) {
      gfs.delete(filepath[name][0].id);
    }
  }