import { CommandBase } from "../command-base";


/**
 * 渡された文字列をそのまま返す
 */
class Echo extends CommandBase {
    constructor() {
        super();
        this.name = 'echo';
        this.description = '`echo [...values]`: return given values as it is.';
    }
    /**
     * @param  {...string} args 
     */
    exec(...args) {
        return args.join(' ');
    }
}

export default Echo;
