import { toast } from 'react-toastify'

class NotificationService {
  constructor() {}

  #validateMessage(message) {
    if (!message) {
      this.error('Message is required')
      return false
    }
    return true
  }

  success(message, options = {}) {
    if (this.#validateMessage(message)) {
      toast.success(message, options)
    }
  }

  error(message, options = {}) {
    if (this.#validateMessage(message)) {
      toast.error(message, options)
    }
  }

  warning(message, options = {}) {
    if (this.#validateMessage(message)) {
      toast.warn(message, options)
    }
  }

  info(message, options = {}) {
    if (this.#validateMessage(message)) {
      toast.info(message, options)
    }
  }

  clear() {
    toast.dismiss()
  }

    notify(message, type, options) {
        toast(message, { type, ...options });
    }
  
}

export default Object.freeze(new NotificationService())

