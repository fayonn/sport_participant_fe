class LocalStorageService {
  setValue(key, value) {
    localStorage.setItem(key, value)
  }

  getValue(key) {
    return localStorage.getItem(key)
  }

  removeValue(key) {
    localStorage.removeItem(key)
  }
}

export default new LocalStorageService();