export class Message {
  key: string
  replacements?: {
    [key: string]: string
  }
  trans?: string

  constructor(key: string, replacements?: { [key: string]: string }) {
    this.key = key

    if (replacements) {
      this.replacements = replacements
    }
  }
}
