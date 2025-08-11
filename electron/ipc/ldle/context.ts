export default class LdleContext {
    private static instance: LdleContext | null = null
    is_ready: boolean = false

    private constructor() {}

    static getInstance(): LdleContext {
        if (!LdleContext.instance) {
            LdleContext.instance = new LdleContext()
        }
        return LdleContext.instance
    }

    static resetInstance(): void {
        LdleContext.instance = null
    }
}