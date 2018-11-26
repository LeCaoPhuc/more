export class OdooUserModel {
    private _user_context: any;

    /**
     * Getter user_context
     * @return {any}
     */
    public get user_context(): any {
        return this._user_context;
    }

    /**
     * Setter user_context
     * @param {any} value
     */
    public set user_context(value: any) {
        this._user_context = value;
    }

}