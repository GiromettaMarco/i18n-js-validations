export class Message {
  key: string
  parameters?: {
    [key: string]: string
  }

  constructor(key: string, parameters?: { [key: string]: string }) {
    this.key = key

    if (parameters) {
      this.parameters = parameters
    }
  }
}
